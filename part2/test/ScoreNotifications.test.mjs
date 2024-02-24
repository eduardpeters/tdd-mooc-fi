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
    score.update({ linesCleared: 1 });
    expect(score.value).to.equal(40);
  });

  test("Updates the score when notified of two lines cleared", () => {
    score.update({ linesCleared: 2 });
    expect(score.value).to.equal(100);
  });

  test("Updates the score when notified of three lines cleared", () => {
    score.update({ linesCleared: 3 });
    expect(score.value).to.equal(300);
  });

  test("Updates the score when notified of four lines cleared", () => {
    score.update({ linesCleared: 4 });
    expect(score.value).to.equal(1000);
  });
});
