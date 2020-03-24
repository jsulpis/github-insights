import { ChartProps } from "../chart.models";

export default class BarChartPropsParser {
  public static makeDataFromProps = (props: ChartProps) => {
    return {
      labels: props.data.map(data => data.label),
      datasets: [
        {
          label: props.unit,
          backgroundColor: props.data.map(data => data.color),
          borderWidth: 1,
          data: props.data.map(data => data.value)
        }
      ]
    };
  };

  public static makeOptionsFromProps = (props: ChartProps) => ({
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
            display: !!props.ylabel,
            labelString: props.ylabel
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
            display: !!props.xlabel,
            labelString: props.xlabel
          }
        }
      ]
    }
  });
}
