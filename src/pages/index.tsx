import Page from "components/context/Page";
import HomeSearchForm from "components/form/HomeSearchForm/HomeSearchForm";
import Router from "next/router";
import React from "react";

function HomePage() {
  return (
    <Page>
      <HomeSearchForm
        searchUser={username => Router.push("/[username]", "/" + username)}
      />
    </Page>
  );
}

export default HomePage;
