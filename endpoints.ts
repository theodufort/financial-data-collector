import { NasdaqApiResponse } from "./interfaces";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";
const agent = new HttpsProxyAgent(
  "http://brd-customer-hl_20908051-zone-data_center:l9e3hvk0822v@brd.superproxy.io"
);
export async function getNasdaqPrices(
  ticker: string,
  fromdate: string,
  todate: string,
  limit: string
) {
  const myHeaders = new Headers();
  myHeaders.append("authority", "api.nasdaq.com");
  myHeaders.append("accept", "application/json, text/plain, */*");
  myHeaders.append(
    "accept-language",
    "en-US,en-CA;q=0.9,en;q=0.8,fr-CA;q=0.7,fr;q=0.6"
  );
  myHeaders.append("origin", "https://www.nasdaq.com");
  myHeaders.append("referer", "https://www.nasdaq.com/");
  myHeaders.append(
    "sec-ch-ua",
    '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"Linux"');
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-site");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
  );
  myHeaders.append(
    "Cookie",
    "ak_bmsc=0FC0C46CE2AB321B8D039241D4BB2F3E~000000000000000000000000000000~YAAQl386F1zHpoyOAQAAsj4ntRcGzFw3r/tQYtEzvznckNIQkCKiEym9ZU7/k13aXIBNBDyX0rgciiK2UPVd3Ntbql4eyr09iolaBPqV43Myf7MX5SXv89xGQLP68F6GaYEroW73QjdqLg7l5y3KLKle7wZ2uwCeW94ajKgKO0EP445T0InAPmnUYCHb4/wdGKwFcQDAOc8a8tQ5uQPaZrfUcWcSzlUEGv77cA3LnUZ1k6nynOeTUGvou9MqcpujzZQ0x3Ef6qlVqtnz6HtRNo1uNR5aft+HquWtovjO/JxPqQ+T5AtfyhBimxeZ4jwuCDtClzUlJcwmCppZBt/gOGpzk7ewVBbh23NRFdQG9HjVFhyqvY5bIwWNb4VLI/PjRoZcPCD9t/M="
  );

  try {
    console.log(ticker);
    const response = await fetch(
      `https://api.nasdaq.com/api/quote/${ticker}/historical?assetclass=stocks&fromdate=${fromdate}&limit=${limit}&todate=${todate}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        agent: agent,
      }
    );
    if (!response.ok) {
      return null;
    }
    console.log(response.status);
    const responseBody: NasdaqApiResponse =
      (await response.json()) as NasdaqApiResponse;
    return responseBody;
  } catch (error) {
    return null;
  }
}
