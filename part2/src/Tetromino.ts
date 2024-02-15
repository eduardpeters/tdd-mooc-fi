import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  size: number;
  orientations: RotatingShape[];
  currentOrientation: number;

  // Arika Rotation System hard coding
  static T_SHAPE = new Tetromino([
    new RotatingShape("....\nTTT.\n.T..\n...."),
    new RotatingShape(".T..\nTT..\n.T..\n...."),
    new RotatingShape("....\n.T..\nTTT.\n...."),
    new RotatingShape(".T..\n.TT.\n.T..\n...."),
  ]);
  static L_SHAPE = new Tetromino([
    new RotatingShape("....\nLLL.\nL...\n...."),
    new RotatingShape("LL..\n.L..\n.L..\n...."),
    new RotatingShape("....\n..L.\nLLL.\n...."),
    new RotatingShape(".L..\n.L..\n.LL.\n...."),
  ]);
  static I_SHAPE = new Tetromino([
    new RotatingShape("....\nIIII\n....\n...."),
    new RotatingShape("..I.\n..I.\n..I.\n..I."),
  ]);
  static O_SHAPE = new Tetromino([new RotatingShape("....\n.OO.\n.OO.\n....")]);

  constructor(orientations: RotatingShape[], currentOrientation = 0) {
    this.orientations = orientations;
    this.currentOrientation = currentOrientation;
    this.size = this.orientations[currentOrientation].size;
  }

  rotateRight() {
    const orientationIndex = (this.currentOrientation + 1) % this.orientations.length;
    return new Tetromino(this.orientations, orientationIndex);
  }

  rotateLeft() {
    const orientationIndex = (this.currentOrientation - 1 + this.orientations.length) % this.orientations.length;
    return new Tetromino(this.orientations, orientationIndex);
  }

  toString() {
    return this.orientations[this.currentOrientation].toString();
  }
}
