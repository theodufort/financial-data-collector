import { EntityTarget, ObjectLiteral } from "typeorm";
import { DbRow, NasdaqApiResponse } from "./interfaces";
import { getDataSource } from "./src/index";
import { StocksHistoricalPricesDaily } from "./src/entity/StocksHistoricalPricesDaily";

const AppDataSource = await getDataSource();
export async function uploadStockData(data: NasdaqApiResponse) {
  if (AppDataSource) {
    try {
      for await (const row of data.data.tradesTable.rows) {
        await AppDataSource.createQueryBuilder()
          .insert()
          .into(StocksHistoricalPricesDaily)
          .values({
            ticker: data.data.symbol,
            date: row.date,
            close: parseFloat(row.close.replace("$", "")),
            volume: parseInt(row.volume.replace(/,/g, "")),
            open: parseFloat(row.open.replace("$", "")),
            high: parseFloat(row.high.replace("$", "")),
            low: parseFloat(row.low.replace("$", "")),
          })
          .orUpdate(["close", "volume", "open", "high", "low"])
          .execute();
        console.log("Stock data uploaded successfully.");
      }
    } catch (error) {
      console.error("Error uploading stock data:", error);
    }
  } else {
    console.log("Not connected!");
  }
}
export async function getStockData(
  table: any,
  date1: string,
  date2: string,
  ticker?: string
): Promise<DbRow[]> {
  if (!AppDataSource) {
    console.log("Database not connected!");
    return [];
  }
  try {
    const result = await AppDataSource.getRepository(
      StocksHistoricalPricesDaily
    )
      .createQueryBuilder("table")
      .where("table.date >= :date", { date: date1 })
      .andWhere("table.date <= :date", { date: date2 })
      .execute();
    return result;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return [];
  }
}
