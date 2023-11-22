import { useState } from 'react';
import Nav from './components/Nav';
import Countries from './components/Countries';
import Leagues from './components/Leagues';
import League from './components/League';
import './App.css';

function App() {

  return (
    <>
      <Nav />
      <League id="39" />
    </>
  )
}

export default App
