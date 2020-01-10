import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import Page from "components/Page";
import UserProfile from "components/UserProfile/UserProfile";
import Repository from "models/Repository";
import User from "models/User";
import Router from "next/router";
import { withRouter } from "next/router";
import "paper-dashboard-react/src/assets/scss/paper-dashboard.scss";
import React from "react";
import ContributionsChart from "../components/charts/Contributions/ContributionsChart";
import LanguagesCharts from "../components/charts/Languages/LanguagesCharts";
import SearchForm from "../components/SearchForm/SearchForm";
import Spinner from "../components/Spinner/Spinner";
import apiGet from "../lib/apiGet";
import { Language } from "../models/Language";
import { MonthlyContribution } from "../models/MonthlyContribution";

interface UserPageState {
  user: User;
  repos: Repository[];
  contributions: MonthlyContribution[];
  languages: Map<Language, number>;
}

class UserPage extends React.Component<any, UserPageState> {
  constructor(args) {
    super(args);
    this.state = { user: null, repos: [], contributions: [], languages: null };
  }

  public componentDidUpdate(prevProps) {
    const username = this.props.router.query.username;
    // verify props have changed to avoid an infinite loop
    if (username !== prevProps.router.query.username) {
      apiGet<User>("/" + username).then(user => this.setState({ user }));
      apiGet<MonthlyContribution[]>("/" + username + "/contributions").then(
        contributions => this.setState({ contributions })
      );
      apiGet<Repository[]>("/" + username + "/repos").then(repos =>
        this.setState({ repos })
      );
      apiGet("/" + username + "/languages").then((languages: any) =>
        this.setState({ languages: new Map(languages) })
      );
    }
  }

  public render() {
    const user = this.state.user;
    const repos = this.state.repos;
    const contributions = this.state.contributions;
    const languages = this.state.languages;
    const userFullName = !!user ? user.name : "";
    const isDataPresent =
      !!user && repos.length > 0 && contributions.length > 0 && !!languages;

    return (
      <Page
        title={"GitHub stats of " + userFullName}
        description={`Some stats about ${userFullName}'s GitHub profile`}
      >
        <SearchForm searchUser={username => Router.push("/" + username)} />
        {isDataPresent && (
          <>
            <UserProfile user={user} repos={repos} />
            <ContributionsChart contributions={contributions} />
            <LanguagesCharts languages={languages} repos={repos} />
          </>
        )}
        {!isDataPresent && <Spinner />}
      </Page>
    );
  }
}

export default withRouter(UserPage);
