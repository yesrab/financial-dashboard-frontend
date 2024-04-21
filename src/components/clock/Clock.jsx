import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
const Clock = () => {
  const [time, setTime] = useState(getFormattedTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  function getFormattedTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return <h4 className={styles.clock}>{time}</h4>;
};

export default Clock;
