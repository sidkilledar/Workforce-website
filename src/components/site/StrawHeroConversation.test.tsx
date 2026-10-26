import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  STEP_DELAY_MS,
  StrawHeroConversation,
  heroMessages,
  heroReceipt,
} from "./StrawHeroConversation";

let observerCallback: (entries: { isIntersecting: boolean }[]) => void;
const disconnect = vi.fn();

function setInView(value: boolean) {
  act(() => observerCallback([{ isIntersecting: value }]));
}

function mockMotion(reduced: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation(() => ({
      matches: reduced,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

function revealedStates() {
  const rows = [
    ...heroMessages.map((m) => screen.getByText(m.text).closest("li")!),
    screen.getByText(heroReceipt),
  ];
  return rows.map((row) => row.getAttribute("data-revealed"));
}

function tick(ms = STEP_DELAY_MS) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

function playToEnd() {
  for (let i = 0; i < heroMessages.length; i++) tick();
}

beforeEach(() => {
  vi.useFakeTimers();
  mockMotion(false);
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: typeof observerCallback) {
        observerCallback = cb;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  disconnect.mockClear();
});

describe("StrawHeroConversation", () => {
  it("shows the first message immediately and waits until it is in view", () => {
    render(<StrawHeroConversation />);
    expect(revealedStates()).toEqual(["true", "false", "false", "false"]);
    tick(10_000);
    expect(revealedStates()).toEqual(["true", "false", "false", "false"]);
  });

  it("reveals one step every two seconds, approval before completion", () => {
    render(<StrawHeroConversation />);
    setInView(true);
    tick(1999);
    expect(revealedStates()).toEqual(["true", "false", "false", "false"]);
    tick(1);
    expect(revealedStates()).toEqual(["true", "true", "false", "false"]);
    tick();
    expect(revealedStates()).toEqual(["true", "true", "true", "false"]);
    tick();
    expect(revealedStates()).toEqual(["true", "true", "true", "true"]);
    expect(screen.getByRole("button", { name: "Pause" })).toBeDisabled();
  });

  it("pauses and resumes", () => {
    render(<StrawHeroConversation />);
    setInView(true);
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    tick(10_000);
    expect(revealedStates()).toEqual(["true", "false", "false", "false"]);
    fireEvent.click(screen.getByRole("button", { name: "Resume" }));
    tick();
    expect(revealedStates()).toEqual(["true", "true", "false", "false"]);
  });

  it("stops the timer offscreen and continues when it returns", () => {
    render(<StrawHeroConversation />);
    setInView(true);
    tick();
    setInView(false);
    tick(10_000);
    expect(revealedStates()).toEqual(["true", "true", "false", "false"]);
    setInView(true);
    tick();
    expect(revealedStates()).toEqual(["true", "true", "true", "false"]);
  });

  it("replays from the first message", () => {
    render(<StrawHeroConversation />);
    setInView(true);
    playToEnd();
    expect(revealedStates()).toEqual(["true", "true", "true", "true"]);
    fireEvent.click(screen.getByRole("button", { name: "Replay" }));
    expect(revealedStates()).toEqual(["true", "false", "false", "false"]);
    playToEnd();
    expect(revealedStates()).toEqual(["true", "true", "true", "true"]);
  });

  it("shows the finished exchange and no controls with reduced motion", () => {
    mockMotion(true);
    render(<StrawHeroConversation />);
    expect(revealedStates()).toEqual(["true", "true", "true", "true"]);
    expect(screen.queryByRole("button", { name: "Pause" })).toBeNull();
  });

  it("labels the example and cleans up on unmount", () => {
    const { unmount } = render(<StrawHeroConversation />);
    expect(screen.getByText("Illustrative example · sample data")).toBeInTheDocument();
    expect(
      screen.getByText("Available in the app, iMessage, and WhatsApp"),
    ).toBeInTheDocument();
    setInView(true);
    unmount();
    expect(disconnect).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
});
