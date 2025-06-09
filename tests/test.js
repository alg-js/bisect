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

import {assertEquals} from "jsr:@std/assert@1";
import fc from "npm:fast-check";
import {
    bisect,
    bisectLeft,
    insort,
    insortLeft,
    partition,
    partitionLeft,
} from "../src/main.js";

Deno.test({
    name: "bisect finds the minimum element in an array",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        (arr) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            assertEquals(bisectLeft(arr, arr[0]), 0);
            assertEquals(bisect(arr, arr[0]), 1);
        },
    )),
});

Deno.test({
    name: "bisect returns 0 for empty arrays with any target",
    fn: () => fc.assert(fc.property(
        fc.integer(),
        (target) => {
            assertEquals(bisectLeft([], target), 0);
            assertEquals(bisect([], target), 0);
        },
    )),
});

Deno.test({
    name: "bisect returns 0 if searching for a number smaller than the minimum",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        (arr) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            assertEquals(bisectLeft(arr, arr[0] - 1), 0);
            assertEquals(bisect(arr, arr[0] - 1), 0);
        },
    )),
});

Deno.test({
    name: "bisect finds the maximum element in an array",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer({min: -50, max: 50}), {minLength: 1}),
        (arr) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            const max = arr.at(-1);
            assertEquals(bisect(arr, arr.at(-1)), arr.length);
            fc.pre(arr.at(-2) !== max);
            assertEquals(bisectLeft(arr, arr.at(-1)), arr.length - 1);
        },
    )),
});

Deno.test({
    name: "bisect returns the array length if finding a number larger than the maximum",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer({min: -50, max: 50}), {minLength: 1}),
        (arr) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            assertEquals(bisectLeft(arr, arr.at(-1) + 1), arr.length);
            assertEquals(bisect(arr, arr.at(-1) + 1), arr.length);
        },
    )),
});


Deno.test({
    name: "bisect finds the leftmost or rightmost occurrence of an item",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer({min: -50, max: 50}), {minLength: 1}),
        fc.integer({min: -50, max: 50}),
        (arr, target) => {
            arr.push(target);
            arr.sort((a, b) => a < b ? -1 : 1);
            const expectedLeft = arr.findIndex((e) => e === target);
            assertEquals(bisectLeft(arr, target), expectedLeft);
            let expectedRight = arr.findIndex((e) => e > target);
            expectedRight = expectedRight === -1 ? arr.length : expectedRight;
            assertEquals(bisect(arr, target), expectedRight);
        },
    )),
});


Deno.test({
    name: "bisect finds the insertion position of an item that is not in the array",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer({min: -50, max: 50}), {minLength: 1}),
        fc.integer({min: -50, max: 50}),
        (arr, target) => {
            fc.pre(arr.find((e) => e === target) === undefined);
            arr.sort((a, b) => a < b ? -1 : 1);
            fc.pre(arr.at(0) < target && target < arr.at(-1));
            const expected = arr.findIndex((e) => e > target);
            assertEquals(bisectLeft(arr, target), expected);
            assertEquals(bisect(arr, target), expected);
        },
    )),
});

Deno.test({
    name: "bisect finds the leftmost or rightmost index with repeated values",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer({min: -50, max: 50}), {minLength: 1}),
        fc.integer({min: -50, max: 50}),
        fc.integer({min: 2, max: 10}),
        (arr, target, reps) => {
            arr = arr.concat(Array(reps).fill(target));
            arr.sort((a, b) => a < b ? -1 : 1);
            const expectedLeft = arr.findIndex((e) => e === target);
            assertEquals(bisectLeft(arr, target), expectedLeft);
            let expectedRight = arr.findIndex((e) => e > target);
            expectedRight = expectedRight === -1 ? arr.length : expectedRight;
            assertEquals(bisect(arr, target), expectedRight);
        },
    )),
});


Deno.test({
    name: "Partition splits a list in two with all elements <= x on the left",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        fc.integer(),
        (arr, value) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            const idx = arr.findLastIndex(it => it <= value) + 1;
            const [bruteLeft, bruteRight] = [arr.slice(0, idx), arr.slice(idx)];
            const [left, right] = partition(arr, value);

            assertEquals(left, bruteLeft);
            assertEquals(right, bruteRight);
        },
    )),
});


Deno.test({
    name: "Partition Left splits a list in two with elements < x on the left",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        fc.integer(),
        (arr, value) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            let idx = arr.findIndex(it => it >= value);
            idx = idx === -1 ? arr.length : idx;
            const [bruteLeft, bruteRight] = [arr.slice(0, idx), arr.slice(idx)];
            const [left, right] = partitionLeft(arr, value);

            assertEquals(left, bruteLeft);
            assertEquals(right, bruteRight);
        },
    )),
});


Deno.test({
    name: "Insort adds items to arrays",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        fc.integer(),
        (arr, value) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            const arrCopy = [...arr];
            const bruteArr = [...arr];
            const idx = bruteArr.findLastIndex(it => it <= value) + 1;
            bruteArr.splice(idx, 0, value);
            assertEquals(insort(arr, value), bruteArr);
            assertEquals(arr, arrCopy);
        },
    )),
});


Deno.test({
    name: "Insort adds items to arrays in Place",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        fc.integer(),
        (arr, value) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            const bruteArr = [...arr];
            const idx = bruteArr.findLastIndex(it => it <= value) + 1;
            bruteArr.splice(idx, 0, value);
            insort(arr, value, {inPlace: true});
            assertEquals(arr, bruteArr);
        },
    )),
});


Deno.test({
    name: "InsortLeft adds items to arrays",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        fc.integer(),
        (arr, value) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            const arrCopy = [...arr];
            const bruteArr = [...arr];
            let idx = arr.findIndex(it => it >= value);
            idx = idx === -1 ? arr.length : idx;
            bruteArr.splice(idx, 0, value);
            assertEquals(insortLeft(arr, value), bruteArr);
            assertEquals(arr, arrCopy);
        },
    )),
});


Deno.test({
    name: "InsortLeft adds items to arrays in place",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        fc.integer(),
        (arr, value) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            const bruteArr = [...arr];
            let idx = arr.findIndex(it => it >= value);
            idx = idx === -1 ? arr.length : idx;
            bruteArr.splice(idx, 0, value);
            insortLeft(arr, value, {inPlace: true});
            assertEquals(arr, bruteArr);
        },
    )),
});


Deno.test({
    name: "bisect can take custom lt functions",
    fn: () => fc.assert(fc.property(
        fc.array(fc.string(), {minLength: 1}),
        fc.string(),
        (arr, value) => {
            arr.sort((a, b) => a.length - b.length);
            const lt = (a, b) => a.length < b.length;

            let expectedLeft = arr.findIndex((e) => e.length >= value.length);
            expectedLeft = expectedLeft === -1 ? arr.length : expectedLeft;
            let expectedRight = arr.findLastIndex((e) => e.length <= value.length);
            expectedRight = expectedRight === -1 ? 0 : expectedRight + 1;

            assertEquals(
                bisect(arr, value, {lt: lt}),
                expectedRight,
            );
            assertEquals(
                bisectLeft(arr, value, {lt: lt}),
                expectedLeft,
            );
            assertEquals(
                partition(arr, value, {lt: lt}),
                [arr.slice(0, expectedRight), arr.slice(expectedRight)],
            );
            assertEquals(
                partitionLeft(arr, value, {lt: lt}),
                [arr.slice(0, expectedLeft), arr.slice(expectedLeft)],
            );
        },
    )),
});
