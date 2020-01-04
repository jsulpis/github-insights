import fetchContributions from "infrastructure/fetchContributions";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username;

  return fetchContributions(username as string)
    .then(contributions => res.status(200).json(contributions))
    .catch(err => res.status(err.status).json(err.message));
};
