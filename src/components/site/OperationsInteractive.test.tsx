import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CommunicationExample,
  ConfigurationExample,
  IntelligencePanel,
  InventoryPanel,
  ModuleFrame,
  TaskPanel,
  WorkflowDemonstration,
} from "./OperationsInteractive";

describe("coverage walkthrough", () => {
  it("requires explicit approval before assignment and resets on replay", async () => {
    const user = userEvent.setup();
    render(<WorkflowDemonstration />);
    const steps = screen.getByRole("navigation", { name: "Workflow steps" });
    expect(
      within(steps).getByRole("button", { name: /confirm completion/i }),
    ).toBeDisabled();
    await user.click(
      within(steps).getByRole("button", { name: /record response/i }),
    );
    expect(screen.getByText("Not yet assigned")).toBeVisible();
    await user.click(screen.getByRole("button", { name: /^next/i }));
    expect(screen.getByRole("button", { name: /^next/i })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: /approve coverage/i }));
    expect(
      screen.getByText("Jordan assigned to the closing shift"),
    ).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Replay" }));
    expect(
      screen.queryByText("Jordan assigned to the closing shift"),
    ).not.toBeInTheDocument();
    expect(
      within(steps).getByRole("button", { name: /confirm completion/i }),
    ).toBeDisabled();
  });
  it("escalates an exception without assigning anyone", async () => {
    const user = userEvent.setup();
    render(<WorkflowDemonstration />);
    await user.click(screen.getByRole("button", { name: "View exception" }));
    expect(screen.getByText("Unassigned")).toBeVisible();
    expect(screen.getByText("Operations lead")).toBeVisible();
    expect(screen.getByRole("button", { name: /^next/i })).toBeDisabled();
    expect(
      screen.queryByRole("button", { name: /approve coverage/i }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Replay" }));
    expect(
      screen.getByText("A call-out becomes an open record."),
    ).toBeVisible();
  });
});
describe("operational communication", () => {
  it("makes acceptance approval-ready and handles a decline separately", async () => {
    const user = userEvent.setup();
    render(<CommunicationExample />);
    await user.click(screen.getByRole("button", { name: "I can cover" }));
    expect(screen.getByText("Accepted, not assigned")).toBeVisible();
    expect(screen.getByText("Approval ready")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Can’t cover" }));
    expect(screen.getByText("Review other coverage")).toBeVisible();
    expect(screen.queryByText("Approval ready")).not.toBeInTheDocument();
  });
});
describe("configured setup", () => {
  it("updates rules for the selected operating context", async () => {
    const user = userEvent.setup();
    render(<ConfigurationExample />);
    await user.click(screen.getByRole("button", { name: "Campus recreation" }));
    expect(screen.getByText("Qualified facility supervisor")).toBeVisible();
    expect(screen.getByText("Program coordinator")).toBeVisible();
    expect(screen.getByText("30 minutes")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Restaurant team" }));
    expect(screen.getByText("15 minutes")).toBeVisible();
  });
});
describe("AI permission control", () => {
  it("switches the resulting behavior for each permission mode", async () => {
    const user = userEvent.setup();
    render(<IntelligencePanel />);
    expect(
      screen.getByRole("button", { name: "Require approval" }),
    ).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Suggest only" }));
    expect(
      screen.getByText(
        "WorkforceOS suggests the assignment. A manager makes the change.",
      ),
    ).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Run within approved rules" }),
    );
    expect(
      screen.getByText(
        "WorkforceOS completes the assignment within rules approved during setup and records the action.",
      ),
    ).toBeVisible();
  });
});
describe("inventory and task panels", () => {
  it("renders the stock risk and forecast comparison", () => {
    render(<InventoryPanel />);
    expect(screen.getByText("Below threshold by 6 PM")).toBeVisible();
    expect(screen.getByText("Required coverage")).toBeVisible();
  });
  it("renders the overdue task with its escalation", () => {
    render(<TaskPanel />);
    expect(screen.getByText("Overdue")).toBeVisible();
    expect(
      screen.getByText("Escalated to the recreation duty manager."),
    ).toBeVisible();
  });
});
describe("module frame", () => {
  it("defaults to scheduling and switches panels on tab click", async () => {
    const user = userEvent.setup();
    render(<ModuleFrame />);
    const tabs = screen.getByRole("tablist", { name: "Product modules" });
    expect(
      within(tabs).getByRole("tab", { name: "Scheduling" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("navigation", { name: "Workflow steps" }),
    ).toBeVisible();
    await user.click(within(tabs).getByRole("tab", { name: "Inventory" }));
    expect(
      within(tabs).getByRole("tab", { name: "Inventory" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Below threshold by 6 PM")).toBeVisible();
    expect(
      screen.queryByRole("navigation", { name: "Workflow steps" }),
    ).not.toBeInTheDocument();
  });
  it("moves between tabs with arrow keys", async () => {
    const user = userEvent.setup();
    render(<ModuleFrame />);
    const tabs = screen.getByRole("tablist", { name: "Product modules" });
    within(tabs).getByRole("tab", { name: "Scheduling" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(
      within(tabs).getByRole("tab", { name: "Communication" }),
    ).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowLeft}");
    expect(
      within(tabs).getByRole("tab", { name: "Scheduling" }),
    ).toHaveAttribute("aria-selected", "true");
  });
});
