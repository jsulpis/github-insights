import React from "react";
import { Bar, HorizontalBar } from "react-chartjs-2";
import { ChartProps } from "../chart.models";
import BarChartPropsParser from "./BarChartPropsParser";

export function HorizontalBarChart(props: ChartProps) {
  return (
    <HorizontalBar
      data={BarChartPropsParser.makeDataFromProps(props)}
      options={BarChartPropsParser.makeOptionsFromProps(props)}
    />
  );
}

export function VerticalBarChart(props: ChartProps) {
  return (
    <Bar
      data={BarChartPropsParser.makeDataFromProps(props)}
      options={BarChartPropsParser.makeOptionsFromProps(props)}
    />
  );
}
