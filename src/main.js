/* @ts-self-types="./types.d.ts" */

/**
 * Finds the minimum index in a sorted array, `arr`, at which the `target`
 * could be inserted while still preserving sorted order.
 *
 * @template T
 * @param {T[]} arr a sorted array
 * @param {T} target the target to search for
 * @param {(a: T, b: T) => boolean} lt a function defining the `<` relation
 * @returns {number} the minimum index `target` can be inserted to preserve
 *  the sorted order of `arr` — may be equal to `arr.length`
 */
export function bisect(arr, target, lt = (a, b) => a < b) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
        let mid = Math.floor(lo + (hi - lo) / 2);
        if (lt(arr[mid], target)) {
            lo = mid + 1;
        } else if (lt(target, arr[mid])) {
            hi = mid - 1;
        } else {
            let i = mid - 1;
            while (i >= 0 && !lt(arr[i], arr[mid])) {
                i -= 1;
                mid -= 1;
            }
            return mid;
        }
    }
    return lo;
}