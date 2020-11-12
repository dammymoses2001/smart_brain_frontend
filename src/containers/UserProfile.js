import React, { useContext } from 'react';
import { SmartBrainContext } from '../contextApi';
import { Link } from 'react-router-dom'
const style = {
  maxWidth: '30rem',
  margin: '0 auto',
  float: 'none',
  marginBottom: '10px',
  borderRadius: '10px',
  background: 'transparent',
};

export default function UserProfile() {
  const context = useContext(SmartBrainContext);

  const { user } = context;
  // const handleBack = (e) => {
  //   history.push('/home');
  // };
  // const handleEditProfile = (e) => {
  //   history.push('/editprofile');
  // };
  return (
    <>
      <div className='myCard mt-4'>
        <div className='card ' style={style}>
          <div className='card-body'>
            <h3 className='card-title text-center'>
              User Profile
              <span style={{ marginLeft: 10 }}>
                {/* <EditIcon
                  color='primary pointer grow'
                  //onClick={handleEditProfile}
                /> */}
              </span>
            </h3>
            <div className='card-text tc'>
              <h6>
                Here is {user.name} personal information ...
              </h6>
            </div>
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>Full Name: {user.name}</li>
            <li className='list-group-item'>Email: {user.email}</li>
            <li className='list-group-item'>Entries: {user.entries}</li>
            <li className='list-group-item'>Rank: {user.rank}</li>
            <li className='list-group-item'>Data joined:{user.joined}</li>
          </ul>
          <div className='card-body tc'>
            <Link to='/'>
              <button
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-50 button-center'
              >
                Back
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
