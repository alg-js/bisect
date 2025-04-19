# @alg/bisect

[![JSR](https://jsr.io/badges/@alg/bisect)](https://jsr.io/@alg/bisect)
[![API](https://img.shields.io/badge/API-blue?logo=readme&logoColor=white)](https://jsr.io/@alg/bisect/doc)
[![License](https://img.shields.io/badge/MIT-green?label=license)](https://github.com/alg/bisect/blob/main/LICENSE)

A generic binary search implementation.

## Install

```
deno add jsr:@alg/bisect
```

## Example

```javascript
import {bisect} from "@alg/sequences";

const arr = [-1, 2, 2, 4, 5];

console.log(bisect(arr, -2));  // 0
console.log(bisect(arr, 2));  // 1
console.log(bisect(arr, 3));  // 3
console.log(bisect(arr, 6));  // 5
```

A function defining the `<` relation can be given to define the ordering of
items.

```javascript
import {bisect} from "@alg/sequences";

const strings = ["a", "abc", "abcd"];
const lt = (a, b) => a.length < b.length

console.log(bisect(strings, "ab", lt));  // 1
```
