import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  shape: RotatingShape;
  orientations: RotatingShape[];

  static T_SHAPE = new Tetromino(`.T.\nTTT\n...`, 4);
  static I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`, 2);

  constructor(shape: string, orientationCount: number) {
    this.shape = new RotatingShape(shape);
    this.orientations = [];
    for (let c = 0; c < orientationCount; c++) {
      this.orientations.push(this.shape);
      this.shape = this.shape.rotateRight();
    }
  }

  rotateRight() {
    return this.shape.rotateRight();
  }

  rotateLeft() {
    return this.shape.rotateLeft();
  }

  toString() {
    return this.shape.toString();
  }
}
