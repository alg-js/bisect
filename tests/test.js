import {assertEquals} from "jsr:@std/assert@1";
import fc from "npm:fast-check";
import {bisect, bisectRight} from "@alg/bisect";

Deno.test({
    name: "bisect finds the minimum element in an array",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        (arr) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            assertEquals(bisect(arr, arr[0]), 0);
            assertEquals(bisectRight(arr, arr[0]), 1);
        },
    )),
});

Deno.test({
    name: "bisect returns 0 for empty arrays with any target",
    fn: () => fc.assert(fc.property(
        fc.integer(),
        (target) => {
            assertEquals(bisect([], target), 0);
            assertEquals(bisectRight([], target), 0);
        },
    )),
});

Deno.test({
    name: "bisect returns 0 if searching for a number smaller than the minimum",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer(), {minLength: 1}),
        (arr) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            assertEquals(bisect(arr, arr[0] - 1), 0);
            assertEquals(bisectRight(arr, arr[0] - 1), 0);
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
            assertEquals(bisectRight(arr, arr.at(-1)), arr.length);
            fc.pre(arr.at(-2) !== max);
            assertEquals(bisect(arr, arr.at(-1)), arr.length - 1);
        },
    )),
});

Deno.test({
    name: "bisect returns the array length if finding a number larger than the maximum",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer({min: -50, max: 50}), {minLength: 1}),
        (arr) => {
            arr.sort((a, b) => a < b ? -1 : 1);
            assertEquals(bisect(arr, arr.at(-1) + 1), arr.length);
            assertEquals(bisectRight(arr, arr.at(-1) + 1), arr.length);
        },
    )),
});


Deno.test({
    name: "bisect finds the leftmost or rightmost occurrence of an item",
    fn: () => fc.assert(fc.property(
        fc.array(fc.integer({min: -50, max: 50}), {minLength: 1}),
        fc.integer({min: -50, max: 50}),
        fc.integer({min: 2, max: 5}),
        (arr, target, reps) => {
            arr = arr.concat(new Array(reps).fill(target));
            arr.sort((a, b) => a < b ? -1 : 1);
            const expectedLeft = arr.findIndex((e) => e === target);
            assertEquals(bisect(arr, target), expectedLeft);
            let expectedRight = arr.findIndex((e) => e > target);
            expectedRight = expectedRight === -1 ? arr.length : expectedRight;
            assertEquals(bisectRight(arr, target), expectedRight);
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
            assertEquals(bisect(arr, target), expected);
            assertEquals(bisectRight(arr, target), expected);
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
            assertEquals(bisect(arr, target), expectedLeft);
            let expectedRight = arr.findIndex((e) => e > target);
            expectedRight = expectedRight === -1 ? arr.length : expectedRight;
            assertEquals(bisectRight(arr, target), expectedRight);
        },
    )),
});
