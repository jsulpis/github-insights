import { Languages } from "infrastructure/fetchLanguages";
import Repository from "models/Repository";
import React from "react";
import { Card, CardBody } from "reactstrap";
import { ChartData } from "../chart.models";
import HorizontalBarChart from "../HorizontalBarsChart";
import "./LanguagesBars.scss";

interface LanguagesChartsProps {
  languages: Languages;
  repos: Repository[];
}

function LanguagesCharts(props: LanguagesChartsProps) {
  const languagesByAmountOfCode: ChartData[] = makeChartDataFromLanguages(
    props.languages
  ).slice(0, 6);

  const languagesByNumberOfRepos = makeChartDataFromLanguages(
    collectLanguages(props.repos)
  );

  const message =
    Object.keys(props.languages).length > 6
      ? "6 most used languages, by amount of code"
      : "By amount of code";

  return (
    <Card className="card-user">
      <CardBody>
        <h4 className="chart-title">Languages</h4>
        <div className="languages-charts">
          <div>
            <h5 className="chart-subtitle">{message}</h5>
            <HorizontalBarChart
              data={languagesByAmountOfCode}
              unit="Bytes of code"
            />
          </div>
          <div>
            <h5 className="chart-subtitle">By number of repos</h5>
            <HorizontalBarChart data={languagesByNumberOfRepos} unit="Repos" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function makeChartDataFromLanguages(languages: Languages) {
  return Object.entries(languages)
    .map(([language, totalSize]) => {
      return {
        label: language,
        value: totalSize
      };
    })
    .sort((lang1, lang2) => lang2.value - lang1.value);
}

function collectLanguages(repos: Repository[]): Languages {
  const languages = {};
  for (const repo of repos) {
    const language = repo.language || "None";
    languages[language] = (languages[language] || 0) + 1;
  }
  return languages;
}

export default LanguagesCharts;
