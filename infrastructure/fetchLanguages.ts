import fetchRepos from "infrastructure/fetchRepos";
import httpGet from "lib/httpGet";
import Repository from "models/Repository";

export type Languages = { [K in string]: number };

export default function fetchLanguages(username: string): Promise<Languages> {
  return fetchAllRepoLanguages(username).then((repoLanguages: Languages[]) => {
    return repoLanguages.reduce(languagesReducer, {});
  });
}

function languagesReducer(acc: Languages, val: Languages): Languages {
  Object.keys(val).forEach(
    (lang: string) => (acc[lang] = (acc[lang] || 0) + val[lang])
  );
  return acc;
}

async function fetchAllRepoLanguages(username: string): Promise<Languages[]> {
  const repos = await fetchRepos(username);
  return Promise.all(
    repos.map((repo: Repository) =>
      httpGet(`https://api.github.com/repos/${username}/${repo.name}/languages`)
    )
  );
}
