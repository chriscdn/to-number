/**
 * Enum representing the rounding mode for numeric conversions.
 *
 * @readonly
 * @enum {string}
 */
enum RoundingMode {
  NONE = "none",
  FLOOR = "floor",
  CEIL = "ceil",
  ROUND = "round",
}

/**
 * Options for numeric conversion functions.
 *
 * @typedef {Object} Options
 * @property {RoundingMode} [roundingMode=RoundingMode.NONE] - Rounding mode to apply
 * @property {number} [digits=0] - Number of decimal digits to round to
 */
type Options = {
  roundingMode?: RoundingMode;
  digits?: number;
};

function toNumber(input: number, options?: Options): number;
function toNumber(input: unknown, options?: Options): number | null;
function toNumber(input: unknown, options?: Options): number | null {
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
}

/**
 * Converts an unknown value to a numeric type and throws if conversion fails.
 *
 * @param {unknown} input - The value to convert
 * @param {Options} [options] - Conversion options
 * @returns {number} The numeric value
 * @throws {TypeError} If the value is NaN, Infinity, or cannot be parsed
 */
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

/**
 * Converts a value to an integer using floor rounding.
 *
 * @param {unknown} input - The value to convert
 * @returns {number | null} The integer value or null if conversion fails
 */
const toInteger = (input: unknown) =>
  toNumber(input, {
    roundingMode: RoundingMode.FLOOR,
  });

/**
 * Converts a value to an integer using floor rounding and throws if conversion fails.
 *
 * @param {unknown} input - The value to convert
 * @returns {number} The integer value
 * @throws {TypeError} If the value cannot be converted to a finite integer
 */
const toIntegerOrThrow = (input: unknown) =>
  toNumberOrThrow(input, {
    roundingMode: RoundingMode.FLOOR,
  });

const withDecimalPrecision = (
  num: number,
  options: { digits: number },
  func: (x: number) => number,
): number => {
  const { digits } = options;

  if (digits === 0) {
    return func(num);
  } else if (isPositiveInteger(digits)) {
    // A previous implementation would multiple by 10^digits, apply function
    // (floor, ceil, round), and divide. While mathematically correct, it could
    // introduce floating point errors. This approach gets around that.
    //
    // const factor = 10 ** options.digits; return Math.ceil(num * factor) /
    // factor;
    //

    // shift the decimal to the right (e.g., 1.005 -> 100.5)
    const shifted = toNumberOrThrow(`${num}e+${digits}`);

    // round the shifted number (100.5 -> 101)
    const rounded = func(shifted);

    // shift the decimal back to the left (101 -> 1.01)
    return toNumberOrThrow(`${rounded}e-${digits}`);
  } else {
    throw new Error("digits must be an integer greater than or equal to zero");
  }
};

/**
 * Rounds a floating-point number to the specified number of decimal digits.
 *
 * @param {number} num - The number to round
 * @param {Object} [options] - Options object specifying decimal digits
 * @param {number} [options.digits=0] - The number of decimal places
 * @returns {number} The rounded number
 */
const round = (
  num: number,
  options: { digits: number } = { digits: 0 },
) => withDecimalPrecision(num, options, Math.round);

/**
 * Floors a floating-point number to the specified number of decimal digits.
 *
 * @param {number} num - The number to floor
 * @param {Object} [options] - Options object specifying decimal digits
 * @param {number} [options.digits=0] - The number of decimal places
 * @returns {number} The floored number
 */
const floor = (
  num: number,
  options: { digits: number } = { digits: 0 },
) => withDecimalPrecision(num, options, Math.floor);

/**
 * Ceils a floating-point number to the specified number of decimal digits.
 *
 * @param {number} num - The number to ceil
 * @param {Object} [options] - Options object specifying decimal digits
 * @param {number} [options.digits=0] - The number of decimal places
 * @returns {number} The ceiled number
 */
const ceil = (
  num: number,
  options: { digits: number } = { digits: 0 },
) => withDecimalPrecision(num, options, Math.ceil);

/**
 * Checks if a value is a finite integer.
 *
 * @param {unknown} value - Value to check
 * @returns {value is number} True if value is a finite integer, false otherwise
 */
const isInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value);

/**
 * Checks if a value is a finite and positive (>0) integer.
 *
 * @param {unknown} value - Value to check
 * @returns {value is number} True if value is a positive and finite integer, false otherwise
 */
const isPositiveInteger = (value: unknown): value is number =>
  isInteger(value) && (value > 0);

/**
 * Checks if a value is a finite non-integer number.
 *
 * @param {unknown} value - Value to check
 * @returns {value is number} True if value is a finite float, false otherwise
 *
 * removed - Why do we need this if we have isNumber() and isInteger() ?
 */

//
// const isFloat = (value: unknown): value is number =>
//   typeof value === "number" && !Number.isInteger(value) &&
//   Number.isFinite(value);

/**
 * Checks if a value is a finite number (excludes NaN and Infinity).
 *
 * @param {unknown} value - Value to check
 * @returns {value is number} True if value is a finite number, false otherwise
 */
const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

export {
  ceil,
  floor,
  isInteger,
  isNumber,
  isPositiveInteger,
  round,
  RoundingMode,
  toInteger,
  toIntegerOrThrow,
  toNumber,
  toNumberOrThrow,
};
