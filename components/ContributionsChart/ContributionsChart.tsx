import React from "react";
import { Line } from "react-chartjs-2";
import { MonthlyContribution } from "../../models/MonthlyContribution";
import "./ContributionsChart.scss";

interface ContributionsChartProps {
  contributions: MonthlyContribution[];
}

function ContributionsChart(props: ContributionsChartProps) {
  const data = makeDataFromProps(props);
  const totalContributions = props.contributions.reduce(
    (acc, current) => acc + current.contributions,
    0
  );
  return (
    <div className="chart-wrapper">
      <h4>Activity</h4>
      <h5>{totalContributions} contributions in the last year</h5>
      {// don't render the chart in tests
      process.browser && <Line data={data} options={options} />}
    </div>
  );
}

const chartColor = "rgb(123, 201, 111)";
const chartColorLight = "rgba(123, 201, 111, 0.8)";

const makeDataFromProps = (props: ContributionsChartProps) => {
  return canvas => {
    const ctx = canvas.getContext("2d");

    const gradientFill = ctx.createLinearGradient(0, 100, 0, 0);
    gradientFill.addColorStop(0.1, "#fff");
    gradientFill.addColorStop(1, chartColorLight);
    return {
      labels: props.contributions.map(contrib => contrib.month),
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
          data: props.contributions.map(contrib => contrib.contributions)
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

export default ContributionsChart;
