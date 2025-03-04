import React from "react";
import Link from "next/link";

export const ButtonRoundRed = (props: { label: string; url: string }) => {
  return (
    <Link href={props.url}>
      <button
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        className="rounded-xl w-48 bg-secondary p-3 text-white active:bg-red-500 hover:translate-y-[-2px] duration-200 md:my-6 my-10"
      >
        {props.label}
      </button>
    </Link>
  );
};

export const ButtonRoundBlack = (props: { label: string; url: string }) => {
  return (
    <Link href={props.url}>
      <button className="rounded-xl w-48 bg-base-content p-3 text-base-100 hover:scale-105 my-10">
        {props.label}
      </button>
    </Link>
  );
};

interface ButtonSquareRedProps {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

export const ButtonSquareRed: React.FC<ButtonSquareRedProps> = ({
  onClick,
  label,
  icon,
}) => {
  return (
    <button
      className="min-w-44 bg-secondary py-4 px-8 text-white text-xl hover:scale-105 duration-200 my-4 flex items-center justify-center gap-2 rounded-xl shadow-lg border-2 "
      onClick={onClick}
    >
      {label}

      <span className="h-5 w-5">{icon}</span>
    </button>
  );
};

export const ButtonInput = (props: { label: string; onClick: () => void }) => {
  return (
    <button
      onClick={props.onClick}
      className="size-6 inline-flex justify-center items-center gap-x-2 text-sm 
      font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 
      disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white 
      dark:hover:bg-neutral-800 "
    >
      {props.label}
    </button>
  );
};
