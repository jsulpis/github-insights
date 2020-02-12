import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { ChartProps } from "../chart.models";
import { shadeColor } from "../utils/colors.utils";

function HorizontalBarChart(props: ChartProps) {
  const data = makeDataFromProps(props);
  return <HorizontalBar data={data} options={options} />;
}

const makeDataFromProps = (props: ChartProps) => {
  return () => {
    return {
      labels: props.data.map(data => data.label),
      datasets: [
        {
          label: props.unit,
          backgroundColor: props.data.map(data =>
            shadeColor(data.color, 20, 0.2)
          ),
          borderWidth: 1,
          data: props.data.map(data => data.value)
        }
      ]
    };
  };
};

const options = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: true,
          fontStyle: "bold"
        },
        gridLines: {
          zeroLineColor: "transparent",
          display: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false
        }
      }
    ]
  }
};

export default HorizontalBarChart;
