"use client";

import { useState } from "react";

/**
 * The live thing on the home page: fold Foldy, the shop's paper dog, in four
 * steps, in the paper colour of your choice. Without script it shows the
 * finished dog and the written steps.
 */

const COLOURS = [
  { name: "Yellow", face: "#f2c12e", fold: "#d9a514", ground: "#2a64b0" },
  { name: "Red", face: "#e0483a", fold: "#c13528", ground: "#f3f3f1" },
  { name: "Blue", face: "#2a64b0", fold: "#1f4f8f", ground: "#f2c12e" },
  { name: "Green", face: "#2f8a5b", fold: "#236d47", ground: "#ef8fae" },
  { name: "Pink", face: "#ef8fae", fold: "#dc6f93", ground: "#2f8a5b" },
] as const;

const STEPS = [
  "Start with a square, turned to a diamond.",
  "Fold it in half, top to bottom, into a triangle.",
  "Fold both corners down to make the ears.",
  "Fold the tip up for a nose, then draw the face.",
];

export function FoldingDog({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(STEPS.length - 1);
  const [colour, setColour] = useState<(typeof COLOURS)[number]>(COLOURS[0]);
  const show = (s: number) => ({
    opacity: step === s ? 1 : 0,
    scale: step === s ? "1" : "0.96",
    transition: "opacity 450ms cubic-bezier(.22,1,.36,1), scale 450ms cubic-bezier(.22,1,.36,1)",
    transformOrigin: "200px 200px",
  });

  return (
    <div
      className="flex h-full w-full flex-col transition-colors duration-500"
      style={{ background: colour.ground }}
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center p-6">
        <svg
          viewBox="0 0 400 400"
          className={compact ? "h-full max-h-[46svh] w-auto" : "h-full max-h-[62svh] w-auto"}
          role="img"
          aria-label={`Foldy the paper dog in ${colour.name.toLowerCase()} paper, step ${step + 1} of 4: ${STEPS[step]}`}
        >
          <g style={show(0)}>
            <polygon points="200,40 360,200 200,360 40,200" fill={colour.face} />
          </g>
          <g style={show(1)}>
            <polygon points="40,140 360,140 200,300" fill={colour.face} />
            <polygon points="40,140 200,140 200,300" fill={colour.fold} opacity={0.35} />
          </g>
          <g style={show(2)}>
            <polygon points="110,140 290,140 200,300" fill={colour.face} />
            <polygon points="110,140 62,262 140,205" fill={colour.fold} />
            <polygon points="290,140 338,262 260,205" fill={colour.fold} />
          </g>
          <g style={show(3)}>
            <polygon points="110,140 290,140 240,250 160,250" fill={colour.face} />
            <polygon points="110,140 62,262 140,205" fill={colour.fold} />
            <polygon points="290,140 338,262 260,205" fill={colour.fold} />
            <polygon points="160,250 240,250 200,214" fill={colour.fold} />
            <polygon points="186,222 214,222 200,240" fill="#1d1c1a" />
            <circle cx="165" cy="186" r="9" fill="#1d1c1a" />
            <circle cx="235" cy="186" r="9" fill="#1d1c1a" />
          </g>
        </svg>
      </div>

      <div className="bg-night px-4 py-5 text-bone sm:px-6">
        <p className="text-small text-bone-muted" aria-live="polite">
          Step {step + 1} of 4
        </p>
        <p className="mt-1 min-h-[3em] font-medium">{STEPS[step]}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="btn btn-accent min-h-11"
            onClick={() => setStep((s) => (s + 1) % STEPS.length)}
          >
            {step === STEPS.length - 1 ? "Unfold and start again" : "Fold"}
          </button>
          <fieldset className="flex items-center gap-2">
            <legend className="sr-only">Paper colour</legend>
            {COLOURS.map((c) => (
              <label key={c.name} className="cursor-pointer">
                <input
                  type="radio"
                  name="dog-colour"
                  className="peer sr-only"
                  checked={colour.name === c.name}
                  onChange={() => setColour(c)}
                />
                <span className="sr-only">{c.name}</span>
                <span
                  aria-hidden
                  className="block size-9 transition-transform peer-checked:scale-110 peer-checked:outline-3 peer-checked:outline-offset-2 peer-checked:outline-bone peer-focus-visible:outline-3 peer-focus-visible:outline-kami-blue hover:scale-110"
                  style={{ background: c.face }}
                />
              </label>
            ))}
          </fieldset>
        </div>
      </div>
    </div>
  );
}
