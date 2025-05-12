/**
 * Every day I pray for <https://tc39.es/proposal-type-annotations/>
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
export function bisect<T>(
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
export function bisectRight<T>(
    arr: T[],
    target: T,
    lt: (a: T, b: T) => boolean,
): number;
