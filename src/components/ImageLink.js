import React, { useContext } from 'react';
import { SmartBrainContext } from '../contextApi';

export default function ImageLink() {
  const context = useContext(SmartBrainContext);
  const { Imagelink, box } = context;

  return (
    <div className='tc ma '>
      <div className='relative ma2'>
        <img id='inputimage' alt='' src={Imagelink} />
        {box
          ? box.map((box, index) => (
            <div
              className='bounding-box'
              key={index}
              style={{
                top: box.topRow,
                right: box.rightcol,
                bottom: box.bottomRow,
                left: box.leftcol,
              }}
            ></div>
          ))
          : null}
      </div>
    </div>
  );
}
