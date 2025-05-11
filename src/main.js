/* @ts-self-types="./main.d.ts" */

export function bisect(arr, target, lt = (a, b) => a < b) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
        const mid = Math.floor(lo + (hi - lo) / 2);
        if (lt(arr[mid], target)) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
}
