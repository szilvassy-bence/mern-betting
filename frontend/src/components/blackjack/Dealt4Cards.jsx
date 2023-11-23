import { useState, useEffect } from "react"

export default function Dealt4Cards( {deckid, bet} ) {
    const [dealtCards, setDealtCards] = useState(null)
    const [blackjackState, setBlackjackState] = useState(null)


    useEffect(() => {
        console.log(deckid)
        fetch(`https://www.deckofcardsapi.com/api/deck/${deckid}/draw/?count=4`)
        .then((response) => response.json())
        .then((cards) => {
          console.log(cards);
          setDealtCards(cards);
          getBlackJack(cards);
        })
        .catch((error) => console.log(error));
    }, []);


    function getCardValues(card1, card2){
        console.log(card1, card2)

        return getLetterLapValue(card1) + getLetterLapValue(card2)
    }


    function getLetterLapValue (card){
        const value = (card === "JACK" ? 10 : card === "QUEEN" ? 10 : card === "KING" ? 10 : card === "ACE" ? 11 : parseInt(card))
        return value
    }

    function getBlackJack (cards) {
        const playerCardValues = getCardValues(cards.cards[0].value, cards.cards[2].value);
        const dealerCardValues = getCardValues(cards.cards[1].value, cards.cards[3].value);

        const blackjack = (playerCardValues === 21 && dealerCardValues === 21) ? "draw" :
        playerCardValues === 21 ? "player" : "continue";
        setBlackjackState(blackjack)

        return blackjack
    }


    return (
        <>
           { !dealtCards && <p>Started dealing Cards</p>}
           { dealtCards &&(
                <>
                    <div>
                        <p>Dealers cards are:</p>
                        <div>{`${dealtCards.cards[1].value} of ${dealtCards.cards[1].suit}`}</div>
                        <div>{`${dealtCards.cards[3].value} of ${dealtCards.cards[3].suit}`}</div>
                        <div>CardValues: {getCardValues(dealtCards.cards[1].value, dealtCards.cards[3].value)}</div>
                    </div>
                    <div>------------------------------------------------------------------------</div>
                    <div>
                        <p>Players cards are:</p>
                        <div>{`${dealtCards.cards[0].value} of ${dealtCards.cards[0].suit}`}</div>
                        <div>{`${dealtCards.cards[2].value} of ${dealtCards.cards[2].suit}`}</div>
                        <div>CardValues: {getCardValues(dealtCards.cards[0].value, dealtCards.cards[2].value)}</div>
                    </div>
                    <div>------------------------------------------------------------------------</div>
                </>
           )}
           {blackjackState === "continue" && <div>Continue</div>}
           {blackjackState === "draw" && <div>You have a Blackjack! Unfortunately the house also has a blackjack. You get back your bet, which is {bet}</div>}
           {blackjackState === "player" && <div>You won and doubled your bet! You get {bet * 2} back from the house! </div>}

        </>
    )
}