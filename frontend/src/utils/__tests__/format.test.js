import { camelCaseToWords, capitalized, formatPhoneNumber } from "../format";

describe("Phone number", () => {
  let phoneNumber = "4789078746";
  test("Formats the phone number with dashes", () => {
    expect(formatPhoneNumber(phoneNumber)).toEqual("(478) 907-8746");
  });
});

describe("Camel Casing formatter", () => {
  let phrase = "hereWeGo";
  test("Formats the camel case string to readable phrase", () => {
    expect(camelCaseToWords(phrase)).toEqual("Here We Go");
  });
});

describe("Capitalize function", () => {
  let word = "hello";
  test("Formats the word to have a capital first letter", () => {
    expect(capitalized(word)).toEqual("Hello");
  });
});
