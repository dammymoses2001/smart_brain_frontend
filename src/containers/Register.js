import React, { useState } from 'react';
// import history from '../Component/history';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
// import Nav from '../components/Nav';
import { url } from '../urlconfig'
const initial = {
  name: '',
  email: '',
  password: ''
}
export default function Register(props) {
  const [user, setUser] = useState(initial);
  const [load, setLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');



  const handleChnage = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    if (name === '' || email === '' || password === '') {
      setErrorMessage('All field are mandtory')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)

    } else {
      setLoad(true);
      fetch(`${url}register`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user && user.id) {
            setLoad(false);
            setUser(initial)
            setMessage('Registration successful, you can now login')
            setTimeout(() => {
              setMessage('')
              props.history.push('/login')
            }, 5000)
          } else {
            setLoad(false);
            setErrorMessage('Email exist')
            setTimeout(() => {
              setErrorMessage('')
            }, 3000)
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const { name, email, password } = user

  return (
    <>
      {/* <Nav navlink3='SignIn' /> */}
      <article className='br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center'>
        <main className='pa4 black-80'>
          <form className='measure center'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f2 fw6 ph0 mh0 ttu tc'>Register</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='fullname'>
                  Full Name:
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='name'
                  name='name'
                  id='name'
                  value={name}
                  onChange={handleChnage}
                />
              </div>

              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email'>
                  Email
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
                  Password
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
            </fieldset>
            <div className=''>
              <button
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib tc button-center'
                type='submit'
                onClick={onSubmit}
              >
                Register
              </button>
              <p className={errorMessage ? 'alert alert-danger text-center' : null}>{errorMessage}</p>
              <p className={message ? 'alert alert-success text-center' : null}>{message}</p>

              {load ? (
                <Loading className='tc w-100 show' display='loading show' />
              ) : (
                  <Loading className='tc w-100 hide' display='loading hide' />
                )}
            </div>

            <div className='lh-copy mt3'>
              <Link to='/' className='f6 link dim black db tc'>
                Sign
              </Link>

              <a href='#0' className='f6 link dim black db tc'>
                Forgot your password?
              </a>
            </div>
          </form>
        </main>
      </article>
    </>
  );
}
