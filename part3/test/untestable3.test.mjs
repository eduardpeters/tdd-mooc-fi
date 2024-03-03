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
});
