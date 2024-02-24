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

function moveToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

describe("Line clears", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6, new ScoreSystem());
  });

  test("A filled line at bottom is cleared", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeft(board);
    moveToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    moveToRight(board);
    moveToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    moveToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ....OO....`
    );
  });
});
