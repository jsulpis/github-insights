import fetchUser from "infrastructure/fetchUser";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username;

  return fetchUser(username as string)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(err.status).json(err.message));
};
