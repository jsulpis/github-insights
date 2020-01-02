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
import SearchForm from "../components/SearchForm/SearchForm";
import apiGet from "../lib/apiGet";

interface UserPageState {
  user: User;
  repos: Repository[];
}

class UserPage extends React.Component<any, UserPageState> {
  constructor(args) {
    super(args);
    this.state = { user: null, repos: [] };
  }

  public componentDidUpdate(prevProps) {
    const username = this.props.router.query.username;
    // verify props have changed to avoid an infinite loop
    if (username !== prevProps.router.query.username) {
      apiGet<User>("/" + username).then(user => this.setState({ user }));
      apiGet<Repository[]>("/" + username + "/repos").then(repos =>
        this.setState({ repos })
      );
    }
  }

  public render() {
    const user = this.state.user;
    const repos = this.state.repos;
    const userFullName = !!user ? user.name : "";

    return (
      <Page
        title={"GitHub stats of " + userFullName}
        description={`Some stats about ${userFullName}'s GitHub profile`}
      >
        <SearchForm searchUser={username => Router.push("/" + username)} />
        {user && repos && <UserProfile user={user} repos={repos} />}
      </Page>
    );
  }
}

export default withRouter(UserPage);
