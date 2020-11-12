import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { SmartBrainContext } from '../contextApi';
function Nav({ history }) {
  const context = useContext(SmartBrainContext);
  const { user, handleLogout } = context;

  const handleLogOut = () => {
    history.push({
      pathname: '/login',
    })
    // this.props.history.push('/login')
    localStorage.clear();
    handleLogout()
  }
  return (
    <nav>
      <ul>
        <Link to='/userprofile'>
          <li className='link'><span><FaUserCircle /></span>Wel, {user.name}</li>
        </Link>
        <button className='btn btn-dark mx-2' onClick={handleLogOut}>Logout</button>

      </ul>
    </nav>
  );
}
export default withRouter(Nav)