import { FadeTransition } from "components/animation/FadeTransition/FadeTransition";
import { Spinner } from "components/animation/Spinner/Spinner";
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
import { FC, useEffect, useState } from "react";

interface UserPageState {
  user?: User;
  reposOwned?: RepositoryOwned[];
  reposContributedTo?: RepositoryContributedTo[];
  timelineData?: TimelineData;
  contributionsPerRepo?: ContributionsPerRepo[];
}

const UserPage: FC = () => {
  const router = useRouter();
  const [state, setState] = useState<UserPageState>({});
  const username = router.query.username;

  useEffect(() => {
    if (!username) {
      return;
    }
    Promise.all([
      apiGet<User>("/" + username),
      apiGet<RepositoryOwned[]>("/" + username + "/repos-owned"),
      apiGet<RepositoryContributedTo[]>("/" + username + "/repos-contributed"),
      apiGet<TimelineData>("/" + username + "/timeline"),
      apiGet<ContributionsPerRepo[]>("/" + username + "/contributions")
    ])
      .then(([user, reposOwned, reposContributedTo, timelineData, contributionsPerRepo]) => {
        setState({
          user,
          reposOwned,
          reposContributedTo,
          timelineData,
          contributionsPerRepo
        });
      })
      .catch(e => {
        if (e.status === 404) {
          router.push("/404");
        } else {
          router.push("/error");
        }
      });
  }, [router, username]);

  const { user, reposOwned, reposContributedTo, timelineData, contributionsPerRepo } = state;

  const backgroundPictureSeed = user ? user.name + new Date().getMinutes().toString() : null;
  const isDataPresent = !!user && !!reposOwned;

  function onNewUsernameSubmitted(newUsername) {
    if (newUsername !== username) {
      setState({});
      router.push("/[username]", "/" + newUsername);
    }
  }

  return (
    <Page>
      {isDataPresent ? (
        <FadeTransition>
          <SearchForm searchUser={onNewUsernameSubmitted} />
          <UserProfile
            user={user}
            repos={reposOwned}
            backgroundPictureSeed={backgroundPictureSeed}
          />
          <ContributionsChart
            timelineData={timelineData}
            contributionsPerRepo={contributionsPerRepo}
          />
          <LanguagesCharts repos={reposOwned} />
          <RepositoriesCharts repos={reposContributedTo} />
          <Footer />
        </FadeTransition>
      ) : (
        <>
          <p className="h5">Hold on a second, I'm fetching your data...</p>
          <Spinner />
        </>
      )}
      {backgroundPictureSeed && (
        // Prefetch the background image
        <img
          alt="background"
          style={{ display: "none" }}
          src={`https://picsum.photos/seed/${backgroundPictureSeed}/800/130`}
        />
      )}
    </Page>
  );
};

export default UserPage;
