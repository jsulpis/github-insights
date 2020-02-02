import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeSearchForm from "components/HomeSearchForm/HomeSearchForm";
import Page from "components/Page";
import Router from "next/router";
import "paper-dashboard-react/src/assets/css/paper-dashboard.min.css";
import React from "react";

function HomePage() {
  return (
    <Page
      title={"GitHub stats"}
      description={`Some stats about a GitHub profile`}
    >
      <HomeSearchForm
        searchUser={username => Router.push("/[username]", "/" + username)}
      />
    </Page>
  );
}

export default HomePage;
