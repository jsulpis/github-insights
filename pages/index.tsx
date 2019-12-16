import "bootstrap/dist/css/bootstrap.min.css";
import Page from "components/Page";
// reactstrap components
import UserProfile from "components/UserProfile/UserProfile";
import fetchRepos from "infrastructure/fetchRepos";
import fetchUser from "infrastructure/fetchUser";
import Repository from "models/Repository";
import User from "models/User";
import "paper-dashboard-react/src/assets/css/paper-dashboard.css";
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
    fetchUser("jsulpis").then(user => this.setState({ user }));
    fetchRepos("jsulpis").then(repos => this.setState({ repos }));
  }

  public render() {
    const user = this.state.user;
    const repos = this.state.repos;
    return (
      <>
        {user && repos && (
          <Page
            title={"GitHub stats of " + user.name}
            description={"This is the home page"}
          >
            <UserProfile user={user} repos={repos} />
          </Page>
        )}
      </>
    );
  }
}

export default HomePage;
