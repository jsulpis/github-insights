import { Language } from "models/Language";
import { FC } from "react";
import { HorizontalBarChart } from "../BarCharts/BarCharts";
import { ChartData } from "../chart.models";
import { makeChartDataFromLanguages } from "./LanguagesCharts";
import styles from "./LanguagesCharts.module.scss";

export const LanguagesByAmountOfCodeChart: FC<{
  languages: Map<Language, number>;
}> = ({ languages }) => {
  for (const [key, value] of languages) {
    languages.set(key, value / 1000000);
  }
  const languagesByAmountOfCode: ChartData[] = makeChartDataFromLanguages(languages);

  return (
    <div className={styles.chart}>
      <HorizontalBarChart
        data={languagesByAmountOfCode.slice(0, 6)}
        unit="Megabytes of code"
        xlabel="Amount of code (MB)"
      />
    </div>
  );
};
