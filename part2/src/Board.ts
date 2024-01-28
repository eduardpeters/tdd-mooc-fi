export class Board {
  width;
  height;
  shape = "";
  shapeRow = 0;
  shapeColumn = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
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
    this.shapeRow += 1;
  }

  toString(): string {
    let boardString = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.shape.length > 0 && this.shapeRow === i && this.shapeColumn === j) {
          boardString += this.shape;
          continue;
        }
        boardString += ".";
      }
      boardString += "\n";
    }
    return boardString;
  }
}
