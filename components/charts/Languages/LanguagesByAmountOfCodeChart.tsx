import { Language } from "models/Language";
import React from "react";
import { HorizontalBarChart } from "../BarCharts/BarCharts";
import { ChartData } from "../chart.models";
import { makeChartDataFromLanguages } from "./LanguagesCharts";

export default function LanguagesByAmountOfCodeChart(props: {
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
        unit="Megabytes of code"
        xlabel="Amount of code (MB)"
      />
    </div>
  );
}
