/**
 * Converts an unknown value to a numeric type (integer or float).
 * `NaN`, `Infinity`, and `-Infinity` are considered non-numeric and return `null`.
 *
 * @param {unknown} input - The value to convert.
 * @returns {number | null} The numeric value, or `null` if conversion fails.
 */

enum RoundingMode {
  NONE = "none",
  FLOOR = "floor",
  CEIL = "ceil",
  ROUND = "round",
}

type Options = {
  roundingMode?: RoundingMode;
  digits?: number;
};

const toNumber = (
  input: unknown,
  options?: Options,
) => {
  const roundingMode = options?.roundingMode ?? RoundingMode.NONE;
  const digits = options?.digits ?? 0;

  const cast = isNumber(input) ? input : parseFloat(String(input));

  if (isNumber(cast)) {
    switch (roundingMode) {
      case RoundingMode.FLOOR:
        return floor(cast, { digits });
      case RoundingMode.CEIL:
        return ceil(cast, { digits });
      case RoundingMode.ROUND:
        return round(cast, { digits });
      default:
        return cast;
    }
  } else {
    return null;
  }
};

const toNumberOrThrow = (
  input: unknown,
  options?: Options,
) => {
  const result = toNumber(input, options);

  if (isNumber(result)) {
    return result;
  } else {
    throw new TypeError(`Cannot convert ${input} to number.`);
  }
};

const toInteger = (input: unknown) =>
  toNumber(input, {
    roundingMode: RoundingMode.FLOOR,
  });

const toIntegerOrThrow = (input: unknown) =>
  toNumberOrThrow(input, {
    roundingMode: RoundingMode.FLOOR,
  });

/**
 * Rounds a floating-point number to the specified number of decimal digits.
 *
 * @param {number} num - The number to round.
 * @param {{ digits: number }} [options={ digits: 0 }] - An options object specifying the number of decimal digits to keep.
 * @returns {number} The rounded number.
 */
const round = (
  num: number,
  options: { digits: number } = { digits: 0 },
) => {
  const factor = 10 ** options.digits;
  return Math.round(num * factor) / factor;
};

const floor = (
  num: number,
  options: { digits: number } = { digits: 0 },
) => {
  const factor = 10 ** options.digits;
  return Math.floor(num * factor) / factor;
};

const ceil = (
  num: number,
  options: { digits: number } = { digits: 0 },
) => {
  const factor = 10 ** options.digits;
  return Math.ceil(num * factor) / factor;
};

/**
 * Checks if the given value is an integer.
 *
 * Note: `NaN`, `Infinity`, and `-Infinity` are considered invalid.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is number} True if the value is a finite integer, otherwise false.
 */
const isInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value);

/**
 * Checks if the given value is a floating-point number (non-integer).
 *
 * Note: `NaN`, `Infinity`, and `-Infinity` are considered invalid.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is number} True if the value is a finite float, otherwise false.
 */
const isFloat = (value: unknown): value is number =>
  typeof value === "number" && !Number.isInteger(value);

/**
 * Checks if the given value is a finite number (integer or float).
 *
 * Note: `NaN`, `Infinity`, and `-Infinity` are considered invalid.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is number} True if the value is a finite number, otherwise false.
 */
const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

export {
  ceil,
  floor,
  isFloat,
  isInteger,
  isNumber,
  round,
  RoundingMode,
  toInteger,
  toIntegerOrThrow,
  toNumber,
  toNumberOrThrow,
};
