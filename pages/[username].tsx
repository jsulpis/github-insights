import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "bootstrap/dist/css/bootstrap.min.css";
import Page from "components/Page";
import UserProfile from "components/UserProfile/UserProfile";
import fetchRepos from "infrastructure/fetchRepos";
import fetchUser from "infrastructure/fetchUser";
import Repository from "models/Repository";
import User from "models/User";
import { withRouter } from "next/router";
import "paper-dashboard-react/src/assets/scss/paper-dashboard.scss";
import React from "react";

interface HomePageState {
  user: User;
  repos: Repository[];
}

class HomePage extends React.Component<any, HomePageState> {
  constructor(args) {
    super(args);
    this.state = { user: null, repos: [] };
  }

  public componentDidMount() {
    const username = this.props.router.asPath.slice(1);
    fetchUser(username).then(user => this.setState({ user }));
    fetchRepos(username).then(repos => this.setState({ repos }));
  }

  public render() {
    const user = this.state.user;
    const repos = this.state.repos;
    return (
      <>
        {user && repos && (
          <Page
            title={"GitHub stats of " + user.name}
            description={`Some stats about ${user.name}'s GitHub profile`}
          >
            <UserProfile user={user} repos={repos} />
          </Page>
        )}
      </>
    );
  }
}

export default withRouter(HomePage);
