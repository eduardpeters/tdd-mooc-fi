import { beforeEach, describe, test, expect } from "vitest";
import ScoreSystem from "../src/ScoreSystem";

describe("Score notifications", () => {
  let score;
  beforeEach(() => {
    score = new ScoreSystem();
  });

  test("The score starts empty", () => {
    expect(score.value).to.equal(0);
  });
});
