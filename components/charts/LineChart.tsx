import React from "react";
import { Line } from "react-chartjs-2";
import { ChartProps } from "./chart.models";

function LineChart(props: ChartProps) {
  const data = makeDataFromProps(props);
  // don't render the chart in tests
  return <>{process.browser && <Line data={data} options={options} />}</>;
}

const chartColor = "rgb(123, 201, 111)";
const chartColorLight = "rgba(123, 201, 111, 0.8)";

const makeDataFromProps = (props: ChartProps) => {
  return canvas => {
    const ctx = canvas.getContext("2d");

    const gradientFill = ctx.createLinearGradient(0, 100, 0, 0);
    gradientFill.addColorStop(0.1, "#fff");
    gradientFill.addColorStop(1, chartColorLight);
    return {
      labels: props.data.map(data => data.label),
      datasets: [
        {
          label: props.unit,
          borderColor: chartColor,
          pointBorderColor: "#FFF",
          pointBackgroundColor: chartColor,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: props.data.map(data => data.value)
        }
      ]
    };
  };
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        display: 0,
        ticks: {
          display: false
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: true
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

export default LineChart;
