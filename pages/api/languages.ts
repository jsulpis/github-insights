import fetchLanguages from "infrastructure/fetchLanguages";
import { NextApiResponse } from "next";

export default async (_, res: NextApiResponse) => {
  const languages = await fetchLanguages("jsulpis");

  res.status(200).json(languages);
};
