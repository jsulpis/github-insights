import { Languages } from "infrastructure/fetchLanguages";
import React from "react";
import { ChartData } from "../chart.models";
import HorizontalBarChart from "../HorizontalBarsChart";
import "./LanguagesBars.scss";

interface LanguagesPieProps {
  languages: Languages;
}

function LanguagesCharts(props: LanguagesPieProps) {
  const chartData: ChartData[] = Object.entries(props.languages)
    .map(([language, totalSize]) => {
      return {
        label: language,
        value: totalSize
      };
    })
    .sort((lang1, lang2) => lang2.value - lang1.value)
    .slice(0, 6);

  const message =
    Object.keys(props.languages).length > 6
      ? "6 most used languages, by repos size"
      : "By repos size";

  return (
    <div>
      <h4 className="chart-title">Languages</h4>
      <h5 className="chart-subtitle">{message}</h5>
      <div className="languages-chart-wrapper">
        <HorizontalBarChart data={chartData} />
      </div>
    </div>
  );
}

export default LanguagesCharts;
