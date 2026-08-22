import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Header mobile menu", () => {
  it("opens, locks scroll, and closes via the toggle button", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("button", { name: /close menu/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute("aria-expanded", "false");
    });
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on Escape and restores focus to the toggle button", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute("aria-expanded", "false");
    });
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveFocus();
  });

  it("closes when a nav link is selected", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");

    const mobileNav = screen.getByRole("navigation", { name: /mobile/i });
    const [firstLink] = mobileNav.querySelectorAll("a");
    await user.click(firstLink!);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute("aria-expanded", "false");
    });
  });
});
