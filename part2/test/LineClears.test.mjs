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

  test("A filled line not at bottom is cleared", () => {
    board.drop(Tetromino.O_SHAPE);
    moveToLeft(board);
    moveToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    moveToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    moveToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    moveToRight(board);
    moveToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    moveToLeft(board);
    moveToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    moveToRight(board);
    moveToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....OO....
       OO..OO..OO
       OO..OO..OO`
    );
  });

  test("Two filled lines at bottom are cleared", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeft(board);
    moveToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    moveToRight(board);
    moveToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    moveToLeft(board);
    moveToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    moveToRight(board);
    moveToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 5; i++) {
      board.moveDown();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });
});
