import postgres from "postgres";
import { NasdaqApiResponse } from "./interfaces";
const sql = postgres({
  host: "192.168.0.71", // Postgres ip address[s] or domain name[s]
  port: 5432, // Postgres server port[s]
  database: "stock_data", // Name of database to connect to
  username: "theod", // Username of database user
  password: "ku23jr71", // Password of database user
});

export async function uploadStockData(data: NasdaqApiResponse) {
  try {
    for await (const row of data.data.tradesTable.rows) {
      await sql`
        INSERT INTO stocks_historical_prices (ticker, date, close, volume, open, high, low)
        VALUES (
          ${data.data.symbol},
          ${row.date},
          ${row.close.replace("$", "")},
          ${row.volume.replace("$", "").replaceAll(",", "")},
          ${row.open.replace("$", "")},
          ${row.high.replace("$", "")},
          ${row.low.replace("$", "")}
        )
        ON CONFLICT ON CONSTRAINT unique_ticker_date DO UPDATE
        SET
          close = EXCLUDED.close,
          volume = EXCLUDED.volume,
          open = EXCLUDED.open,
          high = EXCLUDED.high,
          low = EXCLUDED.low;
      `;
    }
    console.log("Stock data uploaded successfully.");
  } catch (error) {
    console.error("Error uploading stock data:", error);
  }
}
