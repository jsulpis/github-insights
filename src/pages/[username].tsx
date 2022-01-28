import { FadeIn } from "components/animation/FadeIn/FadeIn";
import { ContributionsChart } from "components/charts/Contributions/ContributionsChart";
import { LanguagesCharts } from "components/charts/Languages/LanguagesCharts";
import { RepositoriesCharts } from "components/charts/Repositories/RepositoriesCharts";
import { Page } from "components/context/Page";
import { SearchForm } from "components/form/SearchForm/SearchForm";
import Footer from "components/main/Footer/Footer";
import { UserProfile } from "components/main/UserProfile/UserProfile";
import apiGet from "lib/apiGet";
import { ContributionsPerRepo } from "models/Contributions";
import { RepositoryContributedTo, RepositoryOwned } from "models/Repository";
import TimelineData from "models/TimelineData";
import User from "models/User";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";

interface UserPageProps {
  user?: User;
  reposOwned?: RepositoryOwned[];
  reposContributedTo?: RepositoryContributedTo[];
  timelineData?: TimelineData;
  contributionsPerRepo?: ContributionsPerRepo[];
}

const UserPage: NextPage<UserPageProps> = ({
  user,
  reposOwned,
  reposContributedTo,
  timelineData,
  contributionsPerRepo
}) => {
  const router = useRouter();
  const username = router.query.username;

  function onNewUsernameSubmitted(newUsername) {
    if (newUsername !== username) {
      router.push("/[username]", "/" + newUsername);
      // Prefetch background picture
      const backgroundPictureSeed = newUsername + new Date().getMinutes().toString();
      new Image().src = `https://picsum.photos/seed/${backgroundPictureSeed}/800/130`;
    }
  }

  return (
    <Page
      title={`GitHub Insights - ${user.name || username}`}
      description={`Insights into ${user.name || username}'s GitHub account.`}
      ogImage={user.avatarUrl}
    >
      <FadeIn>
        <SearchForm searchUser={onNewUsernameSubmitted} />
        <UserProfile user={user} repos={reposOwned} />
        <ContributionsChart
          timelineData={timelineData}
          contributionsPerRepo={contributionsPerRepo}
        />
        <LanguagesCharts repos={reposOwned} />
        <RepositoriesCharts repos={reposContributedTo} />
        <Footer />
      </FadeIn>
    </Page>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const username = params.username;
  res.setHeader(
    "Cache-Control",
    `public, max-age=${60 * 60 * 12}, stale-while-revalidate=${60 * 60 * 24}`
  );

  return Promise.all([
    apiGet<User>("/" + username),
    apiGet<RepositoryOwned[]>("/" + username + "/repos-owned"),
    apiGet<RepositoryContributedTo[]>("/" + username + "/repos-contributed"),
    apiGet<TimelineData>("/" + username + "/timeline"),
    apiGet<ContributionsPerRepo[]>("/" + username + "/contributions")
  ])
    .then(([user, reposOwned, reposContributedTo, timelineData, contributionsPerRepo]) => {
      return {
        props: {
          user,
          reposOwned,
          reposContributedTo,
          timelineData,
          contributionsPerRepo
        }
      };
    })
    .catch(e =>
      e.status === 404
        ? { notFound: true }
        : {
            redirect: {
              destination: "/error",
              permanent: false
            }
          }
    );
};
