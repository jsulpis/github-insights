import apiGet from "lib/apiGet";
import { getServerSideProps } from "pages/[username]";

const USERNAME = "jsulpis";

jest.mock("lib/apiGet");
jest.mock("react-chartjs-2");
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    asPath: "",
    query: {}
  })
}));

describe("User Page", () => {
  describe("getServerSideProps", () => {
    it("should fetch data using the API", () => {
      getServerSideProps({
        params: { username: USERNAME },
        // @ts-ignore
        res: { setHeader: jest.fn() }
      });

      expect(apiGet).toHaveBeenCalledWith("/" + USERNAME);
      expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/repos-owned");
      expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/repos-contributed");
      expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/timeline");
      expect(apiGet).toHaveBeenCalledWith("/" + USERNAME + "/contributions");
    });

    it("should redirect to the 404 page if user not found", async () => {
      (apiGet as jest.Mock).mockRejectedValue({ status: 404 });

      const response = await getServerSideProps({
        params: { username: "hyrt" },
        // @ts-ignore
        res: { setHeader: jest.fn() }
      });

      expect(response).toEqual({ notFound: true });
    });

    it("should redirect to the error page if an error occured", async () => {
      (apiGet as jest.Mock).mockRejectedValue({ status: 500 });

      const response = await getServerSideProps({
        params: { username: "hyrt" },
        // @ts-ignore
        res: { setHeader: jest.fn() }
      });

      expect(response).toEqual({
        redirect: {
          destination: "/error",
          permanent: false
        }
      });
    });
  });
});
