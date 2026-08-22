import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImplementationControl } from "@/components/site/ImplementationControl";
import { implementationControl } from "@/lib/site-config";

describe("ImplementationControl (FAQ)", () => {
  it("renders every question as a native, keyboard-operable disclosure", () => {
    render(<ImplementationControl />);
    for (const topic of implementationControl) {
      const summary = screen.getByText(topic.question).closest("summary");
      expect(summary).toBeInTheDocument();
      expect(summary?.closest("details")).not.toHaveAttribute("open");
    }
  });

  it("opens an answer via the native summary toggle, with no React state involved", async () => {
    const user = userEvent.setup();
    render(<ImplementationControl />);

    const firstQuestion = implementationControl[0]!.question;
    const summary = screen.getByText(firstQuestion).closest("summary")!;
    const details = summary.closest("details")!;

    expect(details).not.toHaveAttribute("open");
    // <summary> is natively keyboard-focusable/operable per the HTML spec —
    // this component adds no tabIndex or key handler of its own.
    expect(summary).not.toHaveAttribute("tabindex");

    // Native <details>/<summary> toggles via the browser's own semantics
    // on click — no React state drives `open`, so this exercises the
    // no-JS-equivalent behavior directly.
    await user.click(summary);

    expect(details).toHaveAttribute("open");
    expect(screen.getByText(implementationControl[0]!.answer)).toBeVisible();
  });
});
