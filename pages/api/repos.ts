import { NextApiResponse } from "next";
import fetchRepos from "../../infrastructure/fetchRepos";

export default (_, res: NextApiResponse) => {
  const repos = fetchRepos("jsulpis");

  res.status(200).json(repos);
};
