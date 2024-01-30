export class RotatingShape {
  shape: string;

  constructor(shape: string) {
    this.shape = shape;
  }

  toString() {
    return this.shape + "\n";
  }

  rotateRight(): RotatingShape {
    const rows = this.shape.split("\n");
    let rotated = `${rows[2][0]}${rows[1][0]}${rows[0][0]}\n`;
    rotated += `${rows[2][1]}${rows[1][1]}${rows[0][1]}\n`;
    rotated += `${rows[2][2]}${rows[1][2]}${rows[0][2]}`;
    return new RotatingShape(rotated);
  }
}
