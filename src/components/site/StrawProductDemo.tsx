"use client";

import "./straw-demo.css";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import {
  getWorkflow,
  heroWorkflow,
  strawChannels,
  strawWorkflows,
  type DemoStage,
  type DemoMessage,
  type StrawChannel,
  type StrawWorkflowId,
} from "./straw-demo-data";

const HERO_STEP_MS = 1800;
const SAMPLE_LABEL = "Illustrative example · sample data";

const senderLabel: Record<DemoMessage["from"], string> = {
  manager: "You",
  straw: "Straw",
  team: "Team member",
};

const channelTitle: Record<StrawChannel, string> = {
  app: "Straw assistant panel",
  imessage: "iMessage · Straw",
  whatsapp: "WhatsApp · Straw",
};

function Conversation({
  channel,
  messages,
  extra,
}: {
  channel: StrawChannel;
  messages: DemoMessage[];
  extra?: ReactNode;
}) {
  return (
    <section
      className="straw-demo__chat"
      data-channel={channel}
      aria-label={`Conversation in ${channelTitle[channel]}`}
    >
      <header className="straw-demo__chat-head">{channelTitle[channel]}</header>
      <ol className="straw-demo__messages">
        {messages.map((m, i) => (
          <li key={i} className="straw-demo__msg" data-from={m.from}>
            <span className="straw-demo__sender">{senderLabel[m.from]}</span>
            <span className="straw-demo__bubble">{m.text}</span>
          </li>
        ))}
      </ol>
      {extra}
    </section>
  );
}

function AppResult({ stage }: { stage: DemoStage }) {
  return (
    <section className="straw-demo__app" aria-label="Result in the Straw app">
      <header className="straw-demo__app-head">
        <span>Straw app</span>
        <span
          className="straw-demo__status"
          data-tone={stage.tone}
          role="status"
        >
          {stage.status}
        </span>
      </header>
      <h4 className="straw-demo__panel-title">{stage.panelTitle}</h4>
      <dl className="straw-demo__rows">
        {stage.rows.map(([k, v]) => (
          <div key={k} className="straw-demo__row">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {stage.note ? <p className="straw-demo__note">{stage.note}</p> : null}
    </section>
  );
}

function Progress({
  stages,
  current,
  label,
}: {
  stages: DemoStage[];
  current: number;
  label: string;
}) {
  return (
    <ol className="straw-demo__progress" aria-label={label}>
      {stages.map((s, i) => {
        const state = i < current ? "Done" : i === current ? "Current" : "Upcoming";
        return (
          <li
            key={s.id}
            data-state={state.toLowerCase()}
            aria-current={i === current ? "step" : undefined}
          >
            <span className="straw-demo__progress-label">{s.label}</span>
            <span className="straw-demo__progress-state">{state}</span>
          </li>
        );
      })}
    </ol>
  );
}

function HeroDemo() {
  const stages = heroWorkflow.stages;
  const last = stages.length - 1;
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !started || !playing || step >= last) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), HERO_STEP_MS);
    return () => window.clearTimeout(id);
  }, [reduced, started, playing, step, last]);

  const shown = reduced ? last : step;
  const finished = shown === last;
  const messages = stages.slice(0, shown + 1).flatMap((s) => s.messages);

  return (
    <div className="straw-demo" data-variant="hero" ref={rootRef}>
      <p className="straw-demo__sample">{SAMPLE_LABEL}</p>
      <div className="straw-demo__body">
        <Conversation channel="imessage" messages={messages} />
        <AppResult stage={stages[shown]} />
      </div>
      <Progress
        stages={stages}
        current={shown}
        label="Scheduling progress: draft prepared, manager approves, published"
      />
      <p className="straw-demo__note">
        Straw prepares the draft; the manager approves before it is published.
        Automatic publishing is available when configured.
        {reduced ? " Showing the completed example." : ""}
      </p>
      {reduced ? null : (
        <div className="straw-demo__controls">
          <button
            type="button"
            className="straw-demo__btn"
            disabled={finished}
            onClick={() => {
              setStarted(true);
              setPlaying((p) => !p);
            }}
          >
            {playing && started ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            className="straw-demo__btn"
            onClick={() => {
              setStep(0);
              setStarted(true);
              setPlaying(true);
            }}
          >
            Replay
          </button>
        </div>
      )}
    </div>
  );
}

const RULE_TEXT = "Always schedule two supervisors on Fridays";

type RuleState = "idle" | "proposed" | "saved";

export function StrawMemoryExample({
  channel = "app",
}: {
  channel?: StrawChannel;
}) {
  const [state, setState] = useState<RuleState>("idle");
  const messages: DemoMessage[] =
    state === "idle"
      ? []
      : [
          { from: "manager", text: RULE_TEXT },
          state === "proposed"
            ? {
                from: "straw",
                text: "Save this as a rule? I’ll apply it to future Friday schedules.",
              }
            : {
                from: "straw",
                text: "Saved. I’ll schedule two supervisors on Fridays.",
              },
        ];

  return (
    <section className="straw-demo__memory" aria-label="Teaching Straw a rule">
      <h4 className="straw-demo__panel-title">Teach Straw a rule</h4>
      <p className="straw-demo__hint">
        New instructions are only remembered after you confirm them.
      </p>
      {state === "idle" ? (
        <button
          type="button"
          className="straw-demo__btn"
          onClick={() => setState("proposed")}
        >
          Send: “{RULE_TEXT}”
        </button>
      ) : (
        <Conversation channel={channel} messages={messages} />
      )}
      {state === "proposed" ? (
        <div className="straw-demo__controls">
          <button
            type="button"
            className="straw-demo__btn straw-demo__btn--primary"
            onClick={() => setState("saved")}
          >
            Confirm and save rule
          </button>
          <button
            type="button"
            className="straw-demo__btn"
            onClick={() => setState("idle")}
          >
            Cancel
          </button>
        </div>
      ) : null}
      {state === "saved" ? (
        <>
          <p className="straw-demo__status" data-tone="done" role="status">
            Rule saved
          </p>
          <ul className="straw-demo__rules" aria-label="Saved rules">
            <li>{RULE_TEXT}</li>
          </ul>
          <button
            type="button"
            className="straw-demo__btn"
            onClick={() => setState("idle")}
          >
            Reset rule example
          </button>
        </>
      ) : null}
    </section>
  );
}

function ExplorerDemo({ initialWorkflow }: { initialWorkflow: StrawWorkflowId }) {
  const uid = useId();
  const [workflowId, setWorkflowId] = useState<StrawWorkflowId>(initialWorkflow);
  const [channel, setChannel] = useState<StrawChannel>("app");
  const [stageIndex, setStageIndex] = useState(0);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const workflow = getWorkflow(workflowId);
  const stages = workflow.stages;
  const stage = stages[stageIndex];
  const next = stages[stageIndex + 1];
  const messages = stages.slice(0, stageIndex + 1).flatMap((s) => s.messages);

  function selectWorkflow(id: StrawWorkflowId) {
    if (id === workflowId) return;
    setWorkflowId(id);
    setStageIndex(0);
  }

  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = strawWorkflows.length;
    let target = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") target = (index + 1) % count;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") target = (index - 1 + count) % count;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = count - 1;
    else return;
    e.preventDefault();
    const w = strawWorkflows[target];
    selectWorkflow(w.id);
    tabRefs.current[w.id]?.focus();
  }

  return (
    <div className="straw-demo" data-variant="explorer">
      <p className="straw-demo__sample">{SAMPLE_LABEL}</p>
      <div className="straw-demo__tabs" role="tablist" aria-label="Straw workflows">
        {strawWorkflows.map((w, i) => (
          <button
            key={w.id}
            ref={(el) => {
              tabRefs.current[w.id] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${w.id}`}
            aria-selected={w.id === workflowId}
            aria-controls={`${uid}-panel`}
            tabIndex={w.id === workflowId ? 0 : -1}
            className="straw-demo__tab"
            onClick={() => selectWorkflow(w.id)}
            onKeyDown={(e) => onTabKeyDown(e, i)}
          >
            {w.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${workflowId}`}
        className="straw-demo__panel"
      >
        <div className="straw-demo__toolbar">
          <p className="straw-demo__summary">{workflow.summary}</p>
          <div className="straw-demo__channels" role="group" aria-label="Channel">
            {strawChannels.map((c) => (
              <button
                key={c.id}
                type="button"
                className="straw-demo__channel"
                aria-pressed={c.id === channel}
                onClick={() => setChannel(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="straw-demo__body">
          <Conversation channel={channel} messages={messages} />
          <AppResult stage={stage} />
        </div>
        <Progress
          stages={stages}
          current={stageIndex}
          label={`${workflow.label} progress`}
        />
        <div className="straw-demo__controls">
          {next ? (
            <button
              type="button"
              className="straw-demo__btn straw-demo__btn--primary"
              onClick={() => setStageIndex((i) => i + 1)}
            >
              {next.action ?? `Next: ${next.label}`}
            </button>
          ) : (
            <span className="straw-demo__status" data-tone="done">
              Example complete
            </span>
          )}
          <button
            type="button"
            className="straw-demo__btn"
            disabled={stageIndex === 0}
            onClick={() => setStageIndex(0)}
          >
            Reset example
          </button>
        </div>
        <StrawMemoryExample key={workflowId} channel={channel} />
      </div>
    </div>
  );
}

export function StrawProductDemo({
  variant,
  initialWorkflow = "scheduling",
}: {
  variant: "hero" | "explorer";
  initialWorkflow?: StrawWorkflowId;
}) {
  return variant === "hero" ? (
    <HeroDemo />
  ) : (
    <ExplorerDemo initialWorkflow={initialWorkflow} />
  );
}
