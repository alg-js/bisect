# @alg/bisect

[![JSR](https://jsr.io/badges/@alg/bisect)](https://jsr.io/@alg/bisect)
[![License](https://img.shields.io/badge/Apache--2.0-green?label=license)](https://github.com/alg-js/bisect/blob/main/LICENSE)

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

The `bisect` and `bisectLeft` functions find target values in an array, the
`partition` and `partitionLeft` functions split an array by a target value.

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

As with `bisect` and `bisectLeft`, a custom comparison operator can be passed
as an optional third argument.
