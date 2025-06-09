/* Copyright 2025 @alg/bisect Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Finds the minimum index in a sorted array, `arr`, at which the `target`
 * could be inserted while still preserving sorted order.
 *
 * `lt` is equal to `(a, b) => a < b` by default
 *
 * @example
 * ```javascript
 * import {bisectLeft} from "@alg/bisect";
 *
 * const data = [1, 2, 3, 3, 4, 5];
 * console.log(bisectLeft(data, 3));  // 2
 * ```
 *
 * @template T
 * @param {T[]} arr a sorted array
 * @param {T} target the target to search for
 * @param {Object=} options
 * @param {(a: T, b: T) => boolean} options.lt a function defining the `<`
 * relation
 * @returns {number} the minimum index `target` can be inserted to preserve
 *  the sorted order of `arr` — may be equal to `arr.length`
 */
export function bisectLeft<T>(
    arr: T[],
    target: T,
    options?: {lt?: (a: T, b: T) => boolean},
): number;

/**
 * Finds the largest index in a sorted array, `arr`, at which the `target`
 * could be inserted while still preserving sorted order.
 *
 * `lt` is equal to `(a, b) => a < b` by default
 *
 * @example
 * ```javascript
 * import {bisect} from "@alg/bisect";
 *
 * const data = [1, 2, 3, 3, 4, 5];
 * console.log(bisect(data, 3));  // 4
 * ```
 *
 * @template T
 * @param {T[]} arr a sorted array
 * @param {T} target the target to search for
 * @param {Object=} options
 * @param {(a: T, b: T) => boolean} options.lt a function defining the `<`
 * relation
 * @returns {number} the minimum index `target` can be inserted to preserve
 *  the sorted order of `arr` — may be equal to `arr.length`
 */
export function bisect<T>(
    arr: T[],
    target: T,
    options?: {lt?: (a: T, b: T) => boolean},
): number;

/**
 * Splits the given array into two. Where all the elements in the first array
 * are less than or equal to the given target, and all elements in the second
 * array are strictly greater than the target.
 *
 * A comparison function, `lt`, can be provided and is equal to
 * `(a, b) => a < b` by default.
 *
 * @exmaple
 * ```javascript
 * import {partition} from "@alg/bisect";
 *
 * const data = [1, 2, 3, 3, 4, 5];
 * console.log(partition(data, 3));  // [[1, 2, 3, 3], [4, 5]]
 * ```
 *
 * @template T
 * @param {T[]} arr a sorted array
 * @param {T} target the target to split the given array at
 * @param {Object=} options
 * @param {(a: T, b: T) => boolean} options.lt a function defining the `<`
 * relation
 * @returns {[T[], T[]]} Two arrays that divide the given array at the target
 */
export function partition<T>(
    arr: T[],
    target: T,
    options?: {lt?: (a: T, b: T) => boolean},
): [T[], T[]];

/**
 * Splits the given array into two. Where all the elements in the first array
 * are strictly less than the given target, and all elements in the second
 * array are greater than or equal to the target.
 *
 * A comparison function, `lt`, can be provided and is equal to
 * `(a, b) => a < b` by default.
 *
 * @exmaple
 * ```javascript
 * import {partitionLeft} from "@alg/bisect";
 *
 * const data = [1, 2, 3, 3, 4, 5];
 * console.log(partitionLeft(data, 3));  // [[1, 2], [3, 3, 4, 5]]
 * ```
 *
 * @template T
 * @param {T[]} arr a sorted array
 * @param {T} target the target to split the given array at
 * @param {Object=} options
 * @param {(a: T, b: T) => boolean} options.lt a function defining the `<`
 * relation
 * @returns {[T[], T[]]} Two arrays that divide the given array at the target
 */
export function partitionLeft<T>(
    arr: T[],
    target: T,
    options?: {lt?: (a: T, b: T) => boolean},
): [T[], T[]];

/**
 * Returns a new array where the given target has been inserted into the
 * rightmost position of the given array that still maintains sorted order.
 *
 * If the `inPlace` option is given and set to `true`, the array is modified
 * in place and the original array is returned.
 *
 * A comparison function, `lt`, can be provided and is equal to
 * `(a, b) => a < b` by default.
 *
 * @exmaple
 * ```javascript
 * import {insort} from "@alg/bisect";
 *
 * const data = ["A", "BC", "DE", "FGH"];
 * const options = {lt: (a, b) => a.length < b.length};
 * console.log(insort(data, "XX", options));
 * // ["A", "BC", "DE", "XX", "FGH"]
 * ```
 *
 * @template T
 * @param {T[]} arr a sorted array
 * @param {T} target the target to insert
 * @param {Object=} options
 * @param {(a: T, b: T) => boolean} options.lt a function defining the `<`
 * relation
 * @param {boolean} options.inPlace If true, the array is modified in place.
 * @returns {T[]} An array with the inserted element
 */
export function insort<T>(
    arr: T[],
    target: T,
    options?: {
        lt?: (a: T, b: T) => boolean,
        inPlace?: boolean,
    },
): T[];

/**
 * Returns a new array where the given target has been inserted into the
 * leftmost position of the given array that still maintains sorted order.
 *
 * If the `inPlace` option is given and set to `true`, the array is modified
 * in place and the original array is returned.
 *
 * A comparison function, `lt`, can be provided and is equal to
 * `(a, b) => a < b` by default.
 *
 * @exmaple
 * ```javascript
 * import {insortLeft} from "@alg/bisect";
 *
 * const data = ["A", "BC", "DE", "FGH"];
 * const options = {lt: (a, b) => a.length < b.length};
 * console.log(insortLeft(data, "XX", options));
 * // ["A", "XX", "BC", "DE", "FGH"]
 * ```
 *
 * @template T
 * @param {T[]} arr a sorted array
 * @param {T} target the target to insert
 * @param {Object=} options
 * @param {(a: T, b: T) => boolean} options.lt a function defining the `<`
 * relation
 * @param {boolean} options.inPlace If true, the array is modified in place.
 * @returns {T[]} An array with the inserted element
 */
export function insortLeft<T>(
    arr: T[],
    target: T,
    options?: {
        lt?: (a: T, b: T) => boolean,
        inPlace?: boolean,
    },
): T[];
