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
}

function BubbleChart(props: BubbleChartProps) {
  return <Bubble data={makeDataFromProps(props)} options={options} />;
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

const options = {
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
          callback: value => value
        },
        scaleLabel: {
          display: true,
          labelString: "Commit count",
          fontStyle: "bold"
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
          callback: value => value
        },
        scaleLabel: {
          display: true,
          labelString: "Repo size (MB)",
          fontStyle: "bold"
        }
      }
    ]
  }
};

export default BubbleChart;
