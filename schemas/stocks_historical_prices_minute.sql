CREATE TABLE stocks_historical_prices_minute (
    ticker VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    close NUMERIC(10, 2) NOT NULL,
    volume BIGINT NOT NULL,
    open NUMERIC(10, 2) NOT NULL,
    high NUMERIC(10, 2) NOT NULL,
    low NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (ticker, date),
    CONSTRAINT unique_ticker_date_minute UNIQUE (ticker, date)
);

ALTER TABLE stocks_historical_prices_minute
ADD CONSTRAINT unique_ticker_date_minute
UNIQUE (ticker, date);