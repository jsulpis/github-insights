import fetchRepos from "infrastructure/fetchRepos";
import { NextApiResponse } from "next";

export default async (_, res: NextApiResponse) => {
  const repos = await fetchRepos("jsulpis");

  res.status(200).json(repos);
};
