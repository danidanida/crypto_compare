import {
  calculatePercentageChange,
  extractPropertiesAsArray,
} from "./helperFunctions";

describe("CalculatePercentageChange", () => {
  it("should calculate percentage change", () => {
    const currPrice = 12;
    const openPrice = 10;
    const expectedPercentage = 20;

    const result = calculatePercentageChange(currPrice, openPrice);

    expect(result).toStrictEqual(expectedPercentage);
  });

  it("should handle devision on zero properly", () => {
    const currPrice = 10;
    const openPrice = 0;

    expect(() =>
      calculatePercentageChange(currPrice, openPrice)
    ).toThrowError();
  });
});

describe("extractPropertiesAsArray", () => {
  it("should extract properties from object and return array", () => {
    const obj = { name: "test", property: "value", number: 7 };

    const result = extractPropertiesAsArray(obj);
    const expectedResult = ["test", "value", 7];

    expect(result).toEqual(expectedResult);
  });
});
