import { uploadStockData } from "./db";
import { getNasdaqPrices } from "./endpoints";
import * as fs from "fs";
import * as util from "util";
import pLimit from "p-limit";
const readFile = util.promisify(fs.readFile);

async function readAndProcessFile() {
  try {
    const data = await readFile("nasdaq_stocks.csv");
    const stocks = data.toString();
    const stocks_stream = stocks
      .split("\n")
      .map((x) => x.replace(/(\r\n|\n|\r)/gm, ""));
    return stocks_stream;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getHistoricalPrices(
  fromdate: string,
  todate: string,
  limit: string
) {
  var stocks_stream = await readAndProcessFile();
  console.log(stocks_stream);
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
