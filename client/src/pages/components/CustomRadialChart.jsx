import React from "react";
import Chart from "react-apexcharts"; // Direct import for Vite

const CustomRadialChart = () => {
  const options = {
    series: [50, 50],
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 360, // Customize the angle range
        hollow: {
        //   margin: 5,
          size: "20%",
          background: "transparent",
        },
        track: {
          show: true,
          strokeWidth: "100%", // Track thickness
          background: "transparent", // Change track color
          opacity: 1,
          margin: 5, // Space between track and bar
        },
        dataLabels: {
          name: { show: false },
          value: { show: false },
        },
        barLabels: {
          enabled: false,
          useSeriesColors: true,
          offsetX: 0,
          fontSize: "12px",
          formatter: (seriesName, opts) =>
            seriesName + ": " + opts.w.globals.series[opts.seriesIndex],
        },
      },
    },fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: [
            ["#25F7C1"], // Gradient for the first radial bar
            ["#25F7C1",], // Gradient for the second radial bar
          ],
          stops: [0, 100],
        },
      },
      colors: ["#EA5F57", "#EA5F57"],
    // colors: ["#1ab7ea", "#0084ff"],
    labels: ["Facebook", "LinkedIn"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: { show: false },
        },
      },
    ],
  };

  return (
    <div className="w-full flex justify-center">
      <Chart options={options} series={options.series} type="radialBar" height={300} />
    </div>
  );
};

export default CustomRadialChart;
