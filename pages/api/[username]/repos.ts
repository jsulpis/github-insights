import fetchRepos from "infrastructure/fetchRepos";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username;
  const repos = await fetchRepos(username as string);

  res.status(200).json(repos);
};
