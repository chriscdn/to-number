import { describe, expect, it } from "vitest";
import {
  ceil,
  isFloat,
  isInteger,
  isNumber,
  RoundingMode,
  toNumber,
} from "../src/index";

describe("isNumber", () => {
  it("String(1234)", () => {
    expect(isNumber("1234")).toBe(false);
  });

  it("isInteger(5.0)", () => {
    expect(isInteger(5.0)).toBe(true);
  });

  it("isFloat(5.0)", () => {
    expect(isFloat(5.0)).toBe(false);
  });
});

describe("toNumber", () => {
  it("String(123)", () => {
    const value = toNumber("123");
    expect(value).toBe(123);
  });

  it("123", () => {
    const value = toNumber(123);
    expect(value).toBe(123);
  });

  it("123.33", () => {
    const value = toNumber(123.33);
    expect(value).toBe(123.33);
  });

  it("hello123", () => {
    const value = toNumber("hello123");
    expect(value).toBeNull();
  });

  it("1234hello", () => {
    const value = toNumber("1234hello");
    expect(value).toBe(1234);
  });
});

describe("toNumber", () => {
  it("String(123.5)", () => {
    const value = toNumber("123.9");
    expect(value).toBe(123.9);
  });

  it("String(123.5)", () => {
    const value = toNumber("123.99999", {
      roundingMode: RoundingMode.FLOOR,
      digits: 2,
    });
    expect(value).toBe(123.99);
  });
});

describe("ceil", () => {
  it("15.665", () => {
    expect(ceil(15.665, { digits: 2 })).toBe(15.67);
  });
});
