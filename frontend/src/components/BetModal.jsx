import { useState } from "react";

export default function BetModal({ current }) {
	const betted = current.betterTeam
	const [betAmount, setBetAmount] = useState(null)
	// delete the todo item on click
	console.log(current);
	/*if (current) {
		console.log(betTeam);
        const betTeam = current.betId.slice(4,8);
    }*/
	console.log(betAmount);
	function calculateOutCome (amount, betted){
		const amountNum = parseInt(amount)
		let odds;
		if (current.odds !== undefined){
		betted === "draw" ? 
		odds = current.odds.pre["X"] :
		betted === "away" ? 
		odds = current.odds.pre[2] :
		odds = current.odds.pre[1]
		console.log(odds);
		}
	
		/*if(amountNum === NaN){
			return 0
		} else {
			return amountNum * odds
		}*/
		
	}
	

	//{current.odds !== undefined && betted === "draw" ? current.odds.pre["X"] : current.odds !== undefined && betted === "away" ? current.odds.pre[2] : current.odds.pre[1]}
	//{betted === "draw" ? current.odds.pre["X"] : betted === "away" ? current.odds.pre[2] : current.odds.pre[1]}
	// return a modal with id delete
	return (
		<div className="modal fade" id="betModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="deleteModalLabel">Do you want to bet on { betted === "draw"? " a Draw" : current[`${betted}_name`]}?</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						{betted === "draw" ? `${current.home_name} / ${current.away_name} Draw` : current[`${betted}_name`]}:  Odds <br></br>
						<input placeholder="Your Bet" onChange={(e) => setBetAmount(e.target.id)}></input>
						<p>Possible outcome: {calculateOutCome(betAmount, betted)}</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
						<button type="button" data-bs-dismiss="modal" className="btn btn-primary">Bet</button>
					</div>
				</div>
			</div>
		</div>
		)
}