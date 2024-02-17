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
  for (let i = 0; i < 4; i++) {
    board.moveDown();
  }
}

describe.skip("Rotaring falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test.skip("a falling tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test.skip("a falling tetromino cannot be rotated left if there is no room", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToBottom(board);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test.skip("a falling tetromino cannot be rotated right if there is no room", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToBottom(board);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test.skip("Wall kick when rotating without room in right wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    moveToRight(board);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test.skip("Wall kick when rotating without room in left wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    moveToLeft(board);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });
});
