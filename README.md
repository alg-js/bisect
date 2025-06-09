# @alg/bisect

[![JSR](https://jsr.io/badges/@alg/bisect)](https://jsr.io/@alg/bisect)
[![License](https://img.shields.io/badge/Apache--2.0-green?label=license)](https://codeberg.org/algjs/bisect/src/branch/main/LICENSE)

A generic binary search implementation.

## Install

```
deno add jsr:@alg/bisect
```

<details>
<summary>Other Install Options</summary>

```bash
npx jsr add @alg/bisect
```

```bash
bunx jsr add @alg/bisect
```

```bash
pnpm i jsr:@alg/bisect
```

```bash
yarn add jsr:@alg/bisect
```

```bash
vlt install jsr:@alg/bisect
```

</details>

## Example

There are three main functions in this library, each with a left and right
variant:

- `bisect`: finds the indices that given target values need to be inserted to
  preserve sorted order
- `parition`: splits arrays by a given target value
- `insort`: inserts a given value into an array while maintaining sorted order

These functions are described more below.

## `bisect`

`bisect` returns the largest index in a sorted array at which the target value
can be inserted while preserving sorted order.

```javascript
import {bisect} from "@alg/bisect";

const arr = [-1, 2, 2, 4, 5];

console.log(bisect(arr, -2));  // 0
console.log(bisect(arr, 2));  // 3
console.log(bisect(arr, 3));  // 3
console.log(bisect(arr, 6));  // 5
```

A function defining the `<` relation can be given to define the ordering of
items.

```javascript
import {bisect} from "@alg/bisect";

const strings = ["a", "abc", "abcd"];
const options = {lt: (a, b) => a.length < b.length}

console.log(bisect(strings, "ab", options));  // 1
```

`bisectLeft` finds the smallest index at which the target could be inserted in
to a sorted array that preserves sorted order.

```javascript
import {bisect, bisectLeft} from "@alg/bisect";

const arr = [-1, 2, 2, 4, 5];

console.log(bisect(arr, 2));  // 3
console.log(bisectLeft(arr, 2));  // 1
```

## `partition`

`partition` splits a given array into two. Where all the elements in the first
array are less than or equals to the given target, and all elements in the
second array are strictly greater than or equal to the target.

`partitionLeft` splits the given array into two. Where all the elements in the
first array are strictly less than the given target, and all elements in the
second array are greater than or equal to the target.

```javascript
import {partition, partitionLeft} from "@alg/bisect";

const data = [1, 2, 3, 3, 4, 5];
console.log(partition(data, 3));  // [[1, 2, 3, 3], [4, 5]]
console.log(partitionLeft(data, 3));  // [[1, 2], [3, 3, 4, 5]];
```

As with `bisect` and `bisectLeft`, a custom comparison operator can be passed as
an optional argument.

## `insort`

`insort` returns a new array with a given value inserted into the rightmost
location that preserves sorted order. `insortLeft` does the same but at the
leftmost location.

```javascript
import {insort, insortLeft} from "@alg/bisect";

const data = ["A", "BC", "DE", "FGH"];
const options = {lt: (a, b) => a.length < b.length};

console.log(insort(data, "XX", options));  // ["A", "BC", "DE", "XX", "FGH"]
console.log(insortLeft(data, "XX", options));  // ["A", "XX", "BC", "DE", "FGH"]
```

By default, `insort` and `insortLeft` return a new array. To insert values in
place, the `inPlace` option can be provided:

```javascript
import {insort} from "@alg/bisect";

const data = ["A", "BC", "DE", "FGH"];
const options = {
    lt: (a, b) => a.length < b.length,
    inPlace: true,
};

console.log(insort(data, "XX", options));  // ["A", "BC", "DE", "XX", "FGH"]
console.log(data);  // ["A", "BC", "DE", "XX", "FGH"]
```
