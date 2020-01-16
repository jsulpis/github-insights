import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartProps } from "../chart.models";
import { shadeColor } from "../utils/colors.utils";

function VerticalBarChart(props: ChartProps) {
  const data = makeDataFromProps(props);
  // don't render the chart in tests
  return <>{process.browser && <Bar data={data} options={options} />}</>;
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
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ]
  }
};

export default VerticalBarChart;
