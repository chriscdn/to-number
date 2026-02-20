// src/index.ts
var RoundingMode = /* @__PURE__ */ ((RoundingMode2) => {
  RoundingMode2["NONE"] = "none";
  RoundingMode2["FLOOR"] = "floor";
  RoundingMode2["CEIL"] = "ceil";
  RoundingMode2["ROUND"] = "round";
  return RoundingMode2;
})(RoundingMode || {});
var toNumber = (input, options) => {
  const roundingMode = options?.roundingMode ?? "none" /* NONE */;
  const digits = options?.digits ?? 0;
  const cast = isNumber(input) ? input : parseFloat(String(input));
  if (isNumber(cast)) {
    switch (roundingMode) {
      case "floor" /* FLOOR */:
        return floor(cast, { digits });
      case "ceil" /* CEIL */:
        return ceil(cast, { digits });
      case "round" /* ROUND */:
        return round(cast, { digits });
      default:
        return cast;
    }
  } else {
    return null;
  }
};
var toNumberOrThrow = (input, options) => {
  const result = toNumber(input, options);
  if (isNumber(result)) {
    return result;
  } else {
    throw new TypeError(`Cannot convert ${input} to number.`);
  }
};
var toInteger = (input) => toNumber(input, {
  roundingMode: "floor" /* FLOOR */
});
var toIntegerOrThrow = (input) => toNumberOrThrow(input, {
  roundingMode: "floor" /* FLOOR */
});
var withDecimalPrecision = (num, options, func) => {
  const { digits } = options;
  if (digits === 0) {
    return func(num);
  } else if (isPositiveInteger(digits)) {
    const shifted = toNumberOrThrow(`${num}e+${digits}`);
    const rounded = func(shifted);
    return toNumberOrThrow(`${rounded}e-${digits}`);
  } else {
    throw new Error("digits must be an integer greater than or equal to zero");
  }
};
var round = (num, options = { digits: 0 }) => withDecimalPrecision(num, options, Math.round);
var floor = (num, options = { digits: 0 }) => withDecimalPrecision(num, options, Math.floor);
var ceil = (num, options = { digits: 0 }) => withDecimalPrecision(num, options, Math.ceil);
var isInteger = (value) => typeof value === "number" && Number.isInteger(value);
var isPositiveInteger = (value) => isInteger(value) && value > 0;
var isNumber = (value) => typeof value === "number" && Number.isFinite(value);
export {
  RoundingMode,
  ceil,
  floor,
  isInteger,
  isNumber,
  isPositiveInteger,
  round,
  toInteger,
  toIntegerOrThrow,
  toNumber,
  toNumberOrThrow
};
//# sourceMappingURL=index.js.map