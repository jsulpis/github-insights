import fetchLanguages from "infrastructure/fetchLanguages";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;

  return fetchLanguages(username)
    .then(languages => res.status(200).json(languages))
    .catch(err => res.status(err.status).json(err.message));
};
