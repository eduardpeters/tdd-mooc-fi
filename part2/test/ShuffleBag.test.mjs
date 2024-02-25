import { beforeEach, describe, test, expect } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag";

const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

describe("Shuffle bag", () => {
  let bag;
  beforeEach(() => {
    bag = new ShuffleBag([...values]);
  });

  test("A shufflebag is filled and returns a valid output", () => {
    expect(values.includes(bag.next())).toBe(true);
  });

  test("A full run exhausts all possible numbers", () => {
    let outputs = [];
    for (let i = 0; i < values.length; i++) {
      outputs.push(bag.next());
    }
    outputs.sort((a, b) => a - b);
    expect(outputs).toEqual(values);
  });
});
