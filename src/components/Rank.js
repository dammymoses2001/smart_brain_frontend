import React, { useContext } from 'react';
import { SmartBrainContext } from '../contextApi/index';

export default function Ranks() {
  const context = useContext(SmartBrainContext);
  const { user } = context;
  return (
    <div className='tc mb3 rank'>
      {`${user.name},your current entries is `} <br />
      <span># {user.entries}</span>
    </div>
  );
}
