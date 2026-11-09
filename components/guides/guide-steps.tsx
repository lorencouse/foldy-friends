import { DIAGRAMS } from "@/components/guides/diagrams";
import { FoldDiagram, TurnOverMark } from "@/components/guides/fold-diagram";
import type { Guide } from "@/lib/guides";

/** The numbered steps of a guide, each with its diagram, title and instruction. */
export function GuideSteps({ guide }: { guide: Guide }) {
  const set = DIAGRAMS[guide.slug];
  return (
    <ol className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-6" aria-label="Steps">
      {guide.steps.map((step, i) => (
        <li
          // biome-ignore lint/suspicious/noArrayIndexKey: steps never reorder and titles can repeat
          key={i}
          id={`step-${i + 1}`}
          className="sheet flex scroll-mt-6 flex-col overflow-hidden"
          data-rise
          style={{ "--i": i % 3 } as React.CSSProperties}
        >
          <div className="m-2.5 mb-0 rounded-[16px] bg-kraft">
            <FoldDiagram diagram={set.steps[i]} color={set.color} label={step.alt} className="block w-full" />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 px-5 pt-4 pb-5">
            <p className="eyebrow">Step {i + 1}</p>
            <h3 className="text-[1.3125rem] leading-[1.15] font-bold">{step.title}</h3>
            <p className="text-[1.0625rem] leading-normal text-ink-soft">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The finished model on its pale, creased sheet. */
export function FinishedModel({ guide, className = "" }: { guide: Guide; className?: string }) {
  const set = DIAGRAMS[guide.slug];
  return (
    <div
      className={`dogear creases flex aspect-[6/5] items-center justify-center overflow-hidden rounded-[22px_0_22px_22px] ${className}`}
      style={{ backgroundColor: set.tile }}
    >
      <span className="flap" />
      <FoldDiagram
        diagram={set.finished}
        color={set.color}
        label={
          guide.slug === "how-to-start-origami"
            ? guide.steps[0].alt
            : `A finished origami ${guide.name.toLowerCase()}`
        }
        className="w-[88%]"
      />
    </div>
  );
}

/** How to read the diagrams: the fold lines and arrows used in every guide. */
export function NotationKey() {
  const items: { label: string; svg: React.ReactNode }[] = [
    {
      label: "Valley fold: fold towards you",
      svg: (
        <line x1="4" y1="12" x2="60" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="7 5" />
      ),
    },
    {
      label: "Mountain fold: fold away from you",
      svg: (
        <line
          x1="4"
          y1="12"
          x2="60"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="9 4 2 4 2 4"
        />
      ),
    },
    {
      label: "Crease you made earlier",
      svg: (
        <line x1="4" y1="12" x2="60" y2="12" stroke="currentColor" strokeWidth="1.1" strokeOpacity=".45" />
      ),
    },
    {
      label: "Fold, then unfold",
      svg: (
        <>
          <path d="M8 18 Q32 -4 54 16" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <polygon points="56,18 44,15 51,8" fill="currentColor" />
          <polygon points="6,20 9,8 15,14" fill="#FFFDF8" stroke="currentColor" strokeWidth="1.4" />
        </>
      ),
    },
    {
      label: "Pull out or open",
      svg: (
        <>
          <path d="M6 12 H46" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <polygon
            points="59,12 46,5 46,19"
            fill="#FFFDF8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </>
      ),
    },
    {
      label: "Turn the paper over",
      svg: <TurnOverMark x={14} y={14} />,
    },
    {
      label: "Push in here",
      svg: (
        <polygon
          points="58,12 46,2 46,8 22,8 26,12 22,16 46,16 46,22"
          fill="#FFFDF8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      ),
    },
  ];
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,230px),1fr))] gap-x-6 gap-y-3 text-[0.9375rem] font-bold">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-3">
          <svg viewBox="0 0 64 24" width="64" height="24" aria-hidden="true" className="flex-none text-ink">
            {it.svg}
          </svg>
          {it.label}
        </li>
      ))}
    </ul>
  );
}
