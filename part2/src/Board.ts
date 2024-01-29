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
    return this.shape.length > 0;
  }

  drop(shape: string) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.shape = shape;
    this.shapeRow = 0;
    this.shapeColumn = 1;
    this.matrix[this.shapeRow][this.shapeColumn] = this.shape;
  }

  tick() {
    if (this.shapeRow < this.height - 1 && this.matrix[this.shapeRow + 1][this.shapeColumn] === ".") {
      this.matrix[this.shapeRow][this.shapeColumn] = ".";
      this.shapeRow += 1;
      this.matrix[this.shapeRow][this.shapeColumn] = this.shape;
    } else {
      this.shape = "";
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