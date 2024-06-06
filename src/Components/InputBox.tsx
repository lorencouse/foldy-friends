import React from 'react'

export const InputBox = ( { type, placeholder, value, onChange }:
  {type:string, placeholder:string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void } ) => 
    {
  return (
    <input type={type} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange}
    className='max-w-96 border border-gray-300 rounded-md' />
  )
}



// interface InputBoxProps {
//   type: string;
//   placeholder: string;
//   value: string | number;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export const InputBox: React.FC<InputBoxProps> = ({ type, placeholder, value, onChange }) => {
//   return (
//     <input
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className='max-w-96 border border-gray-300 rounded-md mb-2 p-2'
//     />
//   );
// };
