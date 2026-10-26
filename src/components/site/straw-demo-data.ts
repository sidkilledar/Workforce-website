export type StrawWorkflowId =
  | "scheduling"
  | "communication"
  | "inventory"
  | "forecasting"
  | "tasks";

export type StrawChannel = "app" | "imessage" | "whatsapp";

export type DemoMessage = { from: "manager" | "straw" | "team"; text: string };

export type DemoStage = {
  id: string;
  /** Short name shown in the progress list. */
  label: string;
  /** Label of the control that moves the visitor into this stage. */
  action?: string;
  /** Text status shown beside the app result; never color-only. */
  status: string;
  tone: "draft" | "pending" | "done";
  messages: DemoMessage[];
  panelTitle: string;
  rows: [string, string][];
  note?: string;
};

export type DemoWorkflow = {
  id: StrawWorkflowId;
  label: string;
  summary: string;
  stages: DemoStage[];
};

export const strawChannels: { id: StrawChannel; label: string }[] = [
  { id: "app", label: "App" },
  { id: "imessage", label: "iMessage" },
  { id: "whatsapp", label: "WhatsApp" },
];

export const strawWorkflows: DemoWorkflow[] = [
  {
    id: "scheduling",
    label: "Scheduling",
    summary: "Draft a week from availability and rules, then publish after approval.",
    stages: [
      {
        id: "draft",
        label: "Draft prepared",
        status: "Draft · not published",
        tone: "draft",
        messages: [
          { from: "manager", text: "Generate this week’s schedule." },
          {
            from: "straw",
            text: "Draft ready: 24 shifts across 9 people, availability and Friday supervisor rule applied. Nothing is published until it is approved.",
          },
        ],
        panelTitle: "Week of Mar 3 · Draft",
        rows: [
          ["Shifts filled", "24 of 24"],
          ["Supervisors on Friday", "2 of 2"],
          ["Availability conflicts", "0"],
          ["Visible to team", "No"],
        ],
      },
      {
        id: "approved",
        label: "Manager approves",
        action: "Approve schedule",
        status: "Approved by manager",
        tone: "pending",
        messages: [
          { from: "manager", text: "Looks right. Approved." },
          { from: "straw", text: "Approval recorded. Ready to publish." },
        ],
        panelTitle: "Week of Mar 3 · Approved",
        rows: [
          ["Approved by", "Manager (sample)"],
          ["Visible to team", "Not yet"],
          ["Next step", "Publish to team"],
        ],
      },
      {
        id: "published",
        label: "Published",
        action: "Publish to team",
        status: "Published to team",
        tone: "done",
        messages: [
          {
            from: "straw",
            text: "Published. The team has been notified of their shifts.",
          },
        ],
        panelTitle: "Week of Mar 3 · Published",
        rows: [
          ["Team notified", "9 of 9"],
          ["Visible to team", "Yes"],
          ["Change history", "Draft → approved → published"],
        ],
        note: "Publishing can run automatically when your organization configures it.",
      },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    summary: "Request coverage from eligible people and confirm only after approval.",
    stages: [
      {
        id: "request",
        label: "Coverage request",
        status: "Open · needs cover",
        tone: "draft",
        messages: [
          { from: "manager", text: "Sam called out of Saturday’s 4–10pm event shift. Find cover." },
          { from: "straw", text: "Checking who is eligible for a server shift that evening." },
        ],
        panelTitle: "Saturday event · 1 open shift",
        rows: [
          ["Role needed", "Server"],
          ["Hours", "4:00–10:00pm"],
          ["Status", "Open"],
        ],
      },
      {
        id: "contacted",
        label: "Eligible people contacted",
        action: "Contact eligible people",
        status: "Waiting on replies",
        tone: "pending",
        messages: [
          {
            from: "straw",
            text: "3 people are trained, available, and under their hour limit. I’ve messaged Jordan, Priya, and Alex.",
          },
        ],
        panelTitle: "Outreach",
        rows: [
          ["Jordan", "Message sent"],
          ["Priya", "Message sent"],
          ["Alex", "Message sent"],
        ],
      },
      {
        id: "response",
        label: "Response received",
        action: "Show reply",
        status: "Reply received",
        tone: "pending",
        messages: [{ from: "team", text: "Jordan: I can cover Saturday." }],
        panelTitle: "Outreach",
        rows: [
          ["Jordan", "Accepted · not yet assigned"],
          ["Priya", "No reply yet"],
          ["Alex", "No reply yet"],
        ],
      },
      {
        id: "approval",
        label: "Manager approves",
        action: "Approve Jordan",
        status: "Approved by manager",
        tone: "pending",
        messages: [
          { from: "manager", text: "Approve Jordan." },
          { from: "straw", text: "Approval recorded. Updating the schedule." },
        ],
        panelTitle: "Assignment",
        rows: [
          ["Proposed", "Jordan"],
          ["Approval", "Recorded"],
        ],
      },
      {
        id: "confirmed",
        label: "Assignment confirmed",
        action: "Confirm assignment",
        status: "Confirmed",
        tone: "done",
        messages: [
          {
            from: "straw",
            text: "Jordan is confirmed for Saturday 4–10pm. Priya and Alex were told the shift is filled.",
          },
        ],
        panelTitle: "Saturday event · Filled",
        rows: [
          ["Assigned", "Jordan"],
          ["Others notified", "Priya, Alex"],
          ["Schedule updated", "Yes"],
        ],
        note: "Approval can be skipped when your organization configures automatic assignment.",
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    summary: "Spot low stock and prepare a replenishment task.",
    stages: [
      {
        id: "check",
        label: "Stock check",
        status: "Check complete",
        tone: "draft",
        messages: [
          { from: "manager", text: "What are we running low on?" },
          { from: "straw", text: "Checked 42 tracked items against your thresholds." },
        ],
        panelTitle: "Stock check",
        rows: [
          ["Items checked", "42"],
          ["Below threshold", "1"],
        ],
      },
      {
        id: "low",
        label: "Low item found",
        action: "Show low item",
        status: "Low stock",
        tone: "pending",
        messages: [
          {
            from: "straw",
            text: "Oat milk: 6 cartons left, threshold is 10. Usage suggests it runs out Thursday.",
          },
        ],
        panelTitle: "Low item",
        rows: [
          ["Item", "Oat milk"],
          ["On hand", "6 cartons"],
          ["Threshold", "10 cartons"],
        ],
      },
      {
        id: "task",
        label: "Replenishment task prepared",
        action: "Prepare task",
        status: "Task prepared · awaiting approval",
        tone: "pending",
        messages: [
          {
            from: "straw",
            text: "I prepared a task to order 4 cases. It’s waiting for your OK before anything is sent.",
          },
        ],
        panelTitle: "Replenishment task",
        rows: [
          ["Order", "Oat milk · 4 cases"],
          ["Owner", "Kitchen lead"],
          ["Status", "Prepared, not sent"],
        ],
      },
    ],
  },
  {
    id: "forecasting",
    label: "Forecasting",
    summary: "Compare a sample demand forecast against scheduled coverage.",
    stages: [
      {
        id: "forecast",
        label: "Evening forecast",
        status: "Forecast ready",
        tone: "draft",
        messages: [
          { from: "manager", text: "How does Friday evening look?" },
          {
            from: "straw",
            text: "Sample forecast: about 30% busier than a typical Friday, peaking 6–8pm.",
          },
        ],
        panelTitle: "Friday evening · Sample forecast",
        rows: [
          ["Expected demand", "+30% vs. typical"],
          ["Peak window", "6:00–8:00pm"],
          ["Scheduled coverage", "5 on floor"],
        ],
      },
      {
        id: "recommendation",
        label: "Coverage recommendation",
        action: "Recommend coverage",
        status: "Recommendation · needs review",
        tone: "pending",
        messages: [
          {
            from: "straw",
            text: "I’d add one person on the floor from 5:30pm. Want me to request cover?",
          },
        ],
        panelTitle: "Recommendation",
        rows: [
          ["Suggested change", "+1 on floor, 5:30–9pm"],
          ["Why", "Demand above scheduled coverage"],
          ["Status", "Not applied"],
        ],
      },
    ],
  },
  {
    id: "tasks",
    label: "Tasks",
    summary: "Find incomplete tasks and the person who owns them.",
    stages: [
      {
        id: "check",
        label: "Closing check",
        status: "1 task incomplete",
        tone: "draft",
        messages: [
          { from: "manager", text: "Is closing done?" },
          { from: "straw", text: "7 of 8 closing tasks are complete." },
        ],
        panelTitle: "Closing checklist",
        rows: [
          ["Complete", "7 of 8"],
          ["Incomplete", "1"],
        ],
      },
      {
        id: "owner",
        label: "Owner identified",
        action: "Show owner",
        status: "Incomplete · owner assigned",
        tone: "pending",
        messages: [
          {
            from: "straw",
            text: "“Wipe down espresso station” is still open. It belongs to Maya, who clocked out at 9:40pm.",
          },
        ],
        panelTitle: "Open task",
        rows: [
          ["Task", "Wipe down espresso station"],
          ["Owner", "Maya"],
          ["Status", "Incomplete"],
        ],
      },
    ],
  },
];

export const heroWorkflow = strawWorkflows[0];

export function getWorkflow(id: StrawWorkflowId): DemoWorkflow {
  return strawWorkflows.find((w) => w.id === id) ?? strawWorkflows[0];
}
