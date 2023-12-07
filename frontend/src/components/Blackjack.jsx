import { useState, useEffect, useContext } from "react"
import { SearchContext } from "../contexts/SearchContext";
import DealCards from "./blackjack/DealCards";
import PlayerRound from "./blackjack/PlayerRound";
import DealerRound from "./blackjack/DealerRound";
import GameEndModal from "./blackjack/GameEndModal";
import './blackjack.css'

export default function Blackjack() {
    const [gameStage, SetGameStage] = useState('start');
    const [betAmount, SetBetAmount] = useState(null);
    const [deckId, setDeckId] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [blackjackState, setBlackjackState] = useState(null);
    const [dealerCardValues, setDealerCardValues] = useState(null);
    const [playerCardValues, setPlayerCardValues] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { setFunds, funds, user } = useContext(SearchContext)

    function handleBet(){
        console.log(funds)
        if(betAmount <= funds){
            setFunds(funds - betAmount)
            SetGameStage('deal')
        } else {
            window.alert(`You do not have enough money. You can place a maximum of ${funds} bet!`);
        }
    }

    async function handleFinalResult(winMoney){
        const bet = await fetch(`/api/user/deposit/jack/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              deposit: funds + betAmount + winMoney,
            })
          })

          setFunds(funds + betAmount + winMoney)
          //console.log(typeof funds, typeof betAmount, typeof winMoney)

          if(bet.status === 200){
            console.log("Successful patch");
          } else {
            console.log("Problem fetching");
          } 
    
          if (bet.status === 200) {
            console.log("Successful post method");
          } else {
            console.log("Problem sending bet");
          }
    }


    function handleSurrender() {
        console.log(123)
        const moneyMinus = Math.round((-betAmount)/2)
        handleFinalResult(moneyMinus)
        setBlackjackState('surrender')
        setShowModal(true)
    }

    function handleFirstDealEnded(deck, dealtCards, blackjack){
        console.log(deck)
        console.log(dealtCards)
        console.log(blackjack)
        setDeckId(deck)
        setPlayerCards([dealtCards.cards[0], dealtCards.cards[2]]);
        setDealerCards([dealtCards.cards[1], dealtCards.cards[3]]);
        if(blackjack === 'draw-blackjack'){
            setFunds(funds + betAmount)
        } 
        if(blackjack === 'player-blackjack'){
            const moneyWon = (betAmount) * 2
            handleFinalResult(moneyWon)
        }
        if(blackjack === 'dealer-blackjack'){
            const moneyLost = -betAmount
            handleFinalResult(moneyLost)
        }
        //blackjack === 'continue' ? SetGameStage('player-round') : setBlackjackState(blackjack);
        if (blackjack === 'continue') {
            SetGameStage('player-round');
          } else {
            setTimeout(() => {
              setBlackjackState(blackjack);
              setShowModal(true);
            }, 2000);
          }
    }

    /*function handlePlayerRound( playerCardValue){
        if(playerCardValue === 21 ){
            setBlackjackState('player')
        }
        if(playerCardValue > 21){
            setBlackjackState('dealer-normal')
        }
    }*/

    const handlePlayerRound = (playerCardValue) => {
        handlePlayerRoundLogic(playerCardValue);
      
        // Show modal after 2500 milliseconds
        setTimeout(() => {
          setShowModal(true);
        }, 2500);
      };

    const handlePlayerRoundLogic = (playerCardValue) => {
        setPlayerCardValues(playerCardValue);
        if (playerCardValue === 21) {
          const moneyWon = (betAmount) * 2
          handleFinalResult(moneyWon)
          setBlackjackState('player-blackjack');
        }
        if (playerCardValue > 21) {
          const moneyLost = -betAmount
          handleFinalResult(moneyLost)
          setBlackjackState('dealer-normal');
        }
      };




    function playerStand(newCards, cardValues){
        if(newCards.length === 0 ){
            setDealerCardValues(dealerInitialValue())
            setPlayerCardValues(cardValues)
            console.log('neww round')
            SetGameStage('dealer-round')
        } else {
            const cards = [...playerCards, ...newCards]
            setPlayerCards(cards)
            setDealerCardValues(dealerInitialValue())
            setPlayerCardValues(cardValues)
            console.log('neww round')
            SetGameStage('dealer-round')
        }
    }

    const dealerInitialValue = () => {
        let dealerCardValues;
        const initialCardValues = [dealerCards[0], dealerCards[1]];
        const hasTwoAces = initialCardValues.filter(card => card.value === 'ACE');
        const notAces = initialCardValues.filter(card => card.value !== 'ACE');
        const valueOfNotAces = notAces.map(card => {
            if(card.value === "JACK" || card.value === "QUEEN" || card.value === "KING"){
                return 10;
            } else {
                return parseInt(card.value)
            }
        })
        let sumOfNotAces;
        if(valueOfNotAces.length >= 1){
            sumOfNotAces = valueOfNotAces.reduce((total, number) => total + number);
        } else {
            sumOfNotAces = 0;
        }

        if(hasTwoAces.length === 2){
            dealerCardValues = 12;
        } 
        if (hasTwoAces.length === 0){
            dealerCardValues = sumOfNotAces;
        } 
        if((hasTwoAces.length === 1)) {
            sumOfNotAces + 11 >= 17 ? dealerCardValues = sumOfNotAces + 11 : dealerCardValues = sumOfNotAces + 1
        }
        return dealerCardValues;
    }

    /*const endOfDeals = (cards = dealerCards, cardValues = dealerCardValues) => {
        console.log(cards);
        console.log(cardValues)
        setDealerCardValues(cardValues)

        if(cardValues=== 21){
            setBlackjackState('dealer-bj')
        } else if(cardValues > 21){
            setBlackjackState('dealer-gameover')
        } else if(cardValues > playerCardValues){
            setBlackjackState('player-gameover')
        } else if(cardValues < playerCardValues){
            setBlackjackState('player-closer')
        } else if(cardValues === playerCardValues){
            setBlackjackState('draw-normal')
        } else {
            setBlackjackState('dealer-gameover')
        }
        setTimeout(() => {
            setShowModal(true);
          }, 2500);
    }*/

    const endOfDeals = (cards = dealerCards, cardValues = dealerCardValues) => {
        console.log(cards);
        console.log(cardValues);
        
        handleEndOfDeals(cardValues);
      
        // Show modal after 2500 milliseconds
        setTimeout(() => {
          setShowModal(true);
        }, 2500);
      };

    const handleEndOfDeals = (cardValues) => {
        setDealerCardValues(cardValues);
      
        // Logic to check blackjackState based on updated values
        if (cardValues === 21) {
          const moneyLost = -betAmount
          handleFinalResult(moneyLost)
          setBlackjackState('dealer-blackjack');
        } else if (cardValues > 21) {
          const moneyWon = (betAmount) * 2
          handleFinalResult(moneyWon)
          setBlackjackState('dealer-gameover');
        } else if (cardValues > playerCardValues) {
          const moneyLost = -betAmount
          handleFinalResult(moneyLost)
          setBlackjackState('player-gameover');
        } else if (cardValues < playerCardValues) {
          const moneyWon = (betAmount) * 2
          handleFinalResult(moneyWon)
          setBlackjackState('player-closer');
        } else if (cardValues === playerCardValues) {
          setFunds(funds + betAmount)
          setBlackjackState('draw-normal');
        } else {
          const moneyWon = (betAmount) * 2
          handleFinalResult(moneyWon)
          setBlackjackState('dealer-gameover');
        }
      };

      function handleStartNewGame(){
        SetBetAmount(null);
        setDeckId(null);
        setPlayerCards([])
        setDealerCards([])
        setBlackjackState(null)
        setDealerCardValues(null)
        setPlayerCardValues(null)
        setShowModal(null)
        SetGameStage('placeBet')
      }

      

    return (
        <>
        <div className="bl-starter">
            {gameStage === 'start' && (
                <div className="middle">
                    <h2 className="bl-h2">Press start if you are ready to play Blackjack!</h2>
                    <button onClick={() => SetGameStage('placeBet')}>Start Blackjack!</button>
                </div>
            )}
            {gameStage === 'placeBet' && (
                <div className="middle">
                    <h2 className="bl-h2">Place your bet to start the game!</h2>
                    <input className="bl-input" id='user-bet' type='number' placeholder='0' min='0' max={funds} value={betAmount} 
                    onChange={(e) => SetBetAmount(parseInt(e.target.value))}></input>
                    <button onClick={()=>handleBet()}>Place bet!</button>
                </div>
            )}
            {gameStage === 'deal' && <DealCards bet={betAmount} handleFirstDealEnded={handleFirstDealEnded}/>}
            {gameStage === 'player-round' && <PlayerRound deckId={deckId} playerCards={playerCards} dealerCards={dealerCards} 
            handlePlayerRound={handlePlayerRound} playerStand={playerStand} handleSurrender={handleSurrender}/>}
            {gameStage === 'dealer-round' && <DealerRound deckId={deckId} playerCards={playerCards} dealerCards={dealerCards} 
            dealerCardValues={dealerCardValues} playerCardValues={playerCardValues} gameOver={endOfDeals}/>}
            {/*blackjackState === "player-round" && <div>Continue</div>*/}
            {/*blackjackState === "draw-blackjack" && <div>You have a Blackjack! Unfortunately the house also has a blackjack. You get back your bet, which is {betAmount}</div>}
            {blackjackState === "draw-normal" && <div>Cards values are the same for you and the dealer. You get back your bet, which is {betAmount}</div>}
            {blackjackState === "player" && <div>You won and doubled your bet! You get {betAmount * 2} back from the house! </div>}
            {blackjackState === "dealer-blackjack" && <div>The house has a blackjack, but you do not. You have lost your bet, {betAmount} </div>}
            {blackjackState === "dealer-normal" && <div>Your cards value is more than 21. You have lost your bet, {betAmount} </div>}
            {blackjackState === "dealer-gameover" && <div>The dealers cards value is more than 21. You won and doubled your bet! You get {betAmount * 2}! </div>}
            {blackjackState === "player-gameover" && <div>The dealers cards values are closer to 21. You have lost your bet, {betAmount} </div>}
            {blackjackState === "player-closer" && <div>Your cards values are closer to 21. You won and doubled your bet! You get {betAmount * 2}! </div>*/}
        </div>
        {/*Modal*/}
        {showModal && <GameEndModal blackjackState={blackjackState} betAmount={betAmount} playerCardValues={playerCardValues}
        dealerCardValues={dealerCardValues} handleStartNewGame={handleStartNewGame}/>}
        {/*showModal && (
            <div className="confirmation-overlay">
                <div className="confirmation-modal">
                    <div className="end-modal">            
                        {blackjackState === "player-blackjack" && (
                            <>
                                <h5>You have a BLACKJACK!.</h5>
                                <h5>You doubled your bet, you get {betAmount} Forint! </h5>
                            </>
                        )}
                        {blackjackState === "draw-normal" && (
                            <>
                                <h5>PUSH! You and the dealer also have {playerCardValues}.</h5>
                                <h5>You get back your bet, {betAmount} Forint! </h5>
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
                                <h5>You get back your bet, {betAmount} Forint. </h5>
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
                                <h5>Dealer BUST! Dealer has {dealerCardValues}.</h5>
                                <h5>You won and doubled your bet! You get {betAmount * 2} Forint! </h5>
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
                                <h5>Your cards are closer to 21. You won and doubled your bet! You get {betAmount * 2} Forint! </h5>
                            </>
                        )}
                    </div>
                    <>
                        <button onClick={handleStartNewGame}>Start new game</button>
                        <button>Back to main page</button>
                    </>
                </div>
            </div>
                        )*/}
        </>
    )
}