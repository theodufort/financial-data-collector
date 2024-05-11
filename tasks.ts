import { uploadStockData } from "./db";
import { restClient } from "@polygon.io/client-js";

import pLimit from "p-limit";
const globalFetchOptions = {
  pagination: true,
};
const rest = restClient(
  "v8Nwv2ofUDmb3vjsFWorHx3Q8heLNMp6",
  "https://api.polygon.io",
  globalFetchOptions
);

export async function getHistoricalPrices(
  fromdate: string,
  todate: string,
  limit: number
) {
  const concurrencyLimit = 150; // Adjust this number based on your system capability
  const limitPromise = pLimit(concurrencyLimit);

  try {
    const { results } = await rest.reference.tickers({
      market: "stocks",
      limit: 1000,
    });
    const stockPromises = results.map((stock) =>
      limitPromise(() =>
        fetchAndUploadStockData(stock.ticker, fromdate, todate, limit)
      )
    );

    await Promise.all(stockPromises);
  } catch (error) {
    console.error("An error happened:", error);
  }
}

async function fetchAndUploadStockData(ticker, fromdate, todate, limit) {
  try {
    var response = await rest.stocks.aggregates(
      ticker,
      1,
      "minute",
      fromdate,
      todate,
      { limit }
    );
    const start = Date.now();

    await uploadStockData(response);
    const end = Date.now();
    const executionTime = end - start;
    console.log(executionTime);
    response = null;
  } catch (error) {
    console.error(`An error occurred fetching data for ${ticker}:`, error);
  }
}
