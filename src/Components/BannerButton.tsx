import React from 'react'
import Link from 'next/link'

export const ButtonRoundRed = (props:{label: string, url: string}) => {
  return (
    <Link href={props.url}>
    <button onClick={() => { window.scrollTo(0,0) }} className='rounded-full w-48 bg-red-600 p-3 text-white hover:bg-red-500 my-10' >{props.label}</button>
    </Link>
  )
}

export const ButtonRoundBlack = (props:{label: string, url: string}) => {
  return (
    <Link href={props.url}>
    <button className='rounded-full w-48 bg-black p-3 text-white hover:bg-gray-500 my-10' >{props.label}</button>
    </Link>
  )
}

interface ButtonSquareRedProps {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

export const ButtonSquareRed: React.FC<ButtonSquareRedProps> = ({ onClick, label, icon }) => {
  return (
    <button
      className="btn w-44 bg-red-600 p-3 text-white hover:bg-red-500 my-4 flex items-center justify-center gap-2"
      onClick={onClick}
    >

      {label}
      
      <span className='h-5 w-5'>
        {icon}
      </span>
      
      
    </button>
  );
};

export const ButtonInput = (props:{label: string, onClick: () => void}) => {
  return (
      <button onClick={props.onClick} className='size-6 inline-flex justify-center items-center gap-x-2 text-sm 
      font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 
      disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white 
      dark:hover:bg-neutral-800 ' >
        {props.label}
      </button>

  )
}