import Page from "components/context/Page";
import HomeSearchForm from "components/form/HomeSearchForm/HomeSearchForm";
import Router from "next/router";
import React from "react";

export default () => (
  <Page description={`404 Page`}>
    <p className="mt-3 mb-1 h4">404</p>
    <p className="">This user does not appear to exist !</p>
    <HomeSearchForm searchUser={username => Router.push("/[username]", "/" + username)} />
  </Page>
);
