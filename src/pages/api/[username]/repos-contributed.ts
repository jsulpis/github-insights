import fetchReposContributedTo from "lambdas/fetchReposContributedTo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = req.query.username as string;

  fetchReposContributedTo(username)
    .then(repos => {
      res.setHeader(
        "Cache-Control",
        `max-age=${60 * 60 * 12}, stale-while-revalidate=${60 * 60 * 24}`
      );
      res.status(200).json(repos);
    })
    .catch(err => res.status(err.status).json(err.message));
}
