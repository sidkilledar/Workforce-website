/** Illustrative data shared by every view of the coverage narrative. */
export const coverageScenario = {
  id: "Event 024",
  label: "Coverage request",
  team: "Downtown / Service team",
  title: "Tonight’s closing shift needs coverage.",
  shift: "Thursday, 5-9 PM",
  role: "Closing team",
  employee: "Jordan",
  manager: "Maya",
  detectedAt: "3:42 PM",
  completedAt: "3:48 PM",
  request:
    "Can you cover the closing shift today, 5-9 PM? Reply to confirm your availability. Maya will review before you are assigned.",
  outcomes: [
    "Jordan assigned to the closing shift",
    "Schedule updated",
    "Team notified and decision recorded",
  ],
} as const;

export const workflowSteps = [
  {
    label: "Detect issue",
    time: "3:42 PM",
    title: "A call-out becomes an open record.",
    description:
      "The closing shift is uncovered. The issue stays open until coverage is confirmed.",
    state: "Needs attention",
  },
  {
    label: "Check eligibility",
    time: "3:42 PM",
    title: "Available is only the first check.",
    description:
      "Compare the shift against availability, role requirements, and configured limits before contacting anyone.",
    state: "Eligibility checked",
  },
  {
    label: "Contact team",
    time: "3:43 PM",
    title: "Send a request with the context attached.",
    description:
      "Jordan receives the shift details and the requested response. Contacted does not mean accepted.",
    state: "Contacted",
  },
  {
    label: "Record response",
    time: "3:45 PM",
    title: "A reply moves the work forward.",
    description:
      "Jordan accepts the request. Assignment still waits for the manager’s approval.",
    state: "Accepted / awaiting approval",
  },
  {
    label: "Manager approval",
    time: "3:46 PM",
    title: "The decision stays with the manager.",
    description:
      "Maya reviews the proposed coverage and approves the schedule change.",
    state: "Awaiting approval",
  },
  {
    label: "Confirm completion",
    time: "3:48 PM",
    title: "Close the loop, with a record.",
    description:
      "After approval, the assignment is recorded, the schedule updates, and the team receives confirmation.",
    state: "Assigned / completed",
  },
] as const;
