"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  RoundingMode: () => RoundingMode,
  ceil: () => ceil,
  floor: () => floor,
  isInteger: () => isInteger,
  isNumber: () => isNumber,
  isPositiveInteger: () => isPositiveInteger,
  round: () => round,
  toInteger: () => toInteger,
  toIntegerOrThrow: () => toIntegerOrThrow,
  toNumber: () => toNumber,
  toNumberOrThrow: () => toNumberOrThrow
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map