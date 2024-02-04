export class RotatingShape {
  shape: string;
  size: number;
  matrix: string[][];

  constructor(shape: string) {
    this.shape = shape;
    const newMatrix: string[][] = [];
    const rows = this.shape.split("\n");
    for (let i = 0; i < rows.length; i++) {
      newMatrix.push([]);
      const chars = rows[i].split('');
      for (let j = 0; j < chars.length; j++) {
        newMatrix[i].push(chars[j]);
      }
    } 
    this.matrix = newMatrix;
    this.size = newMatrix.length;
  }

  toString() {
    return this.shape + "\n";
  }

  rotateRight(): RotatingShape {
    let rotated = "";
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = this.matrix[i].length - 1; j >= 0; j--) {
        rotated += this.matrix[j][i];
      }
      if (i !== this.matrix.length - 1) rotated += "\n";
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
