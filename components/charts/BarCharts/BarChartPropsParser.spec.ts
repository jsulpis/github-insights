import { ChartProps } from "../chart.models";
import BarChartPropsParser from "./BarChartPropsParser";

describe("BarChartPropsParser", () => {
  const props: ChartProps = {
    unit: "MB",
    xlabel: "Amount of code",
    data: [
      {
        value: 100,
        label: "java",
        color: "red"
      },
      {
        value: 200,
        label: "python",
        color: "blue"
      }
    ]
  };

  it("should make data from props", () => {
    expect(BarChartPropsParser.makeDataFromProps(props)).toEqual({
      labels: ["java", "python"],
      datasets: [
        {
          label: "MB",
          backgroundColor: ["red", "blue"],
          borderWidth: 1,
          data: [100, 200]
        }
      ]
    });
  });

  it("should make options from props", () => {
    expect(BarChartPropsParser.makeOptionsFromProps(props)).toEqual({
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: false,
              labelString: undefined
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: "Amount of code"
            }
          }
        ]
      }
    });
  });
});
