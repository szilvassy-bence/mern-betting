import { useState, useEffect } from "react"
import DealCards from "./blackjack/DealCards";

export default function Blackjack() {
    const [gameStage, SetGameStage] = useState('start');
    const [betAmount, SetBetAmount] = useState(null);

    function setStage(stage) {
        SetGameStage(stage)
    }

    function handlePlaceBet(){
        const inputAmount = document.getElementById('user-bet').value;
        if(inputAmount){
            SetGameStage('deal');
            SetBetAmount(inputAmount)
        }
    }


    return (
        <div>
            {gameStage === 'start' && (
                <>
                    <p>Press start if you are ready to play Blackjack!</p>
                    <button onClick={() => setStage('placeBet')}>Start Blackjack!</button>
                </>
            )}
            {gameStage === 'placeBet' && (
                <>
                    <p>Place your bet to start the game!</p>
                    <input id='user-bet' type='number' placeholder='0'></input>
                    <button onClick={handlePlaceBet}>Place bet!</button>
                </>
            )}
            {gameStage === 'deal' && <DealCards bet={betAmount}/>}
        </div>
    )
}