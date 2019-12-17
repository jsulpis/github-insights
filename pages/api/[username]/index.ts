import fetchUser from "infrastructure/fetchUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username;
  const user = await fetchUser(username as string);

  res.status(200).json(user);
};
