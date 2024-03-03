import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv, readUtf8File } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  test("files can be read", async () => {
    const content = await readUtf8File("./test/dummy.txt");
    expect(content).to.equal("for testing purposes\n");
  });

  describe("CSV Parsing", () => {
    test("Parses name", () => {
      const person = parsePeopleCsv("Yor,Forger,27,Female")[0];
      expect(person.firstName).to.equal("Yor");
      expect(person.lastName).to.equal("Forger");
    });

    test("Parses age", () => {
      let person = parsePeopleCsv("Yor,Forger,27,Female")[0];
      expect(person.age).to.equal(27);
      person = parsePeopleCsv("Yor,Forger,,Female")[0];
      expect(person.age, "age is optional").to.be.undefined;
    });

    test("Parses gender", () => {
      let person = parsePeopleCsv("a,b,3,Female")[0];
      expect(person.gender).to.equal("f");
      person = parsePeopleCsv("a,b,3,Male")[0];
      expect(person.gender).to.equal("m");
      person = parsePeopleCsv("a,b,3,female")[0];
      expect(person.gender, "gender is case-insensitive").to.equal("f");
    });

    test("Skips empty lines", () => {
      const input = `
      A,B,3,male

      D,E,6,Female
      `;
      const persons = parsePeopleCsv(input);
      expect(persons).to.deep.equal([
        { firstName: "A", lastName: "B", age: 3, gender: "m" },
        { firstName: "D", lastName: "E", age: 6, gender: "f" },
      ]);
    });
  });
});
