import httpPost from "lib/httpPost";
import {
  GraphQLLanguagesResponse,
  RepositoryEdge
} from "./dto/graphql/languagesDTO";

export type Languages = { [K in string]: number };

export default function fetchLanguages(username: string): Promise<Languages> {
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
                          name
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

function collectLanguages(repos: RepositoryEdge[]): Languages {
  const languages = {};
  for (const repo of repos) {
    for (const lang of repo.node.languages.edges) {
      languages[lang.node.name] = (languages[lang.node.name] || 0) + lang.size;
    }
  }
  return languages;
}
