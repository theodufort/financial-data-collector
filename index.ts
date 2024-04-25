import { getStockData } from "./db";
import { model1 } from "./predict";
import { StocksHistoricalPricesDaily } from "./src/entity/StocksHistoricalPricesDaily";
import { getHistoricalPrices } from "./tasks";
import "reflect-metadata";

await getHistoricalPrices("2000-02-01", "2025-02-02", "100000000");
// const data1 = await getStockData(
//   StocksHistoricalPricesDaily,
//   "2000-02-01",
//   "2021-02-02",
//   "AAPL"
// );
// const data2 = await getStockData(
//   StocksHistoricalPricesDaily,
//   "2021-02-03",
//   "2026-06-06",
//   "AAPL"
// );
// const predictions = await model1(data1, data2);
// console.log(predictions);
