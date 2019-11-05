import { NextApiResponse } from "next";
import fetchUser from "../../infrastructure/fetchUser";

export default (_, res: NextApiResponse) => {
  const user = fetchUser("jsulpis");

  res.status(200).json({ user });
};
