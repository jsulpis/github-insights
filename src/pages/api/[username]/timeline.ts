import fetchContributionsCalendar from "lambdas/fetchContributionsCalendar";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = req.query.username as string;

  return fetchContributionsCalendar(username)
    .then(contributions => {
      res.setHeader(
        "Cache-Control",
        `max-age=${60 * 60 * 12}, stale-while-revalidate=${60 * 60 * 24}`
      );
      res.status(200).json(contributions);
    })
    .catch(err => res.status(err.status).json(err.message));
}
