import { useEffect, useState } from "react";

export default function DealerRound({deckId, playerCards, dealerCards, dealerCardValues, playerCardValues, gameOver}) {

    const [dealerNewCards, setDealerNewCards] = useState([]);
    const [cardValues, setCardValues] = useState([dealerCardValues]);
    const [startDealing, setStartDealing] = useState(false)
    const [buttonVisibility, setButtonVisibility] = useState(true);

    useEffect(() => {
        if(startDealing === true && cardValues[0] < 17) {
            console.log(`${dealerCardValues} is less than 16, Dealer has to deal a new card`)
            fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then((response) => response.json())
                .then((card) => {
                console.log(card);
                console.log(dealerCardValues)
                setDealerNewCards([...dealerNewCards, card.cards[0]])
                countDealerCards(card)
        })
        .catch((error) => console.log(error));
        } else if(startDealing === false && dealerCardValues > playerCardValues){
            setButtonVisibility(false)
            gameOver();
        } else if(startDealing === false && dealerCardValues > 16){
            setButtonVisibility(false)
            gameOver();
        }else {
            console.log(`startDealing is ${startDealing} or ${dealerCardValues} is bigger than 16, Dealer has to stand.`)
        } 
    }, [startDealing, cardValues]);


    function countDealerCards(card){
        let sumOfAllCards;

        const initialCardValues = [dealerCards[0], dealerCards[1]];
        const alreadyDeltCardValues = dealerNewCards;
        const newCardValues = card.cards[0];
        const actualCards = [...initialCardValues, ...alreadyDeltCardValues, newCardValues];
        //console.log(actualCards)

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
            } else if(sumOfNotAces + 11 >= 17 || sumOfNotAces + 11 < 21){
                sumOfAllCards = sumOfNotAces + 11
            } else {
                sumOfAllCards = [sumOfNotAces + 11, sumOfNotAces + 1]
            }
        }

            if(sumOfAllCards.length === 1 && sumOfAllCards[0] >= 17){
                console.log(`${sumOfAllCards[0]} is more than 16, dealer round ended.`)
                setButtonVisibility(false)
                gameOver(actualCards, sumOfAllCards[0])
            } else {
                setTimeout(() => {
                    setCardValues(sumOfAllCards);
                  }, 1500);
                console.log(`${sumOfAllCards[0]} is less than 17, dealer needs to deal another card.`)
            }
       
    }

    //<div key={`${card.code}-${index}`}>{`${card.value} of ${card.suit}`}</div>
    return(
        <>
            <div className="bj-dealer-upper">
                <h4 key="dealer-cards">Dealers cards are:</h4>
                {/*<div key={`${dealerCards[0].value}-1`}>{`${dealerCards[0].value} of ${dealerCards[0].suit}`}</div>
                <div key={`${dealerCards[0].value}-2`}>{`${dealerCards[1].value} of ${dealerCards[1].suit}`}</div>*/}
                <div className="bj-dealer">
                    <div className="bj-card"><img src={dealerCards[0].images.png} alt={`${dealerCards[0].value} of ${dealerCards[0].suit}`} /></div>
                    <div className="bj-card"><img src={dealerCards[1].images.png} alt={`${dealerCards[1].value} of ${dealerCards[1].suit}`} /></div>
                    {dealerNewCards.length > 0 && dealerNewCards.map((card,index) => (
                        <div className="bj-card" key={`${card.code}-${index}`}><img src={card.images.png} alt={`${card.value} of ${card.suit}`} /></div>
                    ))}
                </div>
            </div>
                <div className="bj-separator">{buttonVisibility && <button onClick={()=>{setStartDealing(true)}}>Start dealer round!</button>}</div>
                <div className="bj-player-upper">
                <h4 key="players-cards">You have {playerCardValues} with the following cards: </h4>
                <div className="bj-player">
                    {playerCards && playerCards.map((card,index) => (
                        <div className="bj-card" key={`${card.code}-${index}`}><img src={card.images.png} alt={`${card.value} of ${card.suit}`} /></div>
                    ))}
                </div>
            </div>
        </>
    )
}