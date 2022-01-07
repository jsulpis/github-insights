import { FadeTransition } from "components/animation/FadeTransition/FadeTransition";
import { Spinner } from "components/animation/Spinner/Spinner";
import ContributionsChart from "components/charts/Contributions/ContributionsChart";
import LanguagesCharts from "components/charts/Languages/LanguagesCharts";
import RepositoriesCharts from "components/charts/Repositories/RepositoriesCharts";
import { Page } from "components/context/Page";
import { SearchForm } from "components/form/SearchForm/SearchForm";
import Footer from "components/main/Footer/Footer";
import { UserProfile } from "components/main/UserProfile/UserProfile";
import apiGet from "lib/apiGet";
import { ContributionsPerRepo } from "models/Contributions";
import { RepositoryContributedTo, RepositoryOwned } from "models/Repository";
import TimelineData from "models/TimelineData";
import User from "models/User";
import { withRouter } from "next/router";
import React from "react";

interface UserPageState {
  user: User;
  reposOwned: RepositoryOwned[];
  reposContributedTo: RepositoryContributedTo[];
  timelineData: TimelineData;
  contributionsPerRepo: ContributionsPerRepo[];
}

const defaultState: UserPageState = {
  user: null,
  reposOwned: null,
  reposContributedTo: null,
  timelineData: {
    totalContributions: 0,
    contributionsPerMonth: []
  },
  contributionsPerRepo: []
};

class UserPage extends React.Component<any, UserPageState> {
  constructor(args) {
    super(args);
    this.state = defaultState;
  }

  public render() {
    const { user, reposOwned, reposContributedTo, timelineData } = this.state;

    const backgroundPictureSeed = user
      ? user.name + new Date().getMinutes().toString()
      : null;
    const contributionsPerRepo = this.state.contributionsPerRepo;
    const isDataPresent = !!user && !!reposOwned;

    return (
      <Page>
        {isDataPresent ? (
          <FadeTransition>
            <SearchForm
              searchUser={username => {
                this.setState(defaultState);
                this.props.router.push("/[username]", "/" + username);
              }}
            />
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
  }

  public componentDidMount() {
    const username = this.props.router.query.username;
    if (!!username) {
      this.fetchAllData(username);
    }
  }

  public componentDidUpdate(prevProps) {
    const username = this.props.router.query.username;
    // verify props have changed to avoid an infinite loop
    if (!!username && username !== prevProps.router.query.username) {
      this.fetchAllData(username);
    }
  }

  private fetchAllData(username) {
    Promise.all([
      apiGet<User>("/" + username).then(user => this.setState({ user })),
      apiGet<RepositoryOwned[]>("/" + username + "/repos-owned").then(reposOwned =>
        this.setState({ reposOwned })
      ),
      apiGet<RepositoryContributedTo[]>("/" + username + "/repos-contributed").then(
        reposContributedTo => this.setState({ reposContributedTo })
      ),
      apiGet<TimelineData>("/" + username + "/timeline").then(timelineData =>
        this.setState({ timelineData })
      ),
      apiGet<ContributionsPerRepo[]>("/" + username + "/contributions").then(
        contributionsPerRepo => this.setState({ contributionsPerRepo })
      )
    ]).catch(e => {
      if (e.status === 404) {
        this.props.router.push("/404");
      } else {
        this.props.router.push("/error");
      }
    });
  }
}

export default withRouter(UserPage);
