import Page from "components/context/Page";
import HomeSearchForm from "components/form/HomeSearchForm/HomeSearchForm";
import Router from "next/router";
import React from "react";

function ErrorPage() {
  return (
    <Page title={"GitHub stats"} description={`404 Page`}>
      <HomeSearchForm
        searchUser={username => Router.push("/[username]", "/" + username)}
      />
      <p className="mt-3">This user does not appear to exist !</p>
    </Page>
  );
}

export default ErrorPage;
