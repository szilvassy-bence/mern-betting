import { useState } from 'react';
import Nav from './components/Nav';
import './App.css';
import Main from "./components/Main"
import Leagues from './components/Leagues';

function App() {
  const [id, setId] = useState(null)

	function bundesliga () {
		console.log("bundesliga clicked");
		setId("1")
	}

	function premier () {
		console.log("premier clicked");
		setId("2")
	}

	function backToLeagues () {
		setId(null)
	}
  console.log(id);
  return (
    <>
      <Nav backToLeagues={backToLeagues}/>
      {id === null ? 
        <Leagues premier={premier} bundesliga={bundesliga}/>
				:
				<Main id={id} />
				}
      
    </>
  )
}

export default App
