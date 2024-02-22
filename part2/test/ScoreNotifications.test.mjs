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

  test("Updates the score when notified of a line cleared", () => {
    score.linesCleared(1);
    expect(score.value).to.equal(40);
  });
});
