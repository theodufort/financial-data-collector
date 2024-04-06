interface TradeRow {
  date: string;
  close: string;
  volume: string;
  open: string;
  high: string;
  low: string;
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
