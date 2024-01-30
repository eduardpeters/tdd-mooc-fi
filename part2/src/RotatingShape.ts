export class RotatingShape {
  shape: string;

  constructor(shape: string) {
    console.log(shape);
    this.shape = shape;
  }

  toString() {
    return this.shape + "\n";
  }
}
