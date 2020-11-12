import React from 'react';

import brain from '../public/image/brain.png';

const Logo = () => {
  return (
    <div
      className='Tilt shadow-3 ma3 tc'

      style={{ height: 125, width: 100 }}
    >
      <div className='Tilt-inner pt3'>
        <img alt='' src={brain} />
      </div>
    </div>
  );
};
export default Logo;
