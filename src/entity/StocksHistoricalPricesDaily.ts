import { Column, Entity, Index } from "typeorm";

@Index("tbl_date_inverse_idx", ["date"], {})
@Index("unique_ticker_date_daily", ["date", "ticker"], { unique: true })
@Entity()
export class StocksHistoricalPricesDaily {
  @Column("character varying", { primary: true, name: "ticker", length: 10 })
  ticker: string;

  @Column("bigint", { primary: true, name: "date" })
  date: number;

  @Column("numeric", { name: "close", precision: 10, scale: 2 })
  close: number;

  @Column("numeric", { name: "volume" })
  volume: number;

  @Column("numeric", { name: "open", precision: 10, scale: 2 })
  open: number;

  @Column("numeric", { name: "high", precision: 10, scale: 2 })
  high: number;

  @Column("numeric", { name: "low", precision: 10, scale: 2 })
  low: number;
}
