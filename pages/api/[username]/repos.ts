import fetchRepos from "infrastructure/fetchRepos";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username;

  return fetchRepos(username as string)
    .then(repos => res.status(200).json(repos))
    .catch(err => res.status(err.status).json(err.message));
};
