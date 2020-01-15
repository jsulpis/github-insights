import Repository from "models/Repository";
import React from "react";
import { Card, CardBody } from "reactstrap";
import { Language } from "../../../models/Language";
import { ChartData } from "../chart.models";
import HorizontalBarChart from "../HorizontalBarsChart";
import "./LanguagesBars.scss";

interface LanguagesChartsProps {
  languages: Map<Language, number>;
  repos: Repository[];
}

function LanguagesCharts(props: LanguagesChartsProps) {
  const languagesByAmountOfCode: ChartData[] = makeChartDataFromLanguages(
    props.languages
  );

  const languagesByNumberOfRepos: ChartData[] = makeChartDataFromLanguages(
    countReposPerLanguage(props.repos)
  );

  const codeLanguagesMessage =
    props.languages.size > 6
      ? "6 most used languages, by amount of code"
      : "By amount of code";

  const repoLanguagesMessage =
    languagesByNumberOfRepos.length > 6
      ? "6 most used languages, by number of repos"
      : "By number of repos";

  return (
    <Card className="card-user">
      <CardBody>
        <h4 className="chart-title">Languages</h4>
        <div className="languages-charts">
          <div>
            <h5 className="chart-subtitle code-languages">
              {codeLanguagesMessage}
            </h5>
            <HorizontalBarChart
              data={languagesByAmountOfCode.slice(0, 6)}
              unit="Bytes of code"
            />
          </div>
          <div>
            <h5 className="chart-subtitle repo-languages">
              {repoLanguagesMessage}
            </h5>
            <HorizontalBarChart
              data={languagesByNumberOfRepos.slice(0, 6)}
              unit="Repos"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function makeChartDataFromLanguages(
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

function countReposPerLanguage(repos: Repository[]): Map<Language, number> {
  const languagesMap = new Map<string, number>(); // I use string keys to fake shallow keys equality
  for (const repo of repos) {
    const repoLanguage = JSON.stringify({
      name: repo.primaryLanguage ? repo.primaryLanguage.name : "None",
      color: repo.primaryLanguage ? repo.primaryLanguage.color : ""
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

export default LanguagesCharts;
