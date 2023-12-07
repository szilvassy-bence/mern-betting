import { useState, useEffect } from "react"

export default function DealCards({bet, handleFirstDealEnded}) {
    const [dealId, setDealId] = useState(null)
    const [dealtCards, setDealtCards] = useState(null)
    const [blackjackState, setBlackjackState] = useState(null)


    useEffect(() => {
        fetch(`/api/blackjack/deckid`)
        .then((response) => response.json())
        .then((deck) => {
          console.log(deck);
          setDealId(deck.deck_id)
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        console.log(dealId)
        if(dealId){
            fetch(`https://www.deckofcardsapi.com/api/deck/${dealId}/draw/?count=4`)
            .then((response) => response.json())
            .then((cards) => {
            console.log(cards);
            getBlackJack(cards);
            })
            .catch((error) => console.log(error));
        }
    }, [dealId]);


    function getCardValues(card1, card2){
        console.log(card1, card2)
        const sumOfCardValues = getLetterLapValue(card1) + getLetterLapValue(card2);
        if(sumOfCardValues === 22){
            return 12;
        } else {
            return sumOfCardValues;
        }

    }

    function getLetterLapValue (card){
        const value = (card === "JACK" ? 10 : card === "QUEEN" ? 10 : card === "KING" ? 10 : card === "ACE" ? 11 : parseInt(card))
        return value
    }

    function getBlackJack (cards) {
        const playerCardValues = getCardValues(cards.cards[0].value, cards.cards[2].value);
        const dealerCardValues = getCardValues(cards.cards[1].value, cards.cards[3].value);

        const blackjack = (playerCardValues === 21 && dealerCardValues === 21) ? "draw-blackjack" :
        playerCardValues === 21 ? "player-blackjack" : dealerCardValues === 21 ? "dealer-blackjack" : "continue";
        console.log(dealtCards)
        setDealtCards(cards);
        setBlackjackState(blackjack)
        handleFirstDealEnded(dealId, cards, blackjack);
        return blackjack
    }

    return (
        <>
           { !dealId && <div className="bj-dealer-upper"><h2>Dealing cards</h2></div>}
           {/* dealId && <Dealt4Cards deckid={dealId} bet={bet}/>*/}
           { dealtCards &&(
                <>
                    <div className="bj-dealer-upper">
                        <h4>Dealers cards are:</h4>
                        {/*<div>{`${dealtCards.cards[1].value} of ${dealtCards.cards[1].suit}`}</div>
                        <div>{`${dealtCards.cards[3].value} of ${dealtCards.cards[3].suit}`}</div>
                        <div>CardValues: {getCardValues(dealtCards.cards[1].value, dealtCards.cards[3].value)}</div>*/}
                        <div className="bj-dealer">
                            <div className="bj-card"><img src={dealtCards.cards[1].images.png} alt={`${dealtCards.cards[1].value} of ${dealtCards.cards[1].suit}`} /></div>
                            {(blackjackState === 'draw-blackjack' || blackjackState === 'player-blackjack' || blackjackState === 'dealer-blackjack') && (
                                <div className="bj-card"><img src={dealtCards.cards[3].images.png} alt={`${dealtCards.cards[3].value} of ${dealtCards.cards[3].suit}`} /></div>
                            )}
                            {!blackjackState && <div className="bj-card"><img src={'https://www.deckofcardsapi.com/static/img/back.png'} alt={`Dealer's 2nd card`} /></div>}
                        </div>
                    </div>
                    <div className="bj-separator"></div>
                    <div className="bj-player-upper">
                        <h4>Your cards are:</h4>
                        {/*<div>CardValues: {getCardValues(dealtCards.cards[0].value, dealtCards.cards[2].value)}</div>
                        <div >{`${dealtCards.cards[0].value} of ${dealtCards.cards[0].suit}`}</div>
                        <div >{`${dealtCards.cards[2].value} of ${dealtCards.cards[2].suit}`}</div>*/}
                        <div className="bj-player">
                            <div className="bj-card"><img src={dealtCards.cards[0].images.png} alt={`${dealtCards.cards[0].value} of ${dealtCards.cards[0].suit}`} /></div>
                            <div className="bj-card"><img src={dealtCards.cards[2].images.png} alt={`${dealtCards.cards[2].value} of ${dealtCards.cards[2].suit}`} /></div>
                        </div>
                    </div>
                </>
           )}
            {/*{blackjackState === "continue" && <div>Continue</div>}
           {blackjackState === "draw" && <div>You have a Blackjack! Unfortunately the house also has a blackjack. You get back your bet, which is {bet}</div>}
           {blackjackState === "player" && <div>You won and doubled your bet! You get {bet * 2} back from the house! </div>}*/}
        </>
    )
}