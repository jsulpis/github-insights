import { Language } from "models/Language";
import { RepositoryOwned } from "models/Repository";
import { FC } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { ChartData } from "../chart.models";
import { LanguagesByAmountOfCodeChart } from "./LanguagesByAmountOfCodeChart";
import { LanguagesByReposChart } from "./LanguagesByReposChart";
import styles from "./LanguagesCharts.module.scss";

export const LanguagesCharts: FC<{ repos: RepositoryOwned[] }> = ({ repos }) => {
  const languagesMap = extractLanguageMapFromRepos(repos);

  const moreThanSixLanguages = languagesMap.size > 6;

  return (
    <Card className="card-user">
      <CardHeader>
        <CardTitle tag="h5">Languages</CardTitle>
        <p className="card-description mb-1">
          Data extracted from the 100 latest public repositories owned by the user,
          excluding forked repositories.
        </p>
        {moreThanSixLanguages && (
          <p className={`card-description ${styles.info}`}>
            <em>(6 most used languages only)</em>
          </p>
        )}
      </CardHeader>
      <CardBody>
        <div className={styles.charts}>
          <LanguagesByAmountOfCodeChart languages={languagesMap} />
          <LanguagesByReposChart repos={repos} />
        </div>
      </CardBody>
    </Card>
  );
};

function extractLanguageMapFromRepos(repos: RepositoryOwned[]) {
  const languagesMap = new Map<string, number>(); // I use string keys to fake shallow keys equality
  for (const repo of repos) {
    for (const lang of repo.languages) {
      const repoLanguage = JSON.stringify({
        name: lang.name,
        color: lang.color
      }); // workaround to use string keys instead of objects
      const currentLanguageSize = languagesMap.get(repoLanguage) || 0;
      languagesMap.set(repoLanguage, currentLanguageSize + lang.amountOfCodeInBytes);
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

export function makeChartDataFromLanguages(
  languages: Map<Language, number>
): ChartData[] {
  return [...languages.entries()]
    .map(([language, totalSize]) => {
      return {
        label: language.name,
        value: totalSize,
        color: language.color || ""
      };
    })
    .sort((lang1, lang2) => lang2.value - lang1.value);
}
