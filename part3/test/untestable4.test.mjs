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

describe("Password hasher", () => {
  const userId = 123;
  let users;
  let hasher;
  let service;
  beforeEach(() => {
    users = new PostgresUserDao();
    hasher = new PasswordHasher();
    service = new PasswordService();
  });

  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  test("Password can be changed", async () => {
    const originalUser = {
      userId,
      passwordHash: hasher.hashPassword("old-password"),
    };

    await users.save(originalUser);

    await service.changePassword(userId, "old-password", "new-password");

    const newUser = await users.getById(userId);

    expect(newUser.passwordHash).to.not.equal(originalUser.passwordHash);
    expect(hasher.verifyPassword(newUser.passwordHash, "new-password")).to.be.true;
  });
});
