import React from "react";
import styles from "./styles.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { color } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = ({ month, statsData }) => {
  const options = {
    color: "white",
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "white",
        },
        grid: {
          color: "white",
        },
      },
      x: {
        ticks: {
          stepSize: 1,
          color: "white",
        },
        grid: {
          color: "white",
        },
      },
    },

    plugins: {
      title: {
        color: "white",
        display: true,
        text: "Number of items per price range",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
  };
  const labels = statsData.itemsPerPriceRange.map((data) => data.priceRange);
  const data = {
    labels,
    datasets: [
      {
        label: "Items",
        data: statsData.itemsPerPriceRange.map((data) => data.items),

        borderWidth: 1,
        backgroundColor: [
          "#FFFF00",
          "#00FFFF",
          "#ffecd1",
          "#207fd0",
          "#fe777b",
          "#bb9457",
          "#0000FF",
        ],
      },
    ],
  };

  return (
    <div className={styles.barGraphComponet}>
      <h2>Bar chart stats : {month}</h2>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarGraph;
