import { NumericDataType } from "@tensorflow/tfjs-node";

interface TradeRow {
  date: string;
  close: string;
  volume: string;
  open: string;
  high: string;
  low: string;
}
export interface DbRow {
  ticker: string;
  date: Date; // Assuming the use of JavaScript's Date object for date handling
  close: number;
  volume: number; // BigInt in SQL is typically handled as number in TypeScript, but could also be string or BigInt if precision is necessary
  open: number;
  high: number;
  low: number;
}

interface Headers {
  date: string;
  close: string;
  volume: string;
  open: string;
  high: string;
  low: string;
}

interface TradesTable {
  asOf: null | string;
  headers: Headers;
  rows: TradeRow[];
}

interface Data {
  symbol: string;
  totalRecords: number;
  tradesTable: TradesTable;
}

interface Status {
  rCode: number;
  bCodeMessage: null | string;
  developerMessage: null | string;
}

export interface NasdaqApiResponse {
  data: Data;
  message: null | string;
  status: Status;
}
export interface TFDataInput {
  x: string;
  y: string;
}
