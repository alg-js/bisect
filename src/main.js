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

/* @ts-self-types="./main.d.ts" */

export function bisectLeft(arr, target, lt = (a, b) => a < b) {
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

export function bisect(arr, target, lt = (a, b) => a < b) {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
        const mid = Math.floor(lo + (hi - lo) / 2);
        if (lt(target, arr[mid])) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
