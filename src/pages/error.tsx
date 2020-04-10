import Page from "components/context/Page";
import HomeSearchForm from "components/form/HomeSearchForm/HomeSearchForm";
import Router from "next/router";
import React from "react";

function Error() {
  return (
    <Page description={`Error Page`}>
      <p style={{ fontWeight: "bold", color: "red" }}>
        Server error. Please try again later.
      </p>
      <HomeSearchForm
        searchUser={username => Router.push("/[username]", "/" + username)}
      />
    </Page>
  );
}

export default Error;
