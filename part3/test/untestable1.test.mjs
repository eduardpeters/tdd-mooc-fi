import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("Returns correct number of days from Christmas itself", () => {
    // TODO: write proper tests
    expect(daysUntilChristmas(new Date("2024-12-25"))).to.equal(0);
  });

  test("Returns correct number of days on Christmas Eve", () => {
    expect(daysUntilChristmas(new Date("2023-12-24"))).to.equal(1);
  });

  test("Returns correct number of days on New Year", () => {
    expect(daysUntilChristmas(new Date("2024-01-01"))).to.equal(359);
  });

  test("Returns correct number of days the day after Christmas", () => {
    expect(daysUntilChristmas(new Date("2023-12-26"))).to.equal(365);
  });
});
