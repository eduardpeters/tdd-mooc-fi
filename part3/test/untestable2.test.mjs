import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("One Pair", () => {
    expect(diceHandValue(3, 3)).to.equal(103);
    expect(diceHandValue(5, 5)).to.equal(105);
    expect(diceHandValue(1, 1)).to.equal(101);
  });

  test("High dice", () => {
    expect(diceHandValue(3, 6)).to.equal(6);
    expect(diceHandValue(1, 4)).to.equal(4);
    expect(diceHandValue(3, 1)).to.equal(3);
  });
});
