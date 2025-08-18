/**
 * Converts an unknown value to a numeric type (integer or float).
 * `NaN`, `Infinity`, and `-Infinity` are considered non-numeric and return `null`.
 *
 * @param {unknown} input - The value to convert.
 * @returns {number | null} The numeric value, or `null` if conversion fails.
 */
declare enum RoundingMode {
    NONE = "none",
    FLOOR = "floor",
    CEIL = "ceil",
    ROUND = "round"
}
declare const toNumber: (input: unknown, options?: {
    roundingMode?: RoundingMode;
    digits?: number;
}) => number | null;
declare const toInteger: (input: unknown) => number | null;
/**
 * Rounds a floating-point number to the specified number of decimal digits.
 *
 * @param {number} num - The number to round.
 * @param {{ digits: number }} [options={ digits: 0 }] - An options object specifying the number of decimal digits to keep.
 * @returns {number} The rounded number.
 */
declare const round: (num: number, options?: {
    digits: number;
}) => number;
declare const floor: (num: number, options?: {
    digits: number;
}) => number;
declare const ceil: (num: number, options?: {
    digits: number;
}) => number;
/**
 * Checks if the given value is an integer.
 *
 * Note: `NaN`, `Infinity`, and `-Infinity` are considered invalid.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is number} True if the value is a finite integer, otherwise false.
 */
declare const isInteger: (value: unknown) => value is number;
/**
 * Checks if the given value is a floating-point number (non-integer).
 *
 * Note: `NaN`, `Infinity`, and `-Infinity` are considered invalid.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is number} True if the value is a finite float, otherwise false.
 */
declare const isFloat: (value: unknown) => value is number;
/**
 * Checks if the given value is a finite number (integer or float).
 *
 * Note: `NaN`, `Infinity`, and `-Infinity` are considered invalid.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is number} True if the value is a finite number, otherwise false.
 */
declare const isNumber: (value: unknown) => value is number;
export { ceil, floor, isFloat, isInteger, isNumber, round, RoundingMode, toInteger, toNumber, };
