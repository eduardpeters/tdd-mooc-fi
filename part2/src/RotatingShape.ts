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
    let rotated = `${rows[0][2]}${rows[1][2]}${rows[2][2]}\n`;
    rotated += `${rows[0][1]}${rows[1][1]}${rows[2][1]}\n`;
    rotated += `${rows[0][0]}${rows[1][0]}${rows[2][0]}`;
    return new RotatingShape(rotated);
  }
}
