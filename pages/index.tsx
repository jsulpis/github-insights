import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "next/router";
import "paper-dashboard-react/src/assets/scss/paper-dashboard.scss";
import React from "react";
import HomeSearchForm from "../components/HomeSearchForm/HomeSearchForm";
import Page from "../components/Page";

function HomePage() {
  return (
    <Page
      title={"GitHub stats"}
      description={`Some stats about a GitHub profile`}
    >
      <HomeSearchForm searchUser={username => Router.push("/" + username)} />
    </Page>
  );
}

export default HomePage;
