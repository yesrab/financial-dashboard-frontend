import React from "react";
import styles from "./styles.module.css";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(Tooltip, Legend, ArcElement);
const PiChart = ({ statsData }) => {
  const lable = generateLables(statsData?.itemsPerCatagory.catagroryCount);
  const data = generateCounts(statsData?.itemsPerCatagory.catagroryCount);
  const option = {
    color: "white",
  };

  const chartData = {
    labels: lable,
    datasets: [
      {
        label: "Category Wise Item Count",
        data: data,
        backgroundColor: ["#ff0000", "#75a99c", "#ffecd1", "#19f451"],
        borderWidth: 1,
      },
    ],
  };

  function generateLables(obj) {
    const labelsArr = [];
    for (let key in obj) {
      labelsArr.push(key);
    }
    return labelsArr;
  }
  function generateCounts(obj) {
    const counts = [];
    for (let key in obj) {
      counts.push(obj[key]);
    }
    return counts;
  }
  return (
    <div className={styles.pichartComponent}>
      <Pie options={option} data={chartData} />
    </div>
  );
};

export default PiChart;
