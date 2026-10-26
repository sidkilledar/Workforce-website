export type StrawIndustry = {
  slug: "restaurants" | "catering" | "campus";
  name: string;
  headline: string;
  description: string;
  workflows: { title: string; description: string }[];
  proof: { headline: string; description: string };
  demoWorkflow:
    | "scheduling"
    | "communication"
    | "inventory"
    | "forecasting"
    | "tasks";
};

export const strawIndustries: StrawIndustry[] = [
  {
    slug: "restaurants",
    name: "Restaurants & cafés",
    headline: "Keep the floor staffed, stocked, and on task.",
    description:
      "Straw reads demand, watches inventory, and keeps staffing and daily tasks moving so managers can spend their shifts with guests and teams.",
    workflows: [
      {
        title: "Demand",
        description:
          "Forecast busy and slow periods so schedules and prep match what the day is likely to bring.",
      },
      {
        title: "Inventory",
        description:
          "Track what is running low and prepare reorders for approval before the shelf is empty.",
      },
      {
        title: "Staffing and tasks",
        description:
          "Fill open shifts, message the team, and follow up on opening, closing, and prep tasks.",
      },
    ],
    proof: {
      headline: "More time on the floor",
      description:
        "Customers report that Straw gives managers more time on the floor and less time on back-office coordination.",
    },
    demoWorkflow: "forecasting",
  },
  {
    slug: "catering",
    name: "Catering & events",
    headline: "Staff every event, even when headcounts change.",
    description:
      "Straw matches people to events, adjusts when guest counts move, and keeps coverage visible across every job on the calendar.",
    workflows: [
      {
        title: "Event staffing",
        description:
          "Build crews for each event from availability, roles, and qualifications.",
      },
      {
        title: "Headcount changes",
        description:
          "When a guest count shifts, Straw proposes the staffing change for approval, then messages the people affected.",
      },
      {
        title: "Coverage",
        description:
          "See which events are fully covered, which are at risk, and who can fill the gap.",
      },
    ],
    proof: {
      headline: "10–15 operations hours saved weekly",
      description:
        "A catering customer reports saving 10–15 operations hours every week.",
    },
    demoWorkflow: "scheduling",
  },
  {
    slug: "campus",
    name: "Campus departments & recreation",
    headline: "Schedule student teams around real lives.",
    description:
      "Straw works with student availability, qualification requirements, and recurring programs so departments stay staffed through every term.",
    workflows: [
      {
        title: "Student availability",
        description:
          "Collect and remember changing class and life schedules without chasing spreadsheets.",
      },
      {
        title: "Qualified staffing",
        description:
          "Place only people with the right certifications and training in each role.",
      },
      {
        title: "Recurring programs",
        description:
          "Carry weekly programs and seasonal events forward with their staffing rules intact.",
      },
    ],
    proof: {
      headline: "Hundreds of employees scheduled",
      description:
        "Straw is used to schedule hundreds of employees across campus operations.",
    },
    demoWorkflow: "scheduling",
  },
];
