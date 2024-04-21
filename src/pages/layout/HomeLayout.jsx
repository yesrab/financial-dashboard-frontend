import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import Clock from "../../components/clock/Clock";
const HomeLayout = () => {
  return (
    <div className={styles.pageLayout}>
      <header className={styles.header}>
        <h4>Transaction DashBoard</h4>
      </header>
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.creater}>Made by Yesrab</p>
        <Clock />
      </footer>
    </div>
  );
};

export default HomeLayout;
