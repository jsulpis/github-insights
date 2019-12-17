import fetchLanguages from "infrastructure/fetchLanguages";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username;
  const languages = await fetchLanguages(username as string);

  res.status(200).json(languages);
};
