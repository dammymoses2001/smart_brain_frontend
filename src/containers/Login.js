import React, { useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { SmartBrainContext } from '../contextApi/index';

import { url } from '../urlconfig'

const initial = {
  email: '',
  password: '',
};
export default function Login({ history }) {
  const context = useContext(SmartBrainContext);
  const { handleLogin } = context;

  const [user, setUser] = useState(initial);
  const [load, setLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleChnage = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (email.length === 0 || password.length === 0 || email === '') {
      showErrorMessage('All field are mandtory');
    } else {
      setLoad(true);
      fetch(`${url}signIn`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          //console.log(user);
          setLoad(false);
          if (user.email) {
            // const email = decode(user.token).user

            setLoad(false);
            fetch(`${url}ranking`, {
              method: 'Post',
              headers: { 'Content-Type': 'application/json', },
              body: JSON.stringify({
                email: email,
              }),
            })
              .then((response) => response.json())
              .then((rank) => {

                const userdetails = {
                  ...user,
                  rank
                }
                localStorage.setItem('user', JSON.stringify({ ...userdetails }));
                setLoad(false);
                history.push('/');
                handleLogin(userdetails);
                // setUser(initial);
              });

            // history.push('/home');
          } else {
            setLoad(false);
            showErrorMessage('Invalid Credentials');
            //  history.push('/register')
          }
        })

        .catch((err) => {
          console.log(err);
        });
    }
  };
  const { email, password } = user;
  return (
    <>

      <article className='br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center'>
        <main className='pa4 black-80'>
          <form className='measure center'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f2 fw6 ph0 mh0 ttu tc'>Sign In</legend>

              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email:
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  onChange={handleChnage}
                />
              </div>

              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password:
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={handleChnage}
                />
              </div>
              {/* <label className="pa0 ma0 lh-copy f6 pointer tc"><input type="checkbox"/> Remember me</label> */}
            </fieldset>
            <div className=''>
              <button
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-50 button-center'
                onClick={onSubmit}
              >
                Sign in
              </button>
              <p className={errorMessage ? ' alert alert-danger mt-2 text-center small' : null}>
                {errorMessage}
              </p>
              {load ? (
                <Loading className='tc w-100 show' display='loading show' />
              ) : (
                  <Loading className='tc w-100 hide' display='loading hide' />
                )}
            </div>
            <div className='lh-copy mt3'>
              <Link to='/register' className='f6 link dim black db tc'>
                Sign up
              </Link>
              <a href='#0' className='f6 link dim black db text-center'>
                Forgot your password?
              </a>
            </div>
          </form>
        </main>
      </article>
    </>
  );
}
