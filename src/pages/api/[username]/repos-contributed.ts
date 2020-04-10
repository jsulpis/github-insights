import fetchReposContributedTo from "lambdas/fetchReposContributedTo";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;

  return fetchReposContributedTo(username)
    .then(repos => res.status(200).json(repos))
    .catch(err => res.status(err.status).json(err.message));
};
