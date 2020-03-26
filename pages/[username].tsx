import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import FadeTransition from "components/animation/FadeTransition/FadeTransition";
import Spinner from "components/animation/Spinner/Spinner";
import ContributionsChart from "components/charts/Contributions/ContributionsChart";
import LanguagesCharts from "components/charts/Languages/LanguagesCharts";
import RepositoriesCharts from "components/charts/Repositories/RepositoriesCharts";
import Page from "components/context/Page";
import SearchForm from "components/form/SearchForm/SearchForm";
import UserProfile from "components/main/UserProfile/UserProfile";
import apiGet from "lib/apiGet";
import {
  ContributionsPerMonth,
  ContributionsPerRepo
} from "models/Contributions";
import Repository from "models/Repository";
import User from "models/User";
import { withRouter } from "next/router";
import "paper-dashboard-react/src/assets/scss/paper-dashboard.scss";
import React from "react";

interface UserPageState {
  user: User;
  repos: Repository[];
  contributionsPerMonth: ContributionsPerMonth[];
  contributionsPerRepo: ContributionsPerRepo[];
}

const defaultState = {
  user: null,
  repos: null,
  contributionsPerMonth: null,
  contributionsPerRepo: null
};

class UserPage extends React.Component<any, UserPageState> {
  constructor(args) {
    super(args);
    this.state = defaultState;
  }

  public render() {
    const user = this.state.user;
    const repos = this.state.repos;
    const contributionsPerMonth = this.state.contributionsPerMonth;
    const contributionsPerRepo = this.state.contributionsPerRepo;
    const userFullName = !!user ? user.name : "";
    const isDataPresent =
      !!user && !!repos && !!contributionsPerMonth && !!contributionsPerRepo;

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
            <UserProfile user={user} repos={repos} />
            <ContributionsChart
              contributionsPerMonth={contributionsPerMonth}
              contributionsPerRepo={contributionsPerRepo}
            />
            <LanguagesCharts repos={repos} />
            <RepositoriesCharts repos={repos} />
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
    apiGet<Repository[]>("/" + username + "/repos-owned").then(repos =>
      this.setState({ repos })
    );
    apiGet<ContributionsPerMonth[]>("/" + username + "/timeline").then(
      contributionsPerMonth => this.setState({ contributionsPerMonth })
    );
    apiGet<ContributionsPerRepo[]>("/" + username + "/contributions").then(
      contributionsPerRepo => this.setState({ contributionsPerRepo })
    );
  }
}

export default withRouter(UserPage);
