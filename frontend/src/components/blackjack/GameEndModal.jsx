import { Link } from "react-router-dom"

export default function GameEndModal({ blackjackState, betAmount, playerCardValues, dealerCardValues, handleStartNewGame }){
    return(
        <div className="confirmation-overlay">
            <div className="confirmation-modal">
                <div className="end-modal"> 
                    {blackjackState === "surrender" && (
                        <>
                            <h5>You have surrendered the game!</h5>
                            <h5>You get half of your bet back, {Math.round(betAmount / 2)} Forint! </h5>
                        </>
                    )}           
                    {blackjackState === "player-blackjack" && (
                        <>
                            <h5>Congratulations! You have a BLACKJACK!</h5>
                            <h5>You have receieved double of your bet, {betAmount * 2} Forint! </h5>
                        </>
                    )}
                    {blackjackState === "draw-normal" && (
                        <>
                            <h5>PUSH! You and the dealer also have {playerCardValues}.</h5>
                            <h5>You have received your original bet of {betAmount} Forint! </h5>
                        </>
                    )}
                    {blackjackState === "dealer-normal" && (
                        <>
                            <h5>BUST! You have {playerCardValues}.</h5>
                            <h5>You have lost your bet, {betAmount} Forint! </h5>
                        </>
                    )}
                    {blackjackState === "draw-blackjack" && (
                        <>
                            <h5>PUSH! You and the dealer also have a blackjack!</h5>
                            <h5>You have received your original bet of {betAmount} Forint. </h5>
                        </>
                    )}
                    {blackjackState === "dealer-blackjack" && (
                        <>
                            <h5>Dealer has a blackjack!</h5>
                            <h5>You have lost your bet, {betAmount} Forint. </h5>
                        </>
                    )}
                    {blackjackState === "dealer-gameover" && (
                        <>
                            <h5>The dealer has gone BUST! With a total of {dealerCardValues}.</h5>
                            <h5>{`You've won and receieved double of your bet, ${betAmount * 2} Forint!`}</h5>
                        </>
                    )}
                    {blackjackState === "player-gameover" && (
                        <>
                            <h5>Dealer has {dealerCardValues}, you have {playerCardValues}.</h5>
                            <h5>Dealer is closer to 21. You have lost your bet, {betAmount} Forint. </h5>
                        </>
                    )}
                    {blackjackState === "player-closer" && (
                        <>
                            <h5>Dealer has {dealerCardValues}, you have {playerCardValues}.</h5>
                            <h5>{`Your cards are closer to 21. You've won and doubled your bet! You get ${betAmount * 2} Forint!`}</h5>
                        </>
                    )}
                </div>
                <>
                    <button className="home-btn" onClick={handleStartNewGame}>Start new game</button>
                    <button><Link to="/">Back to main page</Link></button>
                </>
            </div>
        </div>
    )}