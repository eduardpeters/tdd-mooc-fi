import { beforeEach, describe, test, expect } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag";

const values = [0, 1, 2, 3, 4, 5, 6, 8, 9];

describe("Shuffle bag", () => {
  let bag;
  beforeEach(() => {
    bag = new ShuffleBag();
  });

  test("A shufflebag is filled and returns a valid output", () => {
    expect(values.includes(bag.next())).toBe(true);
  });
});
