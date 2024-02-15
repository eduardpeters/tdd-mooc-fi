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

describe.skip("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  test("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeft(board);

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRight(board);

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("it cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("it cannot be moved left through other blocks", () => {
    board.drop(Tetromino.O_SHAPE);
    moveToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    moveToRight(board);
    for (let i = 0; i < 4; i++) {
      board.moveDown();
    }
    moveToLeft(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....OO.T..
       ....OOTTT.`
    );
  });

  test("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.O_SHAPE);
    moveToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    moveToLeft(board);
    for (let i = 0; i < 4; i++) {
      board.moveDown();
    }
    moveToRight(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..T.OO....
       .TTTOO....`
    );
  });
  test("it cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(Tetromino.O_SHAPE);
    moveToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    moveToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....OO....
       ....OO....`
    );
  });
});
