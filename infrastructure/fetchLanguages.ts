import httpPost from "lib/httpPost";
import { Language } from "../models/Language";
import {
  GraphQLLanguagesResponse,
  RepositoryEdge
} from "./dto/graphql/languagesDTO";

export default function fetchLanguages(
  username: string
): Promise<Map<Language, number>> {
  const headers = {
    Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`
  };
  const body = {
    query: `query {
            user(login: "${username}") {
              repositories(first: 100, ownerAffiliations:OWNER) {
                edges {
                  node {
                    languages(first:100) {
                      edges {
                        size,
                        node {
                          name,
                          color
                        }
                      }
                    }
                  }
                }
              }
            }
          }`
  };
  return httpPost("https://api.github.com/graphql", body, headers).then(
    (res: GraphQLLanguagesResponse) =>
      collectLanguages(res.data.user.repositories.edges)
  );
}

function collectLanguages(repos: RepositoryEdge[]): Map<Language, number> {
  const languagesMap = new Map<string, number>(); // I use string keys to fake shallow keys equality
  for (const repo of repos) {
    for (const lang of repo.node.languages.edges) {
      const repoLanguage = JSON.stringify(lang.node); // workaround to use string keys instead of objects
      const currentLanguageSize = languagesMap.get(repoLanguage) || 0;
      languagesMap.set(repoLanguage, currentLanguageSize + lang.size);
    }
  }
  // back to Language objects
  return new Map<Language, number>(
    [...languagesMap.entries()].map(([langToString, size]) => [
      JSON.parse(langToString),
      size
    ])
  );
}
