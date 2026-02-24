import { describe, expect, it } from "vitest";
import {
  ceil,
  floor,
  isInteger,
  isNumber,
  round,
  RoundingMode,
  toIntegerOrThrow,
  toNumber,
  toNumberOrThrow,
} from "../src/index";

describe("isNumber", () => {
  it("String(1234)", () => {
    expect(isNumber("1234")).toBe(false);
  });

  it("isInteger(5.0)", () => {
    expect(isInteger(5.0)).toBe(true);
  });

  // it("isFloat(5.0)", () => {
  //   expect(isFloat(5.0)).toBe(false);
  // });
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

  it("decimal digits", () => {
    expect(() => ceil(15.665, { digits: 2.2 })).toThrowError(
      "digits must be an integer greater than or equal to zero",
    );
  });

  it("negative digits", () => {
    expect(() => ceil(15.665, { digits: -2 })).toThrowError(
      "digits must be an integer greater than or equal to zero",
    );
  });
});

describe("toNumberOrThrow", () => {
  it("asdf fail", () => {
    expect(() => toNumberOrThrow("asdf")).toThrowError(
      "Cannot convert asdf to number.",
    );
  });

  it("asdf fail", () => {
    expect(() => toIntegerOrThrow("asdf")).toThrowError(
      "Cannot convert asdf to number.",
    );
  });
});

/**
 * The previous multiple by 10^digits and all that created floating point
 * errors, that would fail these edge cases.
 */
describe("Edge Cases", () => {
  it("round float", () => {
    expect(round(1.005, { digits: 2 })).toBe(1.01);
  });
  it("ceil float", () => {
    expect(ceil(1.1, { digits: 2 })).toBe(1.1);
  });
  it("floor float", () => {
    expect(floor(0.58, { digits: 2 })).toBe(0.58);
  });

  it("round 2 float", () => {
    expect(round(1.275, { digits: 2 })).toBe(1.28);
  });
});
