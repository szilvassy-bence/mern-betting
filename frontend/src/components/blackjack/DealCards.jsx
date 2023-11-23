import { useState, useEffect } from "react"
import Dealt4Cards from "./Dealt4Cards";

export default function DealCards({bet}) {
    const [dealId, setDealId] = useState(null)


    useEffect(() => {
        fetch(`/api/betting/blackjack/deckid`)
        .then((response) => response.json())
        .then((deck) => {
          console.log(deck);
          setDealId(deck.deck_id)
        })
        .catch((error) => console.log(error));
    }, []);


    return (
        <>
           { !dealId && <p>Deal Cards</p>}
           { dealId && <Dealt4Cards deckid={dealId} bet={bet}/>}
        </>
    )
}