import fetchContributionsPerRepo from "infrastructure/fetchContributionsPerRepo";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username;

  return fetchContributionsPerRepo(username as string)
    .then(contributions => res.status(200).json(contributions))
    .catch(err => res.status(err.status).json(err.message));
};
