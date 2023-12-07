import { useState, useContext, useRef } from "react";
import { SearchContext } from "../contexts/SearchContext";

export default function BetModal({ betCurrent, setBetCurrent, ref }) {

  const { setFunds, funds } = useContext(SearchContext)

	const amountRef = useRef(0);


  function onAmountChange() {
    console.log(amountRef.current.value);
		const amount = amountRef.current.value;

		setBetCurrent({
			...betCurrent,
			betDetails: {
				...betCurrent.betDetails,
				betAmount: amount,
				betWin: amount * betCurrent.betDetails.betOdds
			}
		})
  }

  async function onSubmit(e) {
    e.preventDefault();
    if(betCurrent.betAmount > funds) {
      
    }
    const formEl = document.getElementById("form-betModal");
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    data.matchid = betCurrent.id;
    console.log(data);

    const resp = await fetch("/api/betting/league/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (resp.status === 200) {
      console.log("Successful post method");
    } else {
      console.log("Problem sending bet");
    }
  }

  // on select element
  function onSelectChange(e) {
    const betSide = e.target.value;
    //console.log(betSide);

    setBetCurrent({
      ...betCurrent,
      betDetails: {
        ...betCurrent.betDetails,
        betSide: betSide,
        betOdds: betCurrent.odds.pre[betSide],
				betWin:
					betCurrent.betDetails.betAmount
					? betCurrent.betDetails.betAmount * betCurrent.odds.pre[betSide]
					: 0,
        betTeam:
          betSide === "1"
            ? betCurrent.home_name
            : betSide === "X"
            ? "draw"
            : betCurrent.away_name,
      },
    });
  }

  function handleClose() {
    setBetCurrent(null);
    console.log(betCurrent);
  }

  // create a form that when the user sumbit sends a fetch to the server to store the betting in database

  return betCurrent ? (
    <div
      ref={ref}
      className="modal fade"
      id="betModal"
      tabIndex="-1"
      aria-labelledby="betModalLabel"
      data-bs-backdrop="static"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="betModalLabel">
              {betCurrent.home_name} vs. {betCurrent.away_name}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h3>It's time to make your bet!</h3>
            <form className="form" onSubmit={onSubmit} id="form-betModal">
              <label htmlFor="form-select-betModal"  className="form-label">Result</label>
              <select
                name="betSide"
                onChange={onSelectChange}
                defaultValue={betCurrent.betDetails.betSide}
                className="form-control mb-3"
                id="form-select-betModal"
              >
                <option value="1" name="home">
                  Home
                </option>
                <option value="X" name="draw">
                  Draw
                </option>
                <option value="2" name="away">
                  Away
                </option>
              </select>
              <label htmlFor="input-betAmount" className="form-label">
                Amount
              </label>
              <input
                name="betAmount"
                type="number"
                className="form-control mb-3"
                onChange={onAmountChange}
                id="input-betAmount"
                placeholder="$ 0.00"
								ref={amountRef}
              />
              <label htmlFor="input-betOdds" className="form-label">
                Odds
              </label>
              <input
                name="betOdds"
                type="number"
                readOnly
                className="form-control mb-3"
                id="input-betOdds"
                value={betCurrent.betDetails.betOdds}
              />
              <label htmlFor="input-betWin" className="form-label">
                Possible win
              </label>
              <input
                name="betWin"
                type="number"
                readOnly
                className="form-control mb-3"
                id="input-betWin"
								value={betCurrent.betDetails.betWin ? betCurrent.betDetails.betWin : 0}
              />
              <button
                type="button"
                id="betModal-cancel"
                className="btn btn-secondary mx-3"
                data-bs-dismiss="modal"
								onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                id="betModal-submit"
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Bet
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
