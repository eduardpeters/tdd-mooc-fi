import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  shape: string;
  orientations: RotatingShape[];
  currentOrientation: number;

  static T_SHAPE = new Tetromino(`.T.\nTTT\n...`, 4);
  static I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`, 2);
  static O_SHAPE = new Tetromino(`.OO\n.OO\n...`, 1);

  constructor(shape: string, orientationCount: number, orientations: RotatingShape[] = [], currentOrientation = 0) {
    this.shape = shape;
    this.orientations = orientations;
    this.currentOrientation = currentOrientation;
    if (this.orientations.length === 0) {
      this.orientations = [new RotatingShape(shape)];
      for (let i = 0; i < orientationCount - 1; i++) {
        this.orientations.push(this.orientations[i].rotateRight());
      }
    }
  }

  rotateRight() {
    const orientationIndex = (this.currentOrientation + 1) % this.orientations.length;
    return new Tetromino(this.shape, this.orientations.length, this.orientations, orientationIndex);
  }

  rotateLeft() {
    const orientationIndex = (this.currentOrientation - 1 + this.orientations.length) % this.orientations.length;
    return new Tetromino(this.shape, this.orientations.length, this.orientations, orientationIndex);
  }

  toString() {
    return this.orientations[this.currentOrientation].toString();
  }
}
