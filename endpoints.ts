import { NasdaqApiResponse } from "./interfaces";
import fetch from "node-fetch-retry";
import { HttpsProxyAgent } from "https-proxy-agent";

export async function getNasdaqPrices(
  ticker: string,
  fromdate: string,
  todate: string,
  limit: string
) {
  const myHeaders = new Headers();
  myHeaders.append(
    "accept",
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
  );
  myHeaders.append(
    "accept-language",
    "en-US,en-CA;q=0.9,en;q=0.8,fr-CA;q=0.7,fr;q=0.6"
  );
  myHeaders.append("cache-control", "max-age=0");
  myHeaders.append(
    "cookie",
    "visid_incap_2170999=s0x+bzkIQ6aiNhKWQnt+AG0gIWYAAAAAQUIPAAAAAABfoFUsTNUuj+IJetCLlXC8; ajs_anonymous_id=c332976d-0f3f-4c90-a8b5-849e9fb41dce; _gcl_au=1.1.1980817379.1713447024; ajs_user_id=953008; _ga=GA1.2.869461959.1713447024; _ga_90THYCET25=GS1.1.1713447023.1.1.1713448216.60.0.0; ak_bmsc=F2019543B047E52B8A973C72EC3D23BB~000000000000000000000000000000~YAAQVGvcF8+m7gePAQAAPxbaFRdZcXReNSxW8kyUKDCpC3h5RCR1tv70FDw40x8m6+RdCN8Z0ZqaeTEhsTs+NkJ6BCZKbfP+ACCSPbout2yvD2iysUAlXPJckTxwp3pX7KZxjmRJwy+r4T5QsKCaWTOf+o+IM+uHHbGGIZB7mPEtz/c2eI3VcHXxphFyYFubyAOADi2C0mSEhzJPrlhN5gJ0pmfy/s3IQAEdEhMyoDmEIqHj8S7lHKmRD+dz3sbBhOxhyFu0r76McaxsRi5jgxc7UoO+uX5mbcqEXxRCfQUmBvgOxeiwIpVVQvnfUpZzpRYGLp4DuTJlPhCbLqvHZzryBE2EjCPc5jOJq/gylxnqkx8a5q+wxjrW0P7MB03PXSuGOI8YiiR4937G; bm_sv=455868066BF9C56EF0888E5435CD5209~YAAQjGvcF3cipxWPAQAANTXcFRedIKU2M+tGS83jFNUYUxDLvEQ2mIq2/IhXb616O2qdwodk/hM67G2liOK59tJJrj84ueiPP7AwpF5CjQeVHjnkiq67zjyJ1MST26BmxgYP3y+o71gt9q6KlwvOPvuFUuTe8Hpyj4xOHbTqWXVpBPuVcgxWyXtMbUhawNfVXvodQuma51rmZa2ew5mpYvd170BL3wCp/bhqMECMGOXykah20UhGzpzznT/UAyHJ~1"
  );
  myHeaders.append("priority", "u=0, i");
  myHeaders.append(
    "sec-ch-ua",
    '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"Windows"');
  myHeaders.append("sec-fetch-dest", "document");
  myHeaders.append("sec-fetch-mode", "navigate");
  myHeaders.append("sec-fetch-site", "none");
  myHeaders.append("sec-fetch-user", "?1");
  myHeaders.append("upgrade-insecure-requests", "1");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  );

  try {
    console.log(ticker);
    const response = await fetch(
      `https://api.nasdaq.com/api/quote/${ticker}/historical?assetclass=stocks&fromdate=${fromdate}&limit=${limit}&todate=${todate}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        agent: new HttpsProxyAgent(
          "http://brd-customer-hl_20908051-zone-data_center:l9e3hvk0822v@brd.superproxy.io:22225"
        ),
        retry: 10,
      }
    );
    if (!response.ok) {
      return null;
    }
    console.log(await response.status);
    console.log(await response.headers);
    const responseBody: NasdaqApiResponse =
      (await response.json()) as NasdaqApiResponse;
    return responseBody;
  } catch (error) {
    return null;
  }
}
