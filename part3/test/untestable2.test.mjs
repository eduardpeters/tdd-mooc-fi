import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("One Pair", () => {
    expect(diceHandValue(3, 3)).to.equal(103);
  });

  test("High dice", () => {
    expect(diceHandValue(3, 6)).to.equal(6);
  });
});
