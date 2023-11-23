import { useState } from "react";
import Main from "./Main"

export default function Leagues ({premier, bundesliga}) {
  const [id, setId] = useState(null)

  function bundesliga () {
		console.log("bundesliga clicked");
		setId("1")
	}

	function premier () {
		console.log("premier clicked");
		setId("2")
	}

  return (
    <>
    { id === null ?
      <div>
        <div className="card" onClick={bundesliga}>Bundesliga</div>
        <div className="card" onClick={premier}>Premier League</div> 
      </div> :
      <Main />
    }
			
    </>
  )
}