import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Header links", () => {
  it("renders Straw nav, demo CTA, and no Log in without appUrl", () => {
    render(<Header />);
    const primary = screen.getByRole("navigation", { name: /primary/i });
    expect(
      Array.from(primary.querySelectorAll("a")).map((a) => [
        a.textContent,
        a.getAttribute("href"),
      ]),
    ).toEqual([
      ["Product", "#product"],
      ["Industries", "#industries"],
      ["How it works", "#how-it-works"],
    ]);
    expect(screen.getByText("Straw")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Book a personalized demo" })[0],
    ).toHaveAttribute("href", "/demo");
    expect(screen.queryByRole("link", { name: /log in/i })).toBeNull();
  });

  it("renders Log in only when appUrl is supplied", () => {
    render(<Header appUrl="https://app.example.test" />);
    const links = screen.getAllByRole("link", { name: "Log in" });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "https://app.example.test");
    }
  });
});

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
