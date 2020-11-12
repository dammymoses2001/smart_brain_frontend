import React, { useContext } from 'react';
import { SmartBrainContext } from '../contextApi/';

export default function InputBox() {
  const context = useContext(SmartBrainContext);

  const { handleImageSubmit, handleImageLink, message } = context;

  const handleImageChnage = (e) => {
    handleImageLink(e.target.value);
  };

  return (
    <div className='tc'>
      <div className='instruct mb3'>
        This Magic Brain will detect faces in your pictures. Give it a try.
      </div>
      <div className='linkbox'>
        <input
          type='search'
          className='pa2 ma1'
          name='imageurl'
          placeholder='Enter Image Link...'
          onChange={handleImageChnage}
        />
        <button onClick={handleImageSubmit} className='grow'>
          Submit
        </button>

      </div>
      <p className={message ? 'alert alert-danger small ' : null}>{message}</p>
    </div>
  );
}
