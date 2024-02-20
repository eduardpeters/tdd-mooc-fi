import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.ts";
import { Tetromino } from "../src/Tetromino.ts";

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
    board = new Board(10, 6);
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
