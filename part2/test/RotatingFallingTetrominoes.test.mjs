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
  for (let i = 0; i < 5; i++) {
    board.moveDown();
  }
}

describe("Rotating falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino cannot be rotated left if there is no room", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToBottom(board);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ...IIII...`
    );
  });

  test("a falling tetromino cannot be rotated right if there is no room", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToBottom(board);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ...IIII...`
    );
  });

  test("Wall kick when rotating without room in right wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    moveToRight(board);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Wall kick when rotating without room in left wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    moveToLeft(board);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  });
});
