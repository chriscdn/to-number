# @chriscdn/to-number

A TypeScript library for numeric conversion and validation.

## Motivation

This package assists in number parsing, including:

- returning `null` instead of `NaN` when a value cannot be converted,
- rounding options, and
- offering type-checking functions.

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
- `options`: An optional object for rounding:
  - `roundingMode` (`NONE`, `FLOOR`, `CEIL`, `ROUND`, default `NONE`)
  - `digits` (number of decimal places, default `0`)

**Examples:**

```ts
import { toNumber, RoundingMode } from "@chriscdn/to-number";

toNumber("123.99999", {
  roundingMode: RoundingMode.FLOOR,
  digits: 2,
});
// Returns: 123.99

toNumber("hello123");
// Returns: null
```

### ceil, floor, round

The `ceil`, `floor`, and `round` functions can adjust numbers to a specific number of decimal places (unlike JavaScript's `Math.ceil()`, `Math.floor()`, and `Math.round()` which always return whole numbers).

**Example:**

```ts
import { ceil } from "@chriscdn/to-number";

ceil(15.65, { digits: 1 });
// Returns: 15.7
```

### Type Guards

The library provides `isFloat`, `isInteger`, and `isNumber` type guard functions. These functions return `false` for `NaN`, `Infinity`, and `-Infinity`.

**Example:**

```ts
import { isFloat, isInteger, isNumber } from "@chriscdn/to-number";

isFloat(45.2);
// Returns: true

isInteger(5.0);
// Returns: true
```

## License

[MIT](LICENSE)
