import { useState } from 'react';
import Nav from './components/Nav';
import './App.css';
import Leagues from './components/Leagues';
import StarterPage from './components/StarterPage';
import Blackjack from './components/Blackjack';


function App() {
  const [gambleType, setGambleType] = useState(null)

	function backToStarter (type = null) {
		setGambleType(type)
	}
  console.log(gambleType);
  return (
    <>
      <Nav backToStarter={backToStarter}/>
      

      { gambleType === "sportbet" ?
        <Leagues /> :
        gambleType === "blackjack" ?
        <Blackjack /> :
        <StarterPage goToPages={backToStarter}/>
				}
      
    </>
  )
}

export default App
