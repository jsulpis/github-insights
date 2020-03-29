import FadeTransition from "components/animation/FadeTransition/FadeTransition";
import Spinner from "components/animation/Spinner/Spinner";
import ContributionsChart from "components/charts/Contributions/ContributionsChart";
import LanguagesCharts from "components/charts/Languages/LanguagesCharts";
import RepositoriesCharts from "components/charts/Repositories/RepositoriesCharts";
import Page from "components/context/Page";
import SearchForm from "components/form/SearchForm/SearchForm";
import Footer from "components/main/Footer/Footer";
import UserProfile from "components/main/UserProfile/UserProfile";
import apiGet from "lib/apiGet";
import {
  ContributionsPerMonth,
  ContributionsPerRepo
} from "models/Contributions";
import { RepositoryContributedTo, RepositoryOwned } from "models/Repository";
import User from "models/User";
import { withRouter } from "next/router";
import React from "react";

interface UserPageState {
  user: User;
  reposOwned: RepositoryOwned[];
  reposContributedTo: RepositoryContributedTo[];
  contributionsPerMonth: ContributionsPerMonth[];
  contributionsPerRepo: ContributionsPerRepo[];
}

const defaultState: UserPageState = {
  user: null,
  reposOwned: null,
  reposContributedTo: [],
  contributionsPerMonth: [],
  contributionsPerRepo: []
};

class UserPage extends React.Component<any, UserPageState> {
  constructor(args) {
    super(args);
    this.state = defaultState;
  }

  public render() {
    const user = this.state.user;
    const reposOwned = this.state.reposOwned;
    const reposContributedTo = this.state.reposContributedTo;
    const contributionsPerMonth = this.state.contributionsPerMonth;
    const contributionsPerRepo = this.state.contributionsPerRepo;
    const userFullName = !!user ? user.name : "";
    const isDataPresent = !!user && !!reposOwned;

    return (
      <Page
        title={"GitHub stats of " + userFullName}
        description={`Some stats about ${userFullName}'s GitHub profile`}
      >
        {isDataPresent && (
          <FadeTransition>
            <SearchForm
              searchUser={username => {
                this.setState(defaultState);
                this.props.router.push("/[username]", "/" + username);
              }}
            />
            <UserProfile user={user} repos={reposOwned} />
            <ContributionsChart
              contributionsPerMonth={contributionsPerMonth}
              contributionsPerRepo={contributionsPerRepo}
            />
            <LanguagesCharts repos={reposOwned} />
            <RepositoriesCharts repos={reposContributedTo} />
            <Footer />
          </FadeTransition>
        )}
        {!isDataPresent && (
          <FadeTransition>
            <p className="h5">Fetching your data...</p>
            <Spinner />
          </FadeTransition>
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
    apiGet<User>("/" + username).then(user => this.setState({ user }));
    apiGet<RepositoryOwned[]>("/" + username + "/repos-owned").then(
      reposOwned => this.setState({ reposOwned })
    );
    apiGet<RepositoryContributedTo[]>(
      "/" + username + "/repos-contributed"
    ).then(reposContributedTo => this.setState({ reposContributedTo }));
    apiGet<ContributionsPerMonth[]>("/" + username + "/timeline").then(
      contributionsPerMonth => this.setState({ contributionsPerMonth })
    );
    apiGet<ContributionsPerRepo[]>("/" + username + "/contributions").then(
      contributionsPerRepo => this.setState({ contributionsPerRepo })
    );
  }
}

export default withRouter(UserPage);
