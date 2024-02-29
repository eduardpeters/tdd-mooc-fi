import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("Returns correct number of days from Christmas itself", () => {
    // TODO: write proper tests
    expect(daysUntilChristmas(new Date("2024-12-25"))).to.equal(0);
  });
});
