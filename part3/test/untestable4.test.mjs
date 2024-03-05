import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordHasher, PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import { expect } from "chai";

describe("Password hasher", () => {
  let hasher;
  beforeEach(() => {
    hasher = new PasswordHasher();
  });

  test("A password is hashed", () => {
    const plainText = "hey-there";
    const hash = hasher.hashPassword(plainText);
    expect(hash).not.to.equal(plainText);
  });

  test("A valid hash is verified", () => {
    const plainText = "hey-there";
    const hash = hasher.hashPassword(plainText);
    expect(hasher.verifyPassword(hash, plainText)).to.be.true;
  });

  test("An incorrect hash is rejected", () => {
    const plainText = "hey-there";
    const hash = hasher.hashPassword(plainText);
    expect(hasher.verifyPassword(hash, "hello-there")).to.be.false;
  });
});

describe("Untestable 4: enterprise application", () => {
  let service;
  beforeEach(() => {
    service = new PasswordService();
  });

  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  test("test", async () => {
    // pending
  });
});
