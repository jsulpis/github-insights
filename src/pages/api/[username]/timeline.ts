import fetchContributionsCalendar from "lambdas/fetchContributionsCalendar";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;

  return fetchContributionsCalendar(username)
    .then(contributions => res.status(200).json(contributions))
    .catch(err => res.status(err.status).json(err.message));
};
