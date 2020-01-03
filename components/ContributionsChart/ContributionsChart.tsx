import React from "react";
import { Line } from "react-chartjs-2";
import "./ContributionsChart.scss";

interface ContributionsChartProps {
  data: number[];
}

function ContributionsChart(props: ContributionsChartProps) {
  const data = makeDataFromProps(props);
  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
}

const chartColor = "rgb(123, 201, 111)";
const chartColorLight = "rgba(123, 201, 111, 0.8)";

const makeDataFromProps = (props: ContributionsChartProps) => {
  return canvas => {
    const ctx = canvas.getContext("2d");

    const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0.4, "#fff");
    gradientFill.addColorStop(1, chartColorLight);
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Contributions",
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
          data: props.data
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
  title: {
    display: true,
    text: "Contributions"
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
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 }
  }
};

export default ContributionsChart;
