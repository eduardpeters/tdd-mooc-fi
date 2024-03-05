import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";

describe("Untestable 4: enterprise application", () => {
  let service;
  beforeEach(() => {
    service = new PasswordService();
  });

  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  test("change password", async () => {
    const originalUser = {
      userId: 123,
      passwordHash: "old-password",
    };

    service.changePassword(originalUser.userId, "old-password", "new-password");
  });
});
