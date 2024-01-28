export class Board {
  width;
  height;
  matrix;
  shape = "";
  shapeRow = 0;
  shapeColumn = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.matrix = Array(height).fill(Array(width).fill("."));
  }

  hasFalling() {
    return this.shape.length > 0;
  }

  drop(shape: string) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.shape = shape;
    this.shapeRow = 0;
    this.shapeColumn = 1;
  }

  tick() {
    if (this.shapeRow < this.height - 1) {
      this.shapeRow += 1;
    } else {
      this.matrix[this.shapeRow][this.shapeColumn] = this.shape;
      this.shape = "";
    }
  }

  toString(): string {
    let boardString = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.shape.length > 0 && this.shapeRow === i && this.shapeColumn === j) {
          boardString += this.shape;
        } else {
          boardString += this.matrix[i][j];
        }
      }
      boardString += "\n";
    }
    return boardString;
  }
}
