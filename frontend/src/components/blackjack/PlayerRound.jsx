import { useState } from "react";

export default function PlayerRound( {deckId, playerCards, dealerCards, handlePlayerRound, playerStand, handleSurrender} ) {
    const [playerNewCards, setPlayerNewCards] = useState([])
    const [cardValues, setCardValues] = useState([])
    const [buttonVisibility, setButtonVisibility] = useState(true)

    //console.log(dealerCards)


    function dealCard(){
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then((response) => response.json())
        .then((card) => {
          //console.log(card);
          setPlayerNewCards([...playerNewCards, card.cards[0]])
          countPlayerCards('hit', card)
        })
        .catch((error) => console.log(error));
    }

    function countPlayerCards(userClick, card){
        let sumOfAllCards;
        let actualCards;

        const initialCardValues = [playerCards[0], playerCards[1]];
        const alreadyDeltCardValues = playerNewCards;

        if(userClick === 'hit'){
            const newCardValues = card.cards[0];
            actualCards = [...initialCardValues, ...alreadyDeltCardValues, newCardValues];
        }
        if(userClick === 'stand'){
            actualCards = [...initialCardValues, ...alreadyDeltCardValues];
        }

        const hasTwoAces = actualCards.filter(card => card.value === 'ACE');
        const notAces = actualCards.filter(card => card.value !== 'ACE');
        const valueOfNotAces = notAces.map(card => {
            if(card.value === "JACK" || card.value === "QUEEN" || card.value === "KING"){
                return 10;
            } else {
                return parseInt(card.value)
            }
        })
        let sumOfNotAces = 0;
        if(valueOfNotAces.length >= 2){
            sumOfNotAces = valueOfNotAces.reduce((total, number) => total + number);
        } 
        if(valueOfNotAces.length === 1){
            [sumOfNotAces] = valueOfNotAces;
        } 

        if(hasTwoAces.length === 0 ){
            sumOfAllCards = [sumOfNotAces];
        }

        let valueOfAces = 0;
        if(hasTwoAces.length === 2){
            valueOfAces = 12;
            sumOfAllCards = [valueOfAces + sumOfNotAces]
        } 
        if(hasTwoAces.length > 2){
            valueOfAces = 11 + hasTwoAces.length - 1;
            sumOfAllCards = [valueOfAces + sumOfNotAces]
        }

        if(hasTwoAces.length === 1){
            if(sumOfNotAces + 11 > 21){
                sumOfAllCards = [sumOfNotAces + 1];
            } else if ((sumOfNotAces + 11 === 21) || (sumOfNotAces + 1 === 21)){
                sumOfAllCards = [21];
            } else {
                sumOfAllCards = [sumOfNotAces + 11, sumOfNotAces + 1]
            }
        }
        console.log(sumOfAllCards)

        if(userClick === 'hit'){
            if(sumOfAllCards.length === 1 && sumOfAllCards[0] >= 21){
                setButtonVisibility(false)
                handlePlayerRound(sumOfAllCards[0])
            } else {
                setCardValues(sumOfAllCards);
            }
        }
        if(userClick === 'stand'){
            console.log('stand')
            let cardsExactValue;
            if(sumOfAllCards.length === 1){
                [cardsExactValue] = sumOfAllCards;
            }
            if(sumOfAllCards.length === 2){
                console.log(sumOfAllCards)
                cardsExactValue = Math.max(...sumOfAllCards);
            }
            setButtonVisibility(false)
            playerStand(playerNewCards, cardsExactValue)
        }
    }

    function playerSurrender(){
        setButtonVisibility(false)
        handleSurrender()
    }


    return(
        <>
            <div className="bj-dealer-upper">
                <h4>Dealers cards are:</h4>
                {/*<div>{`${dealerCards[0].value} of ${dealerCards[0].suit}`}</div>
                <div >{`${dealerCards[1].value} of ${dealerCards[1].suit}`}</div>*/}
                <div className="bj-dealer">
                    <div className="bj-card"><img src={dealerCards[0].images.png} alt={`${dealerCards[0].value} of ${dealerCards[0].suit}`} /></div>
                    {/*<div className="bj-card"><img src={dealerCards[1].images.png} alt={`${dealerCards[1].value} of ${dealerCards[1].suit}`} /></div>*/}
                    <div className="bj-card"><img src={'https://www.deckofcardsapi.com/static/img/back.png'} alt={`Dealer's 2nd card`} /></div>
                </div>
            </div>
            <div className="bj-separator">
            {buttonVisibility && (
                        <div>
                            <button onClick={dealCard}>Hit!</button>
                            <button onClick={()=>countPlayerCards('stand')}>Stand!</button>
                            {playerNewCards.length === 0 && <button onClick={playerSurrender}>Surrender!</button>}
                        </div>
                    )}
            </div>
            <div className="bj-player-upper">
                <h4 key="players-cards">Your cards are:</h4>
                {/*<div key={`${playerCards[0].value}-1`}>{`${playerCards[0].value} of ${playerCards[0].suit}`}</div>
                <div key={`${playerCards[0].value}-2`}>{`${playerCards[1].value} of ${playerCards[1].suit}`}</div>*/}
                <div className="bj-player">
                    <div className="bj-card"><img src={playerCards[0].images.png} alt={`${playerCards[0].value} of ${playerCards[0].suit}`} /></div>
                    <div className="bj-card"><img src={playerCards[1].images.png} alt={`${playerCards[1].value} of ${playerCards[1].suit}`} /></div>
                    {playerNewCards.length > 0 && playerNewCards.map((card,index) => (
                        <div className="bj-card" key={`${card.code}-${index}`}><img src={card.images.png} alt={`${card.value} of ${card.suit}`} /></div>
                    ))}
                </div>
            </div>
            {/*cardValues.length === 2 && <div>Your cards value can be {`${cardValues[0]} or ${cardValues[1]}`} </div>*/}
            {/*cardValues.length === 1 && <div>Your cards value is {cardValues[0]} </div>*/}
        </>
    )
}