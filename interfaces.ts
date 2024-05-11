import { NumericDataType } from "@tensorflow/tfjs-node";

export interface DbRow {
  ticker: string;
  date: number; // Assuming the use of JavaScript's Date object for date handling
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

export interface TFDataInput {
  x: string;
  y: string;
}
export interface PolygonResponse {
  adjusted: boolean;
  next_url: string;
  queryCount: number;
  request_id: string;
  results: Result[];
  resultsCount: number;
  status: string;
  ticker: string;
}

export interface Result {
  c: number; // Close price
  h: number; // High price
  l: number; // Low price
  n: number; // Number of transactions (assuming here)
  o: number; // Open price
  t: number; // Unix timestamp in milliseconds
  v: number; // Volume
  vw: number; // Volume weighted average price
}
