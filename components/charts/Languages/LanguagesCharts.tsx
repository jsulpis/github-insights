import { Language } from "models/Language";
import Repository from "models/Repository";
import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { HorizontalBarChart } from "../BarCharts/BarCharts";
import { ChartData } from "../chart.models";
import "./LanguagesCharts.scss";

interface LanguagesChartsProps {
  languages: Map<Language, number>;
  repos: Repository[];
}

function LanguagesCharts(props: LanguagesChartsProps) {
  const { languages, repos } = props;

  const reposPerLanguage = countReposPerLanguage(repos);
  const languagesByNumberOfRepos: ChartData[] = makeChartDataFromLanguages(
    reposPerLanguage
  );

  const moreThanSixLanguages = languages.size > 6 || reposPerLanguage.size > 6;

  return (
    <Card className="card-user">
      <CardHeader>
        <CardTitle tag="h5">Languages</CardTitle>
        {moreThanSixLanguages && (
          <p className="languages-subtitle">(6 most used languages only)</p>
        )}
      </CardHeader>
      <CardBody>
        <div className="languages-charts">
          <LanguagesByCodeAmountChart languages={languages} />
          <LanguagesByReposChart data={languagesByNumberOfRepos.slice(0, 6)} />
        </div>
      </CardBody>
    </Card>
  );
}

function LanguagesByCodeAmountChart(props: {
  languages: Map<Language, number>;
}) {
  const languages = props.languages;
  for (const [key, value] of languages) {
    languages.set(key, value / 1000000);
  }
  const languagesByAmountOfCode: ChartData[] = makeChartDataFromLanguages(
    languages
  );

  return (
    <div className="languages-chart">
      <HorizontalBarChart
        data={languagesByAmountOfCode.slice(0, 6)}
        unit="Bytes of code"
        xlabel="Amount of code (MB)"
      />
    </div>
  );
}

function LanguagesByReposChart(props: { data: ChartData[] }) {
  return (
    <div className="languages-chart">
      <HorizontalBarChart
        data={props.data}
        unit="Repos"
        xlabel="Number of repos"
      />
    </div>
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
      color: repo.primaryLanguage
        ? repo.primaryLanguage.color
        : "rgba(0,0,0,0.3)"
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
