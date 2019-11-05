import fetchUser from "infrastructure/fetchUser";
import { NextApiResponse } from "next";

export default (_, res: NextApiResponse) => {
  const user = fetchUser("jsulpis");

  res.status(200).json(user);
};
