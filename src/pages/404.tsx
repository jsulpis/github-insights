import { Page } from "components/context/Page";
import { HomeSearchForm } from "components/form/HomeSearchForm/HomeSearchForm";
import Router from "next/router";

export default function ErrorPage() {
  return (
    <Page title="GitHub Insights - 404" description="404 - User not found">
      <p className="mt-3 mb-1 h4">404</p>
      <p className="">This user does not appear to exist !</p>
      <HomeSearchForm searchUser={username => Router.push("/[username]", "/" + username)} />
    </Page>
  );
}
