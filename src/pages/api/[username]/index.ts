import fetchUser from "lambdas/fetchUser";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;

  return fetchUser(username)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(err.status).json(err.message));
};
