import React from 'react'

export const ButtonRoundRed = (props:{label: string, url: string}) => {
  return (
    <button className='rounded-full w-48 bg-red-600 p-3 text-white hover:bg-red-500 my-10' >{props.label}</button>
  )
}

export const ButtonRoundBlack = (props:{label: string, url: string}) => {
  return (
    <button className='rounded-full w-48 bg-black p-3 text-white hover:bg-gray-500 my-10' >{props.label}</button>
  )
}

interface ButtonSquareRedProps {
  label: string;
  onclick: () => void;
}

export const ButtonSquareRed: React.FC<ButtonSquareRedProps> = (props) => {
  return (
    <button
      className='w-48 bg-red-600 p-3 text-white hover:bg-red-500 my-10 font-semibold'
      onClick={props.onclick}
    >
      {props.label}
    </button>
  );
}