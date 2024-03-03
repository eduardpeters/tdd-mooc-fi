import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("Rolls lie between 1 and 6", () => {
    const rolls = new Set();
    for (let i = 0; i < 100; i++) {
      rolls.add(diceRoll());
    }
    expect(rolls.size).to.equal(6);
    expect(rolls).to.have.all.keys([1, 2, 3, 4, 5, 6]);
  });

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
