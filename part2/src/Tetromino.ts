import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  orientations: RotatingShape[];
  currentOrientation: number;

  static T_SHAPE = new Tetromino(`.T.\nTTT\n...`, 4);
  static I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`, 2);

  constructor(shape: string, orientationCount: number) {
    this.orientations = [new RotatingShape(shape)];
    this.currentOrientation = 0;
    for (let i = 1; i < orientationCount; i++) {
      this.orientations.push(this.orientations[i]);
    }
  }

  rotateRight() {
    return this.orientations[this.currentOrientation].rotateRight();
  }

  rotateLeft() {
    return this.orientations[this.currentOrientation].rotateLeft();
  }

  toString() {
    return this.orientations[this.currentOrientation].toString();
  }
}
