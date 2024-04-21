import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import TrasnsactionTable from "../../components/table/TrasnsactionTable";
import useDebounce from "../../hooks/useDebounce";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Stats from "../../components/stats/Stats";
import fetchUtils from "../../libs/fetchUtils";
import BarGraph from "../../components/graphs/BarGraph";
import PiChart from "../../components/graphs/PiChart";
export const loader = async ({ request, params }) => {
  const clientURL = new URL(request.url);
  const serverTableURL = "/api/v1/transactions/allTransaction";
  const serverStatsURL = "/api/v1/transactions/allStatistics";
  const tableURL = new URL(serverTableURL, window.location.origin);
  const statsURL = new URL(serverStatsURL, window.location.origin);
  const month = clientURL.searchParams.get("month") || "March";
  const search = clientURL.searchParams.get("search");
  const page = clientURL.searchParams.get("page");
  const limit = clientURL.searchParams.get("limit") || 5;

  if (month) {
    statsURL.searchParams.set("month", month);
    tableURL.searchParams.set("month", month);
  } else {
    statsURL.searchParams.delete("month");
    tableURL.searchParams.delete("month");
  }

  if (search) {
    statsURL.searchParams.set("search", search);
    tableURL.searchParams.set("search", search);
  } else {
    statsURL.searchParams.delete("search");
    tableURL.searchParams.delete("search");
  }
  if (page) {
    statsURL.searchParams.set("page", page);
    tableURL.searchParams.set("page", page);
  } else {
    statsURL.searchParams.delete("page");
    tableURL.searchParams.delete("page");
  }

  if (limit) {
    statsURL.searchParams.set("limit", limit);
    tableURL.searchParams.set("limit", limit);
  } else {
    statsURL.searchParams.delete("limit");
    tableURL.searchParams.delete("limit");
  }
  const tableData = await fetchUtils(tableURL.toString());
  const statsData = await fetchUtils(statsURL.toString());
  // console.log(statsData);
  return { tableData, statsData };
};

const Home = () => {
  const data = useLoaderData();
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [month, setMonth] = useState(searchParams.get("month") || "March");
  const debouncedInputSearch = useDebounce(search, 300);
  const searchObj = {};
  useEffect(() => {
    // console.log(data);
    searchParams.forEach((value, key) => {
      searchObj[key] = value;
    });
    if (debouncedInputSearch.trim()) {
      searchObj.search = debouncedInputSearch;
      searchObj.page = 1;
    } else {
      delete searchObj.search;
    }

    setSearchParams(searchObj);
  }, [debouncedInputSearch]);

  return (
    <main className={styles.mainContent}>
      <div className={styles.tableNstatisticsContainer}>
        <div className={styles.statisticsContainer}>
          <Stats
            top={` ${data.statsData.transactionStatistics.totalSalesAmmount.toFixed(
              2
            )}$ `}
            bottem={"Total sale amount"}
          />
          <Stats
            top={data.statsData.transactionStatistics.TotalNumberOfSold}
            bottem={"Total number of sold items"}
          />
          <Stats
            top={data.statsData.transactionStatistics.TotalNumber0fNotSold}
            bottem={"Total number of not sold items"}
          />
        </div>
        <TrasnsactionTable
          search={search}
          setSearch={setSearch}
          month={month}
          setMonth={setMonth}
          tableData={data.tableData}
        />
      </div>
      <div className={styles.graphNchart}>
        <BarGraph statsData={data.statsData} month={month} />
        <PiChart statsData={data.statsData} />
      </div>
    </main>
  );
};

export default Home;
