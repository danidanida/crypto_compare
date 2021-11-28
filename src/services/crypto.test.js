import { transform, getFetchURL, getCoinsPrices } from "./crypto";

beforeEach(() => {
  fetch.resetMocks();
});

describe("getCoinsPrices", () => {
  it("should call api and provide it with currency", async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    try {
      await getCoinsPrices("USD");
    } catch {} // ignorring formatting related errors

    expect(fetch).toBeCalledWith(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,ADA,DOT,BCH,XLM,DOGE,BNB,USDT&tsyms=USD"
    );
  });
  it("should call correct path", async () => {
    const correctPath = "https://min-api.cryptocompare.com/data/pricemultifull";

    const result = getFetchURL("USD");

    let startsWithCorrectPath = result.startsWith(correctPath);

    expect(startsWithCorrectPath).toStrictEqual(true);
  });

  it("should put currency in url", () => {
    const result = getFetchURL("TEST");

    let containsCurrencyString = result.includes("tsyms=TEST");
    expect(containsCurrencyString).toStrictEqual(true);
  });
});

describe("transform", () => {
  it("should transform to array correctly", () => {
    const testResponse = {
      RAW: {
        BTC: {
          USD: {
            FROMSYMBOL: "BTC",
            PRICE: 120,

            OPENHOUR: 100,
          },
        },
        ETH: {
          USD: {
            FROMSYMBOL: "ETH",
            PRICE: 220,

            OPENHOUR: 200,
          },
        },
      },
    };

    const result = transform(testResponse);

    const expected = [
      {
        coinName: "BTC",
        price: 120,
        openPrice: 100,
        increasePercentage: 20,
        increaseRaw: 20,
      },
      {
        coinName: "ETH",
        price: 220,
        openPrice: 200,
        increasePercentage: 10,
        increaseRaw: 20,
      },
    ];
    expect(result).toStrictEqual(expected);
  });

  it("should sort desc based on increasePercentage", () => {
    const testResponse = {
      RAW: {
        BTC: {
          USD: {
            FROMSYMBOL: "BTC",
            PRICE: 90,

            OPENHOUR: 100,
          },
        },
        ETH: {
          USD: {
            FROMSYMBOL: "ETH",
            PRICE: 220,

            OPENHOUR: 200,
          },
        },
        DOGE: {
          USD: {
            FROMSYMBOL: "DOGE",
            PRICE: 110,

            OPENHOUR: 100,
          },
        },
      },
    };

    const result = transform(testResponse);

    const expected = ["ETH", "DOGE", "BTC"];
    expect(result.map((r) => r.coinName)).toStrictEqual(expected);
  });
});
