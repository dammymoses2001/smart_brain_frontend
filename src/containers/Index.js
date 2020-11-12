import React from 'react';
import Nav from '../components/Nav';
import Logo from '../components/Logo';
import ImageLink from '../components/ImageLink';
import InputBox from '../components/InputBox';
import Rank from '../components/Rank';

export default function Home() {

  return (
    <div>
      <Nav />
      <Logo />
      <Rank />
      <InputBox />
      <ImageLink />
    </div>
  );
}
