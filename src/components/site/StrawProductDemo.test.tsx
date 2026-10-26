import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrawProductDemo } from "./StrawProductDemo";

describe("explorer", () => {
  it("switches workflows and preserves the workflow across channel changes", async () => {
    const user = userEvent.setup();
    render(<StrawProductDemo variant="explorer" />);
    await user.click(screen.getByRole("tab", { name: "Inventory" }));
    expect(screen.getByRole("tab", { name: "Inventory" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByText("Checked 42 tracked items against your thresholds."),
    ).toBeVisible();

    await user.click(screen.getByRole("button", { name: "WhatsApp" }));
    expect(screen.getByRole("button", { name: "WhatsApp" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Inventory" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByText("Checked 42 tracked items against your thresholds."),
    ).toBeVisible();
  });

  it("supports arrow-key navigation between tabs", async () => {
    const user = userEvent.setup();
    render(<StrawProductDemo variant="explorer" />);
    screen.getByRole("tab", { name: "Scheduling" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Communication" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Communication" })).toHaveFocus();
  });

  it("starts on the requested initial workflow", () => {
    render(<StrawProductDemo variant="explorer" initialWorkflow="tasks" />);
    expect(screen.getByRole("tab", { name: "Tasks" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("requires approval before the schedule is published", async () => {
    const user = userEvent.setup();
    render(<StrawProductDemo variant="explorer" />);
    expect(screen.getByText("Draft · not published")).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Publish to team" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Approve schedule" }));
    expect(screen.getByText("Approved by manager")).toBeVisible();
    expect(screen.queryByText("Published to team")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Publish to team" }));
    expect(screen.getByText("Published to team")).toBeVisible();
  });

  it("does not assign anyone in communication until the manager approves", async () => {
    const user = userEvent.setup();
    render(<StrawProductDemo variant="explorer" initialWorkflow="communication" />);
    await user.click(screen.getByRole("button", { name: "Contact eligible people" }));
    await user.click(screen.getByRole("button", { name: "Show reply" }));
    expect(screen.getByText("Accepted · not yet assigned")).toBeVisible();
    expect(screen.queryByText("Confirmed")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Approve Jordan" }));
    expect(screen.queryByText("Confirmed")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm assignment" }));
    expect(screen.getByText("Confirmed")).toBeVisible();
  });

  it("resets stage and rule state when the workflow changes", async () => {
    const user = userEvent.setup();
    render(<StrawProductDemo variant="explorer" />);
    await user.click(screen.getByRole("button", { name: "Approve schedule" }));
    await user.click(screen.getByRole("button", { name: /Send:/ }));
    expect(screen.getByRole("button", { name: "Confirm and save rule" })).toBeVisible();

    await user.click(screen.getByRole("tab", { name: "Tasks" }));
    await user.click(screen.getByRole("tab", { name: "Scheduling" }));
    expect(screen.getByText("Draft · not published")).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Confirm and save rule" }),
    ).not.toBeInTheDocument();
  });

  it("saves a rule only after explicit confirmation", async () => {
    const user = userEvent.setup();
    render(<StrawProductDemo variant="explorer" />);
    await user.click(
      screen.getByRole("button", {
        name: "Send: “Always schedule two supervisors on Fridays”",
      }),
    );
    expect(screen.getByText(/Save this as a rule\?/)).toBeVisible();
    expect(screen.queryByText("Rule saved")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm and save rule" }));
    expect(screen.getByText("Rule saved")).toBeVisible();
    expect(
      within(screen.getByRole("list", { name: "Saved rules" })).getByText(
        "Always schedule two supervisors on Fridays",
      ),
    ).toBeVisible();
  });

  it("resets the example back to its first stage", async () => {
    const user = userEvent.setup();
    render(<StrawProductDemo variant="explorer" initialWorkflow="forecasting" />);
    await user.click(screen.getByRole("button", { name: "Recommend coverage" }));
    expect(screen.getByText("Recommendation · needs review")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Reset example" }));
    expect(screen.getByText("Forecast ready")).toBeVisible();
  });
});

describe("hero", () => {
  // vitest.setup.ts stubs these globally; restore them rather than unstub.
  const originalObserver = globalThis.IntersectionObserver;
  const originalMatchMedia = window.matchMedia;
  afterEach(() => {
    vi.useRealTimers();
    vi.stubGlobal("IntersectionObserver", originalObserver);
    vi.stubGlobal("matchMedia", originalMatchMedia);
  });

  function stubObserver() {
    const callbacks: IntersectionObserverCallback[] = [];
    class Observer {
      constructor(cb: IntersectionObserverCallback) {
        callbacks.push(cb);
      }
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }
    vi.stubGlobal("IntersectionObserver", Observer);
    return () =>
      act(() => {
        callbacks.forEach((cb) =>
          cb([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver),
        );
      });
  }

  it("plays once when visible, never skipping manager approval, and replays", () => {
    vi.useFakeTimers();
    const reveal = stubObserver();
    render(<StrawProductDemo variant="hero" />);
    expect(screen.getByText("Illustrative example · sample data")).toBeVisible();
    expect(screen.getByText("Draft · not published")).toBeVisible();

    // Nothing advances until the demo is visible.
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText("Draft · not published")).toBeVisible();

    reveal();
    act(() => {
      vi.advanceTimersByTime(1800);
    });
    expect(screen.getByText("Approved by manager")).toBeVisible();
    expect(screen.queryByText("Published to team")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1800);
    });
    expect(screen.getByText("Published to team")).toBeVisible();

    // Stays finished; does not loop.
    act(() => {
      vi.advanceTimersByTime(20000);
    });
    expect(screen.getByText("Published to team")).toBeVisible();

    act(() => {
      screen.getByRole("button", { name: "Replay" }).click();
    });
    expect(screen.getByText("Draft · not published")).toBeVisible();
  });

  it("pauses playback", () => {
    vi.useFakeTimers();
    const reveal = stubObserver();
    render(<StrawProductDemo variant="hero" />);
    reveal();
    act(() => {
      screen.getByRole("button", { name: "Pause" }).click();
    });
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByText("Draft · not published")).toBeVisible();
    expect(screen.getByRole("button", { name: "Play" })).toBeVisible();
  });

  it("shows the completed state without controls under reduced motion", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("reduce"),
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      })),
    );
    render(<StrawProductDemo variant="hero" />);
    expect(screen.getByText("Published to team")).toBeVisible();
    expect(screen.queryByRole("button", { name: "Replay" })).not.toBeInTheDocument();
    expect(
      screen.getByText(/Automatic publishing is available when configured/),
    ).toBeVisible();
  });
});
