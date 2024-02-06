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
    return this.shape !== undefined;
  }

  canFall() {
    if (this.shape === undefined) return false;
    const shapeOffset = this.shape instanceof RotatingShape ? 1 : 2;
    if (this.shapeRow + this.shape.size - shapeOffset === this.height - 1) return false;
    let bottomShapeRow = this.shapeRow + this.shape.size;
    if (this.shape instanceof Tetromino) bottomShapeRow -= 1;
    if (bottomShapeRow >= this.height) return true;
    for (let i = this.shapeColumn; i < this.shapeColumn + this.shape.size; i++) {
      if (this.matrix[bottomShapeRow][i] !== ".") return false;
    }
    return true;
  }

  canMoveLeft() {
    if (this.shape === undefined) return false;
    if (this.shapeColumn === 0) return false;
    return true;
  }

  drop(shape: string) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    if (typeof shape === "string") {
      this.shape = new RotatingShape(shape);
    } else {
      this.shape = shape;
    }
    this.shapeRow = 0;
    this.shapeColumn = Math.floor(this.width / 2) - Math.floor(this.shape.size / 2);
    if (this.width % 2 === 0) {
      this.shapeColumn -= 1;
    }
    this.drawShape();
  }

  moveLeft() {
    if (this.canMoveLeft()) {
      this.clearShape();
      this.shapeColumn -= 1;
      this.drawShape();
    }
  }

  moveRight() {
    if (this.shape && this.shapeColumn + this.shape.size > this.width - 1) return;
    this.clearShape();
    this.shapeColumn += 1;
    this.drawShape();
  }

  moveDown() {
    if (this.hasFalling() && this.canFall()) {
      this.clearShape();
      this.shapeRow += 1;
      this.drawShape();
    } else {
      this.shape = undefined;
    }
  }

  tick() {
    this.moveDown();
  }

  drawShape() {
    if (this.shape === undefined) return;
    let matrixReference =
      this.shape instanceof RotatingShape
        ? this.shape.matrix
        : this.shape.orientations[this.shape.currentOrientation].matrix;
    for (let i = 0; i < this.shape.size; i++) {
      if (this.shape instanceof Tetromino && i >= this.shape.size - 1) break;
      if (this.shapeRow + i >= this.height) break;
      for (let j = 0; j < this.shape.size; j++) {
        this.matrix[this.shapeRow + i][this.shapeColumn + j] = matrixReference[i][j];
      }
    }
  }

  clearShape() {
    if (this.shape === undefined) return;
    for (let i = 0; i < this.shape.size; i++) {
      for (let j = 0; j < this.shape.size; j++) {
        this.matrix[this.shapeRow + i][this.shapeColumn + j] = ".";
      }
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
