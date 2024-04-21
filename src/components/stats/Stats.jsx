import React from "react";
import styles from "./styles.module.css";
const Stats = ({ top, bottem }) => {
  return (
    <div className={styles.statsContainer}>
      <h1>{top}</h1>
      <p>{bottem}</p>
    </div>
  );
};

export default Stats;
