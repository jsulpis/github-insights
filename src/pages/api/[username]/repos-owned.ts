import fetchReposOwned from "lambdas/fetchReposOwned";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;

  return fetchReposOwned(username)
    .then(repos => res.status(200).json(repos))
    .catch(err => res.status(err.status).json(err.message));
};
