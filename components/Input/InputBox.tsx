import React from 'react'

export const InputBox = ({
  type,
  placeholder,
  value,
  name,
  onChange
}: {
  type: string;
  placeholder: string;
  value: string | number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      className="max-w-96 border border-gray-300 rounded-md"
    />
  );
};

