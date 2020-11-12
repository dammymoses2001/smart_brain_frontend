import React from 'react';
import Load from '../public/image/Loading1.gif';
export default function Loading({ display }) {
  return (
    <div className='loader'>
      <img
        src={Load}
        alt='loading'
        style={{ width: '50px' }}
        className={display}
      />
    </div>
  );
}
