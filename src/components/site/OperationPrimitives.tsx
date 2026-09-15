import type { ReactNode } from "react";
import { coverageScenario as event } from "@/lib/operations-scenario";

export function Status({
  children,
  tone = "waiting",
}: {
  children: ReactNode;
  tone?: "waiting" | "attention" | "complete" | "blocked";
}) {
  return (
    <span className={`op-status op-status-${tone}`}>
      <span aria-hidden="true">
        {tone === "complete"
          ? "✓"
          : tone === "attention" || tone === "blocked"
            ? "!"
            : "◷"}
      </span>
      {children}
    </span>
  );
}
export function RuleRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="op-rule-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
export function Message({
  children,
  reply = false,
  time,
}: {
  children: ReactNode;
  reply?: boolean;
  time: string;
}) {
  return (
    <div className={`op-message ${reply ? "op-message-reply" : ""}`}>
      <p>{children}</p>
      <span className="op-meta">{time}</span>
    </div>
  );
}
export function EventRecord({ completed = false }: { completed?: boolean }) {
  return (
    <article
      className={`op-event ${completed ? "op-event-completed" : ""}`}
      aria-label={`${event.id}: ${completed ? "completed coverage" : "coverage request"}`}
    >
      <div className="op-event-top">
        <span className="op-meta">{event.id}</span>
        <Status tone={completed ? "complete" : "attention"}>
          {completed ? "Completed" : "Needs attention"}
        </Status>
      </div>
      <p className="op-event-label">{event.label}</p>
      <p className="op-event-title">{completed ? "The shift is covered." : event.title}</p>
      <p className="op-event-context">
        {event.shift} <span>/</span> {event.role}
      </p>
      {completed ? (
        <>
          <ul className="op-checklist">
            {event.outcomes.map((item) => (
              <li key={item}>
                <span aria-hidden>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="op-meta">
            {event.completedAt} · Approved by {event.manager}
          </p>
        </>
      ) : (
        <div className="op-response">
          <span className="op-meta">Proposed response</span>
          <p>
            Ask {event.employee} to cover. Available, role eligible, and within
            configured hours.
          </p>
          <p className="op-small">
            Manager approval required before assignment.
          </p>
          <a className="op-button" href="#how-it-works">
            Explore this response <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </article>
  );
}
