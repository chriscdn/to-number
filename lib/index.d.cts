/**
 * Enum representing the rounding mode for numeric conversions.
 *
 * @readonly
 * @enum {string}
 */
declare enum RoundingMode {
    NONE = "none",
    FLOOR = "floor",
    CEIL = "ceil",
    ROUND = "round"
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
/**
 * Converts an unknown value to a numeric type (integer or float).
 *
 * Non-numeric strings, `NaN`, `Infinity`, and `-Infinity` are considered
 * non-numeric and return `null`.
 *
 * @param {unknown} input - The value to convert
 * @param {Options} [options] - Conversion options
 * @returns {number | null} The numeric value or null if conversion fails
 */
declare const toNumber: (input: unknown, options?: Options) => number | null;
/**
 * Converts an unknown value to a numeric type and throws if conversion fails.
 *
 * @param {unknown} input - The value to convert
 * @param {Options} [options] - Conversion options
 * @returns {number} The numeric value
 * @throws {TypeError} If the value is NaN, Infinity, or cannot be parsed
 */
declare const toNumberOrThrow: (input: unknown, options?: Options) => number;
/**
 * Converts a value to an integer using floor rounding.
 *
 * @param {unknown} input - The value to convert
 * @returns {number | null} The integer value or null if conversion fails
 */
declare const toInteger: (input: unknown) => number | null;
/**
 * Converts a value to an integer using floor rounding and throws if conversion fails.
 *
 * @param {unknown} input - The value to convert
 * @returns {number} The integer value
 * @throws {TypeError} If the value cannot be converted to a finite integer
 */
declare const toIntegerOrThrow: (input: unknown) => number;
/**
 * Rounds a floating-point number to the specified number of decimal digits.
 *
 * @param {number} num - The number to round
 * @param {Object} [options] - Options object specifying decimal digits
 * @param {number} [options.digits=0] - The number of decimal places
 * @returns {number} The rounded number
 */
declare const round: (num: number, options?: {
    digits: number;
}) => number;
/**
 * Floors a floating-point number to the specified number of decimal digits.
 *
 * @param {number} num - The number to floor
 * @param {Object} [options] - Options object specifying decimal digits
 * @param {number} [options.digits=0] - The number of decimal places
 * @returns {number} The floored number
 */
declare const floor: (num: number, options?: {
    digits: number;
}) => number;
/**
 * Ceils a floating-point number to the specified number of decimal digits.
 *
 * @param {number} num - The number to ceil
 * @param {Object} [options] - Options object specifying decimal digits
 * @param {number} [options.digits=0] - The number of decimal places
 * @returns {number} The ceiled number
 */
declare const ceil: (num: number, options?: {
    digits: number;
}) => number;
/**
 * Checks if a value is a finite integer.
 *
 * @param {unknown} value - Value to check
 * @returns {value is number} True if value is a finite integer, false otherwise
 */
declare const isInteger: (value: unknown) => value is number;
/**
 * Checks if a value is a finite and positive (>0) integer.
 *
 * @param {unknown} value - Value to check
 * @returns {value is number} True if value is a positive and finite integer, false otherwise
 */
declare const isPositiveInteger: (value: unknown) => value is number;
/**
 * Checks if a value is a finite non-integer number.
 *
 * @param {unknown} value - Value to check
 * @returns {value is number} True if value is a finite float, false otherwise
 *
 * removed - Why do we need this if we have isNumber() and isInteger() ?
 */
/**
 * Checks if a value is a finite number (excludes NaN and Infinity).
 *
 * @param {unknown} value - Value to check
 * @returns {value is number} True if value is a finite number, false otherwise
 */
declare const isNumber: (value: unknown) => value is number;

export { RoundingMode, ceil, floor, isInteger, isNumber, isPositiveInteger, round, toInteger, toIntegerOrThrow, toNumber, toNumberOrThrow };
