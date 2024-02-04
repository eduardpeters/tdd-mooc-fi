export class RotatingShape {
  shape: string;
  size: number;
  matrix: string[][];

  constructor(shape: string) {
    this.shape = shape;
    const newMatrix: string[][] = [];
    const rows = shape.split("\n");
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
    let shape = '';
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        shape += this.matrix[i][j];
      }
      shape += '\n';
    }
    return shape;
  }

  rotateRight(): RotatingShape {
    let rotated = "";
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = this.matrix.length - 1; j >= 0; j--) {
        rotated += this.matrix[j][i];
      }
      if (i !== this.matrix.length - 1) rotated += "\n";
    }
    return new RotatingShape(rotated);
  }

  rotateLeft(): RotatingShape {
    let rotated = "";
    for (let i = this.matrix.length - 1; i >= 0; i--) {
      for (let j = 0; j < this.matrix.length; j++) {
        rotated += this.matrix[j][i];
      }
      if (i !== 0) rotated += "\n";
    }
    return new RotatingShape(rotated);
  }
}
