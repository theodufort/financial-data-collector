import { uploadStockData } from "./db";
import { getNasdaqPrices } from "./endpoints";
import pLimit from "p-limit";

export async function getHistoricalPrices(
  fromdate: string,
  todate: string,
  limit: string
) {
  const stocks = Bun.file("nasdaq_stocks.csv");
  const stocks_stream = (await stocks.text()).split("\n");

  const concurrencyLimit = 100; // Set your desired concurrency limit here
  const limitTasks = pLimit(concurrencyLimit);

  const tasks = stocks_stream.map(async (ticker) => {
    await limitTasks(async () => {
      const data = await getNasdaqPrices(ticker, fromdate, todate, limit);
      console.log(data?.status.rCode);
      if (data != null) {
        await uploadStockData(data);
      }
    });
  });

  await Promise.all(tasks);

  console.log("All tasks completed.");
}
