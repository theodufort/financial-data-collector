import { Column, Entity, Index } from "typeorm";

@Index("unique_ticker_date_5minute", ["date", "ticker"], { unique: true })
@Entity()
export class StocksHistoricalPrices_5minute {
  @Column("character varying", { primary: true, name: "ticker", length: 10 })
  ticker: string;

  @Column("date", { primary: true, name: "date" })
  date: string;

  @Column("numeric", { name: "close", precision: 10, scale: 2 })
  close: string;

  @Column("bigint", { name: "volume" })
  volume: string;

  @Column("numeric", { name: "open", precision: 10, scale: 2 })
  open: string;

  @Column("numeric", { name: "high", precision: 10, scale: 2 })
  high: string;

  @Column("numeric", { name: "low", precision: 10, scale: 2 })
  low: string;
}
