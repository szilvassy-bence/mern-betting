
export default function StarterPage ({ goToPages }) {

    return (
        <>
        <div>
            <button onClick={() => goToPages("blackjack")}>Go to Blackjack</button>
        </div>
        <div>
            <button onClick={() => goToPages("sportbet")}>Go to SportBet</button>
        </div>
        </>
    )
}