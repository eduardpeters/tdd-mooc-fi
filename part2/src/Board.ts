import { RotatingShape } from "./RotatingShape";
import ScoreSystem from "./ScoreSystem";
import { Tetromino } from "./Tetromino";

export class Board {
  width;
  height;
  matrix;
  shape: Tetromino | RotatingShape | undefined;
  shapeRow = 0;
  shapeColumn = 0;
  score: ScoreSystem | undefined;

  constructor(width: number, height: number, scoreInstance: ScoreSystem) {
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
    this.score = scoreInstance;
  }

  hasFalling() {
    return this.shape !== undefined;
  }

  canFall() {
    if (this.shape === undefined) return false;
    const startShapeColumn = this.shapeColumn + this.getLeftmostColumn();
    const finalShapeColumn = this.shapeColumn + this.getRightmostColumn();
    const bottomShapeRow = this.shapeRow + this.getBottomRow();
    if (bottomShapeRow + 1 === this.height) return false;
    for (let i = startShapeColumn; i <= finalShapeColumn; i++) {
      if (i >= this.width) continue;
      if (this.matrix[bottomShapeRow + 1][i] !== ".") return false;
    }
    return true;
  }

  canMoveLeft() {
    if (this.shape === undefined) return false;
    const leftmostColumn = this.getLeftmostColumn();
    if (this.shapeColumn + leftmostColumn - 1 < 0) return false;
    const bottomShapeRow = this.shapeRow + this.getBottomRow();
    for (let i = this.shapeRow; i < bottomShapeRow; i++) {
      if (i < 0) continue;
      if (this.matrix[i][this.shapeColumn + leftmostColumn - 1] !== ".") return false;
    }
    return true;
  }

  canMoveRight() {
    if (this.shape === undefined) return false;
    const rightmostColumn = this.getRightmostColumn();
    if (this.shapeColumn + rightmostColumn + 1 === this.width) return false;
    const bottomShapeRow = this.shapeRow + this.getBottomRow();
    for (let i = this.shapeRow; i < bottomShapeRow; i++) {
      if (i < 0) continue;
      if (this.matrix[i][this.shapeColumn + rightmostColumn + 1] !== ".") return false;
    }
    return true;
  }

  getLeftmostColumn() {
    if (this.shape === undefined) return 0;
    let leftmostColumn = 0;
    if (this.shape instanceof Tetromino) {
      for (leftmostColumn; leftmostColumn < this.shape.size; leftmostColumn++) {
        for (let j = 0; j < this.shape.size; j++) {
          if (this.shape.orientations[this.shape.currentOrientation].matrix[j][leftmostColumn] !== ".") {
            return leftmostColumn;
          }
        }
      }
    }
    return leftmostColumn;
  }

  getRightmostColumn() {
    if (this.shape === undefined) return 0;
    let rightmostColumn = this.shape.size - 1;
    if (this.shape instanceof Tetromino) {
      for (rightmostColumn; rightmostColumn >= 0; rightmostColumn--) {
        for (let j = 0; j < this.shape.size; j++) {
          if (this.shape.orientations[this.shape.currentOrientation].matrix[j][rightmostColumn] !== ".") {
            return rightmostColumn;
          }
        }
      }
    }
    return rightmostColumn;
  }

  getBottomRow() {
    if (this.shape === undefined) return 0;
    let bottomShapeRow = this.shape.size - 1;
    if (this.shape instanceof Tetromino) {
      for (bottomShapeRow; bottomShapeRow >= 0; bottomShapeRow--) {
        for (let j = 0; j < this.shape.size; j++) {
          if (this.shape.orientations[this.shape.currentOrientation].matrix[bottomShapeRow][j] !== ".") {
            return bottomShapeRow;
          }
        }
      }
    }
    return bottomShapeRow;
  }

  canRotateLeft() {
    if (this.shape === undefined) return false;
    if (this.shape instanceof Tetromino) {
      const rotated = this.shape.rotateLeft();
      return !this.shapeCollides(rotated);
    }
    return true;
  }

  canRotateRight() {
    if (this.shape === undefined) return false;
    if (this.shape instanceof Tetromino) {
      const rotated = this.shape.rotateRight();
      return !this.shapeCollides(rotated);
    }
    return true;
  }

  shapeCollides(rotated: Tetromino) {
    for (let i = 0; i < rotated.size; i++) {
      for (let j = 0; j < rotated.size; j++) {
        if (rotated.orientations[rotated.currentOrientation].matrix[i][j] === ".") continue;
        if (
          this.shapeRow + i < 0 ||
          this.shapeRow + i >= this.height ||
          this.shapeColumn + j < 0 ||
          this.shapeColumn + j >= this.width
        )
          return true;
        if (this.matrix[this.shapeRow + i][this.shapeColumn + j] !== ".") {
          if (!this.isSameShapeCollision(i, j)) return true;
        }
      }
    }
    return false;
  }

  isSameShapeCollision(rowOffset: number, columnOffset: number) {
    if (this.shape instanceof Tetromino) {
      return this.shape.orientations[this.shape.currentOrientation].matrix[rowOffset][columnOffset] !== ".";
    }
    return true;
  }

  drop(shape: string | Tetromino) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    if (typeof shape === "string") {
      this.shape = new RotatingShape(shape);
    } else {
      this.shape = shape;
    }
    this.shapeRow = this.shape instanceof Tetromino ? -1 : 0;
    this.shapeColumn = Math.floor(this.width / 2) - Math.floor(this.shape.size / 2);
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
    if (this.canMoveRight()) {
      this.clearShape();
      this.shapeColumn += 1;
      this.drawShape();
    }
  }

  moveDown() {
    if (this.hasFalling() && this.canFall()) {
      this.clearShape();
      this.shapeRow += 1;
      this.drawShape();
    } else {
      this.shape = undefined;
      this.clearLines();
    }
  }

  rotateLeft() {
    if (this.shape instanceof Tetromino) {
      if (this.canRotateLeft()) {
        this.clearShape();
        this.shape = this.shape.rotateLeft();
        this.drawShape();
      } else if (this.canMoveRight()) {
        this.moveRight();
        if (this.canRotateLeft()) {
          this.rotateLeft();
        } else {
          this.moveLeft();
        }
      }
    }
  }

  rotateRight() {
    if (this.shape instanceof Tetromino) {
      if (this.canRotateRight()) {
        this.clearShape();
        this.shape = this.shape.rotateRight();
        this.drawShape();
      } else if (this.canMoveLeft()) {
        this.moveLeft();
        if (this.canRotateRight()) {
          this.rotateRight();
        } else {
          this.moveRight();
        }
      }
    }
  }

  tick() {
    this.moveDown();
  }

  clearLines() {
    if (this.shape === undefined) {
      let rowsToClear = [];
      for (let i = 0; i < this.height; i++) {
        if (this.matrix[i].every((value) => value !== ".")) {
          rowsToClear.push(i);
        }
      }
      for (let i = 0; i < rowsToClear.length; i++) {
        this.matrix.splice(rowsToClear[i], 1);
        this.matrix.unshift(Array(this.width).fill("."));
      }
      if (this.score !== undefined) {
        this.score.update({ linesCleared: rowsToClear.length });
      }
    }
  }

  drawShape() {
    if (this.shape === undefined) return;
    let matrixReference =
      this.shape instanceof RotatingShape
        ? this.shape.matrix
        : this.shape.orientations[this.shape.currentOrientation].matrix;
    for (let i = 0; i < this.shape.size; i++) {
      for (let j = 0; j < this.shape.size; j++) {
        if (matrixReference[i][j] !== ".") {
          this.matrix[this.shapeRow + i][this.shapeColumn + j] = matrixReference[i][j];
        }
      }
    }
  }

  clearShape() {
    if (this.shape === undefined) return;
    let matrixReference =
      this.shape instanceof RotatingShape
        ? this.shape.matrix
        : this.shape.orientations[this.shape.currentOrientation].matrix;
    for (let i = 0; i < this.shape.size; i++) {
      if (this.shapeRow + i === this.height) break;
      for (let j = 0; j < this.shape.size; j++) {
        if (
          this.shapeRow + i < 0 ||
          this.shapeRow + i >= this.height ||
          this.shapeColumn + j < 0 ||
          this.shapeColumn + j >= this.width
        )
          continue;
        if (matrixReference[i][j] !== ".") {
          this.matrix[this.shapeRow + i][this.shapeColumn + j] = ".";
        }
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
