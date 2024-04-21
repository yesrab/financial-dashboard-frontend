import React, { Suspense, useEffect } from "react";
import styles from "./styles.module.css";
import { Await, useSearchParams } from "react-router-dom";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const TrasnsactionTable = ({
  search,
  setSearch,
  month,
  setMonth,
  tableData,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchObj = {};

  useEffect(() => {
    searchParams.forEach((value, key) => {
      searchObj[key] = value;
    });
    if (month.trim()) {
      searchObj.month = month;
    } else {
      delete searchObj.month;
    }
    setSearchParams(searchObj);
  }, [month]);

  function generateTable(products) {
    return (
      <table className={styles.tableBlockContainer}>
        <thead>
          <tr>
            <th className={styles.tabeHeadRow}>ID</th>
            <th className={styles.tabeHeadRow}>TITLE</th>
            <th className={styles.tabeHeadRow}>DESCRIPTION</th>
            <th className={styles.tabeHeadRow}>PRICE</th>
            <th className={styles.tabeHeadRow}>CATEGORY</th>
            <th className={styles.tabeHeadRow}>SOLD</th>
            <th className={styles.tabeHeadRow}>IMAGE</th>
          </tr>
        </thead>
        <tbody className={styles.tableRows}>
          {products.map((product) => (
            <tr key={product._id}>
              <td className={styles.rowData}>{product.productSKU}</td>
              <td className={styles.rowData}>{product.title}</td>
              <td className={styles.rowData}>{product.description}</td>
              <td className={styles.rowData}>{`${product.price.toFixed(
                2
              )}$`}</td>
              <td className={styles.rowData}>{product.category}</td>
              <td className={styles.rowData}>{product.sold ? "Yes" : "No"}</td>
              <td className={styles.rowData}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxWidth: "100px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  const setPage = (page) => {
    searchParams.forEach((value, key) => {
      searchObj[key] = value;
    });
    if (page) {
      searchObj.page = page;
    }
    setSearchParams(searchObj);
  };

  const lodingMarkup = () => {
    return (
      <div className={styles.loading}>
        <h2 className={styles.loadingText}>Loading...</h2>
      </div>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.quearyContainer}>
        <input
          className={styles.searchBox}
          placeholder='Search...'
          type='text'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <select
          className={styles.monthSelector}
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
          name='Month'
          id='month'>
          {monthNames?.map((month, key) => {
            return (
              <option key={key} value={month}>
                {month}
              </option>
            );
          })}
        </select>
      </div>
      <Suspense fallback={lodingMarkup()}>
        <Await
          errorElement={<h1>Loading data error please check backend</h1>}
          resolve={tableData}>
          {(tableData) => {
            return (
              <>
                <div className={styles.tableWrapper}>
                  {generateTable(tableData?.transactions)}
                </div>
                <div className={styles.paginatorTool}>
                  page:{tableData.page}
                  <span className={styles.paginatorButtons}>
                    <button
                      className={styles.paginatorBtns}
                      disabled={!tableData?.previous}
                      onClick={() => {
                        setPage(tableData.previous.page);
                      }}>
                      {"<<Previous"}
                    </button>

                    <button
                      className={styles.paginatorBtns}
                      disabled={!tableData?.next}
                      onClick={() => {
                        setPage(tableData.next.page);
                      }}>
                      {"Next>>"}
                    </button>
                  </span>
                  count:{tableData.limit}
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default TrasnsactionTable;
