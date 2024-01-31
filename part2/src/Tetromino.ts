import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  shape: RotatingShape;

  static T_SHAPE = new Tetromino(`.T.\nTTT\n...`);
  static I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`);

  constructor(shape: string) {
    this.shape = new RotatingShape(shape);
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
