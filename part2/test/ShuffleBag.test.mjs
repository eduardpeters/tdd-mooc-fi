import { beforeEach, describe, test, expect } from "vitest";
import { Tetromino } from "../src/Tetromino";
import { ShuffleBag } from "../src/ShuffleBag";

describe("Shuffle bag with numbers", () => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let bag;
  beforeEach(() => {
    bag = new ShuffleBag([...values]);
  });

  test("A shufflebag is filled and returns a valid output", () => {
    expect(values.includes(bag.next())).toBe(true);
  });

  test("A full run exhausts all possible numbers", () => {
    let outputs = [];
    for (let i = 0; i < values.length; i++) {
      outputs.push(bag.next());
    }
    outputs.sort((a, b) => a - b);
    expect(outputs).toEqual(values);
  });

  test("Next item after full run is repeated from previous run", () => {
    let outputs = [];
    for (let i = 0; i < values.length; i++) {
      outputs.push(bag.next());
    }
    expect(outputs.includes(bag.next())).toBe(true);
  });
});

describe("Shuffle bag with numbers", () => {
  const values = [
    Tetromino.I_SHAPE,
    Tetromino.J_SHAPE,
    Tetromino.L_SHAPE,
    Tetromino.O_SHAPE,
    Tetromino.S_SHAPE,
    Tetromino.T_SHAPE,
    Tetromino.Z_SHAPE,
  ];
  let bag;
  beforeEach(() => {
    bag = new ShuffleBag([...values]);
  });

  test("A shufflebag is filled and returns a valid output", () => {
    expect(values.includes(bag.next())).toBe(true);
  });

  test("A full run exhausts all possible Tetrominoes", () => {
    let outputs = [];
    for (let i = 0; i < values.length; i++) {
      outputs.push(bag.next());
    }
    expect(outputs.sort()).toEqual(values.sort());
  });

  test("Next item after full run is repeated from previous run", () => {
    let outputs = [];
    for (let i = 0; i < values.length; i++) {
      outputs.push(bag.next());
    }
    expect(outputs.includes(bag.next())).toBe(true);
  });
});
