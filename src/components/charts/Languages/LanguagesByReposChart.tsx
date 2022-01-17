import { Language } from "models/Language";
import { RepositoryOwned } from "models/Repository";
import { FC } from "react";
import { HorizontalBarChart } from "../BarCharts/BarCharts";
import { ChartData } from "../chart.models";
import { makeChartDataFromLanguages } from "./LanguagesCharts";
import styles from "./LanguagesCharts.module.scss";

export const LanguagesByReposChart: FC<{ repos: RepositoryOwned[] }> = ({ repos }) => {
  const reposPerLanguage = countReposPerLanguage(repos);
  const languagesByNumberOfRepos: ChartData[] =
    makeChartDataFromLanguages(reposPerLanguage);

  return (
    <div className={styles.chart}>
      <HorizontalBarChart
        data={languagesByNumberOfRepos.slice(0, 6)}
        unit="Repositories"
        xlabel="Number of repositories"
      />
    </div>
  );
};

function countReposPerLanguage(repos: RepositoryOwned[]): Map<Language, number> {
  const languagesMap = new Map<string, number>(); // I use string keys to fake shallow keys equality
  for (const repo of repos) {
    const repoLanguage = JSON.stringify({
      name: repo.primaryLanguage ? repo.primaryLanguage.name : "None",
      color: repo.primaryLanguage ? repo.primaryLanguage.color : "rgba(0,0,0,0.3)"
    }); // workaround to use string keys instead of objects
    const currentLanguageSize = languagesMap.get(repoLanguage) || 0;
    languagesMap.set(repoLanguage, currentLanguageSize + 1);
  }
  // back to Language objects
  return new Map<Language, number>(
    [...languagesMap.entries()].map(([langToString, size]) => [
      JSON.parse(langToString),
      size
    ])
  );
}
