import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = () => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradientFill = ctx.createLinearGradient(0, 0, 150, 0); // Horizontal gradient
      gradientFill.addColorStop(0, "#25F7C1"); 
      gradientFill.addColorStop(0.7, "#F4D95E");
      gradientFill.addColorStop(1, "#EA5F57"); 
      setGradient(gradientFill);
    }
  }, []);

  const data = {
    labels: [""], // Empty label for a single value
    datasets: [
      {
        label: "Progress",
        data: [100], // Single value (e.g., 75%)
        backgroundColor: gradient || "rgba(182, 75, 192, 0.6)", // Use gradient if available
        borderColor: "#EA5F57",
        borderWidth: 1,
        barThickness: 15, // Adjust bar height
      },
    ],
  };

  const options = {
    indexAxis: "y", 
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend for a single value
      },
      title: {
        display: false,
        text: "",
      },
    },
    scales: {
        yAxes: [{
            display: false,
        }],
      x: {
        min: 0,
        max: 100, // Adjust max value as needed
      },
    },
  };

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default HorizontalBarChart;
