# @chriscdn/to-number

A TypeScript library for strict numeric conversion and validation.

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

The `toNumber` function converts a value to a finite number:

- If the value is already numeric, it is returned as-is.
- Boolean values are converted to `1` for `true` and `0` for `false`.
- Non-numbers are converted to a string and validated to contain only an optional sign, digits, an optional decimal point, and optional scientific notation. If valid, it is converted; otherwise, `null` is returned.

**Parameters:**

- `input`: The value to convert.
- `options`: An optional object for rounding:
  - `roundingMode` (`NONE`, `FLOOR`, `CEIL`, `ROUND`, default `NONE`)
  - `digits` (number of decimal places, default `0`)

**Examples:**

```ts
import { toNumber, RoundingMode } from "@chriscdn/to-number";

// boolean values
toNumber(true);
// Returns: 1
toNumber(false);
// Returns: 0

// rounding down
toNumber("123.99999", {
  roundingMode: RoundingMode.FLOOR,
  digits: 2,
});
// Returns: 123.99

// invalid string
toNumber("hello123");
// Returns: null

// invalid string
toNumber("2020-01-01");
// Returns: null
```

### toInteger

The `toInteger` function converts a value to an integer using floor rounding. If the conversion fails, it returns `null`.

**Examples:**

```ts
import { toInteger } from "@chriscdn/to-number";

// simple conversion
toInteger("12.99");
// Returns: 12

// invalid value
toInteger("abc");
// Returns: null
```

### toIntegerOrThrow and toNumberOrThrow

These functions convert a value to a number or integer but throw a `TypeError` if the conversion fails.

- `toNumberOrThrow` converts any value to a finite number (`true` → `1`, `false` → `0`).
- `toIntegerOrThrow` converts any value to an integer using floor rounding (`true` → `1`, `false` → `0`).

**Examples:**

```ts
import { toNumberOrThrow, toIntegerOrThrow } from "@chriscdn/to-number";

// valid number
toNumberOrThrow("123.45");
// Returns: 123.45

// boolean value
toNumberOrThrow(false);
// Returns: 0

// throws error on invalid value
toNumberOrThrow("abc");
// Throws TypeError: Cannot convert abc to number.

// integer conversion with floor
toIntegerOrThrow("12.99");
// Returns: 12

// throws error on invalid value
toIntegerOrThrow("xyz");
// Throws TypeError: Cannot convert xyz to number.
```

### ceil, floor, round

The `ceil`, `floor`, and `round` functions adjust numbers to a specific number of decimal places (unlike JavaScript's `Math.ceil()`, `Math.floor()`, and `Math.round()` which always return whole numbers).

**Example:**

```ts
import { ceil, floor, round } from "@chriscdn/to-number";

ceil(15.65, { digits: 1 });
// Returns: 15.7

floor(15.65, { digits: 1 });
// Returns: 15.6

round(15.65, { digits: 1 });
// Returns: 15.7
```

### Type Guards

The library provides `isInteger`, `isPositiveInteger`, and `isNumber` type guard functions. These functions return `false` for `NaN`, `Infinity`, and `-Infinity`.

**Example:**

```ts
import { isInteger, isPositiveInteger, isNumber } from "@chriscdn/to-number";

isInteger(5.0);
// Returns: true

isPositiveInteger(5);
// Returns: true

isNumber(3.14);
// Returns: true

isNumber(NaN);
// Returns: false
```

## License

[MIT](LICENSE)
