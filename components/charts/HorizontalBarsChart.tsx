import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { ChartProps } from "./chart.models";

function HorizontalBarChart(props: ChartProps) {
  const data = makeDataFromProps(props);
  // don't render the chart in tests
  return (
    <>{process.browser && <HorizontalBar data={data} options={options} />}</>
  );
}

const chartColor = "rgba(111,155,199,1)";
const chartColorLight = "rgba(111,155,199,0.8)";

const makeDataFromProps = (props: ChartProps) => {
  return canvas => {
    const ctx = canvas.getContext("2d");

    const gradientFill = ctx.createLinearGradient(0, 100, 0, 0);
    gradientFill.addColorStop(0, "#fff");
    gradientFill.addColorStop(1, chartColorLight);
    return {
      labels: props.data.map(data => data.label),
      datasets: [
        {
          label: props.unit,
          borderColor: chartColor,
          fill: true,
          backgroundColor: gradientFill,
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
  responsive: 1,
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
