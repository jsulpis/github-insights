import { Page } from "components/context/Page";
import { HomeSearchForm } from "components/form/HomeSearchForm/HomeSearchForm";

export default function ErrorPage() {
  return (
    <Page title="GitHub Insights - 404" description="404 - User not found">
      <p className="mt-3 mb-1 h4">404</p>
      <p className="">This user does not appear to exist !</p>
      <HomeSearchForm />
    </Page>
  );
}
