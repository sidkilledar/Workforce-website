"use client";

import { useState, type KeyboardEvent } from "react";
import {
  coverageScenario as event,
  workflowSteps,
} from "@/lib/operations-scenario";
import { trackEvent } from "@/lib/analytics";
import { EventRecord, Message, RuleRow, Status } from "./OperationPrimitives";

const modules = [
  { key: "scheduling", label: "Scheduling" },
  { key: "communication", label: "Communication" },
  { key: "inventory", label: "Inventory" },
  { key: "tasks", label: "Tasks" },
  { key: "intelligence", label: "Intelligence" },
] as const;

export function WorkflowDemonstration() {
  const [step, setStep] = useState(0);
  const [approved, setApproved] = useState(false);
  const [exception, setException] = useState(false);
  const active = workflowSteps[step];
  function go(next: number) {
    setException(false);
    setStep(next);
    trackEvent("hero_workflow_interaction", {
      action: "inspect_step",
      step: workflowSteps[next].label,
    });
  }
  function replay() {
    setApproved(false);
    setException(false);
    setStep(0);
    trackEvent("hero_workflow_interaction", { action: "replay" });
  }
  return (
    <div className="op-workflow">
      <div className="op-workspace-bar">
        <span>
          {event.label} <span className="op-meta">/ {event.id}</span>
        </span>
        <span className="op-meta">Illustrative walkthrough</span>
      </div>
      <div className="op-workflow-body">
        <nav className="op-step-list" aria-label="Workflow steps">
          {workflowSteps.map((item, index) => (
            <button
              key={item.label}
              type="button"
              disabled={index === 5 && !approved}
              aria-current={index === step && !exception ? "step" : undefined}
              onClick={() => go(index)}
            >
              <span className="op-step-number">
                {index < step ? "✓" : String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div
          className="op-workflow-detail"
          aria-live="polite"
          aria-atomic="true"
        >
          <div key={exception ? "exception" : step} className="op-state-enter">
            <Status
              tone={
                exception
                  ? "blocked"
                  : step === 5
                    ? "complete"
                    : step === 0
                      ? "attention"
                      : "waiting"
              }
            >
              {exception ? "Escalated / unassigned" : active.state}
            </Status>
            <h3>
              {exception
                ? "No suitable response. A person takes over."
                : active.title}
            </h3>
            <p className="op-detail-description">
              {exception
                ? "The response window closes without an eligible acceptance. The operations lead is notified; the shift remains open and no assignment is made."
                : active.description}
            </p>
            {exception ? (
              <div className="op-detail-surface">
                <dl>
                  <RuleRow label="Owner">Operations lead</RuleRow>
                  <RuleRow label="Reason">No eligible acceptance</RuleRow>
                  <RuleRow label="Next action">
                    Review alternative coverage
                  </RuleRow>
                  <RuleRow label="Shift status">Unassigned</RuleRow>
                </dl>
              </div>
            ) : (
              <>
                {step === 0 && (
                  <div className="op-detail-surface">
                    <p className="op-meta">
                      {event.detectedAt} · Call-out received
                    </p>
                    <h4>{event.shift}</h4>
                    <dl>
                      <RuleRow label="Required role">{event.role}</RuleRow>
                      <RuleRow label="Open positions">1 closer</RuleRow>
                      <RuleRow label="Next action">
                        Check eligible coverage
                      </RuleRow>
                    </dl>
                  </div>
                )}
                {step === 1 && (
                  <div className="op-candidates">
                    {[
                      [
                        "Alex",
                        "Unavailable",
                        "Submitted availability excludes this shift",
                      ],
                      [
                        "Sam",
                        "Not eligible",
                        "Closing role requirement not met",
                      ],
                      [
                        event.employee,
                        "Available + eligible",
                        "Role verified; within configured hours",
                      ],
                    ].map(([name, state, detail]) => (
                      <div key={name}>
                        <span className="op-avatar">{name.slice(0, 1)}</span>
                        <div>
                          <strong>{name}</strong>
                          <p>{detail}</p>
                        </div>
                        <span
                          className={name === event.employee ? "op-green" : ""}
                        >
                          {state}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="op-detail-surface">
                    <p className="op-meta">
                      To {event.employee} / {event.id}
                    </p>
                    <Message time="3:43 PM">{event.request}</Message>
                    <p className="op-small">
                      Request sent. Waiting for a response.
                    </p>
                  </div>
                )}
                {step === 3 && (
                  <div className="op-detail-surface">
                    <p className="op-meta">
                      {event.employee} / {event.id}
                    </p>
                    <Message reply time="3:45 PM">
                      I can cover the 5-9 PM closing shift.
                    </Message>
                    <dl>
                      <RuleRow label="Response">Accepted</RuleRow>
                      <RuleRow label="Approval">
                        Pending {event.manager}
                      </RuleRow>
                      <RuleRow label="Assignment">Not yet assigned</RuleRow>
                    </dl>
                  </div>
                )}
                {step === 4 && (
                  <div className="op-detail-surface">
                    <dl>
                      <RuleRow label="Employee">{event.employee}</RuleRow>
                      <RuleRow label="Shift">{event.shift}</RuleRow>
                      <RuleRow label="Checks">
                        Available, eligible, accepted
                      </RuleRow>
                      <RuleRow label="Approver">
                        {event.manager}, location manager
                      </RuleRow>
                    </dl>
                    <button
                      className="op-button"
                      type="button"
                      onClick={() => {
                        setApproved(true);
                        setStep(5);
                        trackEvent("hero_workflow_interaction", {
                          action: "approve",
                        });
                      }}
                    >
                      Approve coverage <span aria-hidden>→</span>
                    </button>
                    <p className="op-small">
                      Demo action only. No real schedule is changed.
                    </p>
                  </div>
                )}
                {step === 5 && <EventRecord completed />}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="op-demo-controls">
        <div>
          <button
            type="button"
            className="op-button-secondary"
            disabled={step === 0 && !exception}
            onClick={() => (exception ? setException(false) : go(step - 1))}
          >
            Previous
          </button>
          <button
            type="button"
            className="op-button"
            disabled={exception || step >= 4}
            onClick={() => go(step + 1)}
          >
            Next <span aria-hidden>→</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="op-text-button"
            onClick={() => {
              setException(true);
              setApproved(false);
              setStep(2);
              trackEvent("hero_workflow_interaction", {
                action: "view_exception",
              });
            }}
          >
            View exception
          </button>
          <button type="button" className="op-text-button" onClick={replay}>
            Replay
          </button>
        </div>
      </div>
      <div className="op-activity">
        <span className="op-meta">Activity</span>
        <span>
          {exception
            ? "Response window closed · Operations lead notified · Shift open"
            : `${active.time} · ${active.state}${step === 5 ? ` · Approved by ${event.manager}` : ""}`}
        </span>
      </div>
    </div>
  );
}

export function CommunicationExample() {
  const [response, setResponse] = useState<"accepted" | "declined" | null>(
    null,
  );
  return (
    <div className="op-conversation-workspace">
      <div className="op-chat">
        <div className="op-chat-person">
          <span className="op-avatar">J</span>
          <div>
            <strong>{event.employee}</strong>
            <p>Closing team</p>
          </div>
          <span className="op-meta">{event.id}</span>
        </div>
        <p className="op-chat-context">Coverage request / {event.shift}</p>
        <Message time="3:43 PM">{event.request}</Message>
        {response && (
          <Message reply time="3:45 PM">
            {response === "accepted"
              ? "I can cover the 5-9 PM closing shift."
              : "I can’t cover this shift."}
          </Message>
        )}
        <div className="op-reply-controls">
          <button
            type="button"
            aria-pressed={response === "accepted"}
            className="op-button-secondary"
            onClick={() => {
              setResponse("accepted");
              trackEvent("hero_workflow_interaction", {
                action: "accept_reply",
              });
            }}
          >
            I can cover
          </button>
          <button
            type="button"
            aria-pressed={response === "declined"}
            className="op-text-button"
            onClick={() => {
              setResponse("declined");
              trackEvent("hero_workflow_interaction", {
                action: "decline_reply",
              });
            }}
          >
            Can’t cover
          </button>
        </div>
        <p className="op-meta">Illustrative conversation</p>
      </div>
      <div className="op-chat-status" aria-live="polite">
        <span className="op-meta">Workflow status</span>
        <ol>
          <li>
            <span>✓</span>
            <div>
              <strong>Request sent</strong>
              <p>Jordan contacted</p>
            </div>
          </li>
          <li>
            <span>{response ? "✓" : "◷"}</span>
            <div>
              <strong>
                {response ? "Response received" : "Awaiting response"}
              </strong>
              <p>
                {response === "accepted"
                  ? "Accepted, not assigned"
                  : response === "declined"
                    ? "Request declined"
                    : "No assignment yet"}
              </p>
            </div>
          </li>
          <li>
            <span>→</span>
            <div>
              <strong>
                {response === "accepted"
                  ? "Approval ready"
                  : response === "declined"
                    ? "Review other coverage"
                    : "Next action waits"}
              </strong>
              <p>
                {response === "accepted"
                  ? "Maya reviews the change"
                  : response === "declined"
                    ? "Escalate if no match remains"
                    : "A reply advances this record"}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

const contexts = [
  {
    label: "Restaurant team",
    role: "Closing team",
    approver: "Location manager",
    timeout: "15 minutes",
    escalation: "Operations lead",
  },
  {
    label: "Campus recreation",
    role: "Qualified facility supervisor",
    approver: "Program coordinator",
    timeout: "30 minutes",
    escalation: "Recreation duty manager",
  },
];
const permissions = [
  "Suggest only",
  "Require approval",
  "Run within approved rules",
];
export function ConfigurationExample() {
  const [context, setContext] = useState(0);
  const selected = contexts[context];
  return (
    <div>
      <div className="op-segment" role="group" aria-label="Operating context">
        {contexts.map((item, index) => (
          <button
            type="button"
            key={item.label}
            aria-pressed={context === index}
            onClick={() => setContext(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="op-configuration">
        <div className="op-rule-sheet">
          <div className="op-workspace-bar">
            <span>Workflow rules</span>
            <span className="op-meta">Illustrative setup</span>
          </div>
          <dl>
            <RuleRow label="Trigger">Closing shift becomes uncovered</RuleRow>
            <RuleRow label="Eligibility">{selected.role}</RuleRow>
            <RuleRow label="Notify">Available, eligible team members</RuleRow>
            <RuleRow label="Approval">{selected.approver}</RuleRow>
            <RuleRow label="Wait">{selected.timeout}</RuleRow>
            <RuleRow label="Escalate to">{selected.escalation}</RuleRow>
            <RuleRow label="Complete when">
              Assignment recorded and team notified
            </RuleRow>
          </dl>
        </div>
        <div className="op-rule-preview" aria-live="polite">
          <span className="op-meta">Resulting workflow</span>
          <h3>
            Your operation.
            <br />
            Your decision boundary.
          </h3>
          <ol>
            <li>
              Find an eligible{" "}
              {context === 0 ? "closer" : "facility supervisor"}.
            </li>
            <li>Request coverage and record the reply.</li>
            <li>
              Wait for the {selected.approver.toLowerCase()} to approve, or
              act within the permission mode set for this operation.
            </li>
            <li>
              Escalate after {selected.timeout.toLowerCase()} if unresolved.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export function InventoryPanel() {
  return (
    <div className="op-panel-inventory">
      <div className="op-workspace-bar">
        <span>Stock outlook / Catering operations</span>
        <span className="op-meta">Illustrative</span>
      </div>
      <div className="op-panel-inventory-body">
        <figure className="op-chart">
          <figcaption>Stock outlook / Illustrative units</figcaption>
          <svg
            className="op-stock-chart"
            viewBox="0 0 420 180"
            role="img"
            aria-label="Stock forecast falls from 80 units at 10 AM to 18 units at 6 PM, below the 30-unit threshold"
          >
            <line
              x1="35"
              y1="130"
              x2="398"
              y2="130"
              stroke="#9d6a23"
              strokeDasharray="5 5"
            />
            <text x="38" y="121">
              Threshold: 30 units
            </text>
            <polyline
              points="40,30 130,54 220,71 310,114 390,150"
              fill="none"
              stroke="#3f5648"
              strokeWidth="3"
            />
            <circle cx="390" cy="150" r="5" fill="#9d6a23" />
            <text x="35" y="20">
              80
            </text>
            <text x="356" y="140">
              18
            </text>
            <text x="30" y="177">
              10 AM
            </text>
            <text x="192" y="177">
              2 PM
            </text>
            <text x="358" y="177">
              6 PM
            </text>
          </svg>
          <Status tone="attention">Below threshold by 6 PM</Status>
        </figure>
        <div className="op-panel-side">
          <p className="op-eyebrow">Forecasting / Restaurant operations</p>
          <p className="op-panel-detail">
            Expected demand takes stock below the planning threshold.
            Forecast comparisons work the same way for staffing: required
            coverage against scheduled coverage.
          </p>
          <div className="op-mini-bars">
            <div className="op-bar-label">
              <span>Required coverage</span>
              <strong>14 people</strong>
            </div>
            <div className="op-bar op-bar-required" />
            <div className="op-bar-label">
              <span>Scheduled coverage</span>
              <strong>12 people</strong>
            </div>
            <div className="op-bar op-bar-scheduled" />
          </div>
          <p className="op-completion-condition">
            Complete when: replenishment is confirmed and the stock outlook
            is updated.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TaskPanel() {
  return (
    <div className="op-panel-tasks">
      <div className="op-workspace-bar">
        <span>Facility opening / Campus recreation</span>
        <span className="op-meta">Illustrative</span>
      </div>
      <div className="op-panel-tasks-body">
        <figure className="op-chart">
          <figcaption>Facility opening / Illustrative task list</figcaption>
          <ul className="op-task-list">
            <li>
              <span>✓</span>Equipment check <span>Complete</span>
            </li>
            <li>
              <span>✓</span>Staff check-in <span>Complete</span>
            </li>
            <li>
              <span>!</span>
              <div>
                Court safety check<small>Owner: Riley / Due 8:00 AM</small>
              </div>
              <Status tone="blocked">Overdue</Status>
            </li>
          </ul>
          <p className="op-small">
            Escalated to the recreation duty manager.
          </p>
        </figure>
        <div className="op-panel-side">
          <p className="op-eyebrow">Tasks / Campus recreation</p>
          <p className="op-panel-detail">
            A facility check passes its deadline. Notify the owner and
            escalate to the duty manager if it remains unresolved.
          </p>
          <p className="op-completion-condition">
            Complete when: the check is recorded and the manager has
            visibility.
          </p>
        </div>
      </div>
    </div>
  );
}

export function IntelligencePanel() {
  const [permission, setPermission] = useState(1);
  return (
    <div className="op-panel-intelligence">
      <p className="op-module-caption">
        Applies across every workflow above, not a separate one.
      </p>
      <p className="op-meta">One action: assign accepted coverage</p>
      <div className="op-segment" role="group" aria-label="AI permission">
        {permissions.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={permission === index}
            onClick={() => {
              setPermission(index);
              trackEvent("authority_mode_select", { mode: label });
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <p aria-live="polite">
        {permission === 0
          ? "WorkforceOS suggests the assignment. A manager makes the change."
          : permission === 1
            ? "WorkforceOS prepares the assignment and waits for explicit approval."
            : "WorkforceOS completes the assignment within rules approved during setup and records the action."}
      </p>
    </div>
  );
}

export function ModuleFrame() {
  const [active, setActive] = useState(0);
  function selectTab(index: number) {
    setActive(index);
    trackEvent("capability_tab_select", { module: modules[index].key });
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      selectTab((active + 1) % modules.length);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      selectTab((active - 1 + modules.length) % modules.length);
    }
  }
  return (
    <div className="op-module-frame">
      <div
        className="op-module-tabs"
        role="tablist"
        aria-label="Product modules"
        onKeyDown={onKeyDown}
      >
        {modules.map((item, index) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            id={`module-tab-${item.key}`}
            aria-selected={active === index}
            aria-controls={`module-panel-${item.key}`}
            tabIndex={active === index ? 0 : -1}
            className={
              item.key === "intelligence"
                ? "op-module-tab op-module-tab-intelligence"
                : "op-module-tab"
            }
            onClick={() => selectTab(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="op-module-eyebrow">
        We built scheduling and communication first. Everything else
        connects to them.
      </p>
      <div className="op-module-panels">
        {modules.map((item, index) => (
          <div
            key={item.key}
            role="tabpanel"
            id={`module-panel-${item.key}`}
            aria-labelledby={`module-tab-${item.key}`}
            hidden={active !== index}
          >
            {item.key === "scheduling" && <WorkflowDemonstration />}
            {item.key === "communication" && <CommunicationExample />}
            {item.key === "inventory" && <InventoryPanel />}
            {item.key === "tasks" && <TaskPanel />}
            {item.key === "intelligence" && <IntelligencePanel />}
          </div>
        ))}
      </div>
    </div>
  );
}
