import { beforeEach, describe, test, expect } from "vitest";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import ScoreSystem from "../src/ScoreSystem";

function moveToLeft(board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

function moveToRight(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

function moveToBottom(board, useTick = false) {
  for (let i = 0; i < 10; i++) {
    if (useTick) {
      board.tick();
    } else {
      board.moveDown();
    }
  }
}

describe("Board scoring", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6, new ScoreSystem());
  });

  test("A single line cleared updates the score", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeft(board);
    moveToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    moveToRight(board);
    moveToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    moveToBottom(board, true);

    expect(board.score.value).to.equal(40);
  });

  test("A single line cleared with soft drops updates the score", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeft(board);
    moveToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    moveToRight(board);
    moveToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    moveToBottom(board);

    expect(board.score.value).to.equal(44);
  });
});
