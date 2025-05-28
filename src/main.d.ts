/* Copyright 2025 James Finnie-Ansley
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
 * @template T
 * @param {T[]} arr a sorted array
 * @param {T} target the target to search for
 * @param {(a: T, b: T) => boolean} lt a function defining the `<` relation
 * @returns {number} the minimum index `target` can be inserted to preserve
 *  the sorted order of `arr` — may be equal to `arr.length`
 */
export function bisectLeft<T>(
    arr: T[],
    target: T,
    lt: (a: T, b: T) => boolean,
): number;

/**
 * Finds the largest index in a sorted array, `arr`, at which the `target`
 * could be inserted while still preserving sorted order.
 *
 * `lt` is equal to `(a, b) => a < b` by default
 *
 * @template T
 * @param {T[]} arr a sorted array
 * @param {T} target the target to search for
 * @param {(a: T, b: T) => boolean} lt a function defining the `<` relation
 * @returns {number} the minimum index `target` can be inserted to preserve
 *  the sorted order of `arr` — may be equal to `arr.length`
 */
export function bisect<T>(
    arr: T[],
    target: T,
    lt: (a: T, b: T) => boolean,
): number;
