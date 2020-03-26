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

function keepIfStartsWithOne(value) {
  return (value * 100).toString()[0] === "1" ? value : null;
}

function keepIfStartsWithOneOrThree(value) {
  return (value * 100).toString()[0] === "1" ||
    (value * 100).toString()[0] === "3"
    ? value
    : null;
}

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
          callback: (value, _, values) => {
            if (value === values[0]) {
              return value;
            }
            if (values[0] >= 300) {
              return keepIfStartsWithOne(value);
            }
            return keepIfStartsWithOneOrThree(value);
          }
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
          callback: (value, _, values) => {
            if (value === values[values.length - 1]) {
              return value;
            }
            return keepIfStartsWithOneOrThree(value);
          }
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
