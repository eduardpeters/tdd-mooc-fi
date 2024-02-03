import { RotatingShape } from "./RotatingShape";
import { Tetromino } from "./Tetromino";

export class Board {
  width;
  height;
  matrix;
  shape: Tetromino | RotatingShape | undefined;
  shapeRow = 0;
  shapeColumn = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.matrix = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push(".");
      }
      this.matrix.push(row);
    }
  }

  hasFalling() {
    if (this.shape !== undefined) {
      return this.shape.shape.length > 0;
    }
    return false;
  }

  canFall() {
    return this.shapeRow < this.height - 1 && this.matrix[this.shapeRow + 1][this.shapeColumn] === ".";
  }

  drop(shape: string) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    if (typeof shape === 'string') {
      this.shape = new RotatingShape(shape);
    } else {
    this.shape = shape;
    }
    this.shapeRow = 0;
    this.shapeColumn = 1;
    console.log(this.shape.size);
    this.matrix[this.shapeRow][this.shapeColumn] = this.shape.shape;
  }

  tick() {
    if (this.hasFalling() && this.canFall()) {
      this.matrix[this.shapeRow][this.shapeColumn] = ".";
      this.shapeRow += 1;
      this.matrix[this.shapeRow][this.shapeColumn] = this.shape.shape;
    } else {
      this.shape = undefined;
    }
  }

  toString(): string {
    let boardString = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        boardString += this.matrix[i][j];
      }
      boardString += "\n";
    }
    return boardString;
  }
}
