import fetchUser from "infrastructure/fetchUser";
import { NextApiResponse } from "next";

export default async (_, res: NextApiResponse) => {
  const user = await fetchUser("jsulpis");

  res.status(200).json(user);
};
