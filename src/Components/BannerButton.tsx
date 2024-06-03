import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonRoundRed = (props:{label: string, url: string}) => {
  return (
    <Link to={props.url}>
    <button onClick={() => { window.scrollTo(0,0) }} className='rounded-full w-48 bg-red-600 p-3 text-white hover:bg-red-500 my-10' >{props.label}</button>
    </Link>
  )
}

export const ButtonRoundBlack = (props:{label: string, url: string}) => {
  return (
    <Link to={props.url}>
    <button className='rounded-full w-48 bg-black p-3 text-white hover:bg-gray-500 my-10' >{props.label}</button>
    </Link>
  )
}

interface ButtonSquareRedProps {
  label: string;
  onclick: () => void;
}

export const ButtonSquareRed: React.FC<ButtonSquareRedProps> = (props) => {
  return (
    <button
      className='w-44 bg-red-600 p-3 text-white hover:bg-red-500 my-10 font-semibold'
      onClick={props.onclick}
    >
      {props.label}
    </button>
  );
}

export const ButtonInput = (props:{label: string, onclick: () => void}) => {
  return (
      <button onClick={props.onclick} className='size-6 inline-flex justify-center items-center gap-x-2 text-sm 
      font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 
      disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white 
      dark:hover:bg-neutral-800 ' >
        {props.label}
      </button>

  )
}