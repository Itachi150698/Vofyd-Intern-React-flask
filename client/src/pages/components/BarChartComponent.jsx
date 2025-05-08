import React from "react";
import Chart from "react-apexcharts"; // Direct import for Vite

const BarChartComponent = () => {
  const options = {
    chart: {
      type: "bar",
      height: 20,
      width:100,
      toolbar: {
        show: false, // Hide toolbar
      },
    },
    plotOptions: {
      bar: {
        borderRadius:0,
        // borderRadiusApplication: "end", // Rounded corners at the end
        horizontal: true, // Horizontal bar chart
      },
    },
    grid: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light", // Can be "light" or "dark"
        type: "horizontal", // Options: "horizontal", "vertical", "diagonal1", "diagonal2"
        gradientToColors: ["#25F7C1", "#EA5F57"], // Colors transitioning to
        stops: [0, 50, 70], // Defines transition points
      },
    },
    colors: ["#F1D069"],
    stroke: {
      show: true,  
      width: 1,  
      colors: ["#EA5F57"], 
    },
    dataLabels: {
      enabled: false, 
    },
    xaxis: {
      categories: [
        "",
      ],
      labels: {
        show: false, // Hide X-axis labels
      },
      axisBorder: {
        show: false, // Hide the bottom border of the X-axis
      },
      axisTicks: {
        show: false, // Hide the ticks on the X-axis
      },
    },
  };

  const series = [
    {
      name: "",
      data: [400],
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <Chart options={options} series={series} type="bar" height={61} width={193} />
    </div>
  );
};

export default BarChartComponent;
