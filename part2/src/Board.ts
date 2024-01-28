export class Board {
  width;
  height;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drop(shape: string) {
    return;
  }

  toString(): string {
    let boardString = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        boardString += ".";
      }
      boardString += "\n";
    }
    return boardString;
  }
}
