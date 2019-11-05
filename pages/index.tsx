import Page from "components/Page";
import fetchUser from "infrastructure/fetchUser";
import User from "models/User";
import React from "react";

interface HomePageState {
  user: User;
}

class HomePage extends React.Component<any, HomePageState> {
  constructor(args) {
    super(args);
    this.state = { user: null };
  }

  public componentDidMount() {
    fetchUser("jsulpis").then(user => this.setState({ user }));
  }

  public render() {
    const user = this.state.user;
    return (
      <Page title={"Home"} description={"This is the home page"}>
        <div className="hero">
          {!!user && <h1 className="title">{user.username}</h1>}
        </div>

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
        `}</style>
      </Page>
    );
  }
}

export default HomePage;
