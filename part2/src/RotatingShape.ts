export class RotatingShape {
  shape: string;
  size: number;

  constructor(shape: string) {
    this.shape = shape;
    this.size = shape.split('\n').length;
  }

  toString() {
    return this.shape + "\n";
  }

  rotateRight(): RotatingShape {
    const rows = this.shape.split("\n");
    let rotated = "";
    for (let i = 0; i < rows[0].length; i++) {
      for (let j = rows.length - 1; j >= 0; j--) {
        rotated += rows[j][i];
      }
      if (i !== rows[0].length - 1) rotated += "\n";
    }
    return new RotatingShape(rotated);
  }

  rotateLeft(): RotatingShape {
    const rows = this.shape.split("\n");
    let rotated = "";
    for (let i = rows[0].length - 1; i >= 0; i--) {
      for (let j = 0; j < rows.length; j++) {
        rotated += rows[j][i];
      }
      if (i !== 0) rotated += "\n";
    }
    return new RotatingShape(rotated);
  }
}
