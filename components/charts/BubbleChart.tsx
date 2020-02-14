import React from "react";
import { Bubble } from "react-chartjs-2";

export interface BubbleChartPoint {
  name: string;
  x: number;
  y: number;
  radius?: number;
  color: string;
}

export interface BubbleChartProps {
  data: BubbleChartPoint[];
  xlabel: string;
  ylabel: string;
}

function BubbleChart(props: BubbleChartProps) {
  return (
    <Bubble
      data={makeDataFromProps(props)}
      options={makeOptionsFromProps(props)}
    />
  );
}

const makeDataFromProps = (props: BubbleChartProps) => {
  return {
    datasets: props.data.map(data => ({
      label: data.name,
      backgroundColor: data.color,
      data: [data]
    }))
  };
};

const makeOptionsFromProps = (props: BubbleChartProps) => ({
  maintainAspectRatio: true,
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        type: "logarithmic",
        gridLines: {
          display: false
        },
        ticks: {
          autoSkip: false,
          callback: (value, _, values) =>
            values[0] > 300
              ? (value * 10).toString()[0] === "1"
                ? value
                : null
              : value
        },
        scaleLabel: {
          display: true,
          labelString: props.ylabel
        }
      }
    ],
    xAxes: [
      {
        type: "logarithmic",
        gridLines: {
          display: false
        },
        ticks: {
          autoSkip: false,
          callback: (value, _, values) =>
            values[values.length - 1] > 100
              ? (value * 10).toString()[0] === "1"
                ? value
                : null
              : value
        },
        scaleLabel: {
          display: true,
          labelString: props.xlabel
        }
      }
    ]
  }
});

export default BubbleChart;
