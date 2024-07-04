import React from 'react'
import { InfoSvg } from './svgPaths';

export const Alert = ( {message}:{message:string} ) => {
  return (
    <div role="alert" className="alert alert-error">
      {InfoSvg}
      <span>{message}</span>
    </div>
  );
}
