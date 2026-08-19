import { describe, expect, it } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  it("allows requests under the limit and blocks once exceeded", () => {
    const id = `test-client-${Math.random()}`;

    for (let i = 0; i < 5; i += 1) {
      expect(checkRateLimit(id).allowed).toBe(true);
    }

    const sixth = checkRateLimit(id);
    expect(sixth.allowed).toBe(false);
    expect(sixth.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("tracks separate identifiers independently", () => {
    const a = `client-a-${Math.random()}`;
    const b = `client-b-${Math.random()}`;

    for (let i = 0; i < 5; i += 1) checkRateLimit(a);

    expect(checkRateLimit(a).allowed).toBe(false);
    expect(checkRateLimit(b).allowed).toBe(true);
  });
});
