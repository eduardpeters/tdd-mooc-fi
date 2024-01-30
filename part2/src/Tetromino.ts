export class Tetromino {
  shape;
  static T_SHAPE = new Tetromino(`.T.\nTTT\n...`);

  constructor(shape: string) {
    this.shape = shape;
  }

  toString(): string {
    return this.shape + "\n";
  }
}
