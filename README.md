# @alg/bisect

[![JSR](https://jsr.io/badges/@alg/bisect)](https://jsr.io/@alg/bisect)
[![License](https://img.shields.io/badge/Apache--2.0-green?label=license)](https://github.com/alg-js/bisect/blob/main/LICENSE)

A generic binary search implementation.

## Install

```
deno add jsr:@alg/bisect
```

## Example

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
const lt = (a, b) => a.length < b.length

console.log(bisect(strings, "ab", lt));  // 1
```

`bisectLeft` finds the smallest index at which the target could be inserted in
to a sorted array that preserves sorted order.

```javascript
import {bisect, bisectLeft} from "@alg/bisect";

const arr = [-1, 2, 2, 4, 5];

console.log(bisect(arr, 2));  // 3
console.log(bisectLeft(arr, 2));  // 1
```
