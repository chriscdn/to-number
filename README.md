# @chriscdn/to-number

A TypeScript library for numeric conversion and validation.

## Motivation

This package offers several improvements over directly handling numeric conversions and validations, including:

- Returning `null` instead of unexpected numeric values when an input is not a valid number.
- Providing rounding options.
- Offering type-checking functions for numeric values.

## Installation

Using npm:

```bash
npm install @chriscdn/to-number
```

Using yarn:

```bash
yarn add @chriscdn/to-number
```

## Usage

### toNumber

The `toNumber` function converts an input value to a numeric type. It returns `null` for invalid or non-finite numeric values such as `NaN`, `Infinity`, or `-Infinity`.

**Parameters:**

- `input`: The value to convert.
- `options`: An optional object for rounding configuration:
  - `RoundingMode` (`NONE`, `FLOOR`, `CEIL`, `ROUND`, default `None`)
  - `digits` (number of decimal places, default `0`)

**Examples:**

```ts
import { toNumber } from "@chriscdn/to-number";

toNumber("123.99999", {
  roundingMode: RoundingMode.FLOOR,
  digits: 2,
});
// Returns: 123.99

toNumber("hello123");
// Returns: null
```

### ceil, floor, round

The `ceil`, `floor`, and `round` functions can adjust numbers to a specific number of decimal places, while JavaScript's `Math.ceil()`, `Math.floor()`, and `Math.round()` always return whole numbers.

**Example:**

```ts
import { ceil } from "@chriscdn/to-number";

ceil(15.65, { digits: 1 });
// Returns: 15.7
```

### Type Guards

The library provides an `isFloat`, `isInteger`, and `isNumber` type guard functions.

**Example:**

```ts
import { isFloat, isInteger, isNumber } from "@chriscdn/to-number";

isFloat(45.2);
// Returns: true
```

## License

[MIT](LICENSE)
