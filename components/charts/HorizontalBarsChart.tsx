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

/**
 * Transform a color in hexa format
 * @param color
 * @param lightening between 0 and 100
 * @param desaturation between 0 and 1
 */
function shadeColor(color, lightening, desaturation) {
  let colorRgb = hexaToRgb(color);
  colorRgb = desaturateRgb(colorRgb, desaturation);
  colorRgb = lightenRgb(colorRgb, lightening);

  const [RR, GG, BB] = colorRgb.map(col => col.toString(16).padStart(2, "0"));
  return "#" + RR + GG + BB;
}

function hexaToRgb(colorHexa: string): number[] {
  const R = parseInt(colorHexa.substring(1, 3), 16);
  const G = parseInt(colorHexa.substring(3, 5), 16);
  const B = parseInt(colorHexa.substring(5, 7), 16);
  return [R, G, B];
}

function desaturateRgb(colorRgb: number[], percent: number): number[] {
  const [R, G, B] = colorRgb;
  const med = 0.3 * R + 0.6 * G + 0.1 * B;
  const Rdesat = Math.floor(R + percent * (med - R));
  const Gdesat = Math.floor(G + percent * (med - G));
  const Bdesat = Math.floor(B + percent * (med - B));
  return [Rdesat, Gdesat, Bdesat];
}

function lightenRgb(colorRgb: number[], percent: number): number[] {
  const [R, G, B] = colorRgb;
  let Rlight = Math.floor((R * (100 + percent)) / 100);
  let Glight = Math.floor((G * (100 + percent)) / 100);
  let Blight = Math.floor((B * (100 + percent)) / 100);

  Rlight = Rlight < 255 ? Rlight : 255;
  Glight = Glight < 255 ? Glight : 255;
  Blight = Blight < 255 ? Blight : 255;
  return [Rlight, Glight, Blight];
}

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
