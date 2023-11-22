import { useState, useEffect } from "react";
import BetModal from "./BetModal";

export default function Countries() {
  const [clickedLeague, setClickedLeague] = useState(null);
  const [betCurrent, setBetCurrent] = useState({})

  useEffect(() => {
    fetch("/api/betting/2")
      .then((response) => response.json())
      .then((league) => {
        console.log(league.league.data.fixtures);
        setClickedLeague(league.league.data.fixtures);
      })
      .catch((error) => console.log(error));
  }, []);

  function betHome(e, match, better) {

		console.log(e.target.id);
		//  match.betId = e.target.id;
		match.betterTeam = better;
		setBetCurrent(match);
  }

  return (
    <>
      {clickedLeague === null ? (
        <h1>Loading</h1>
      ) : (
        <div className="container-fluid bg-dark">
          <div className="container py-5">
            <h2 className="text-light">Check your todos!</h2>
            <div className="row ">
              <table className="table caption-top table-sm table-bordered table-striped p-5">
                <caption className="text-light">
                  You can delete and update them!
                </caption>
                <thead className="table-light">
                  <tr className="table-primary align-middle">
                    <th scope="col">#</th>
                    <th scope="col">Home</th>
                    <th scope="col">Away</th>
                    <th scope="col">Kickoff time:</th>
                    <th scope="col">Home odds</th>
                    <th scope="col">Draw odds</th>
                    <th scope="col">Away odds</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {clickedLeague.map((match, index) => {
                    const btnHomeOdds = `btn-home-odds-${match.id}`;
                    const btnDrawOdds = `btn-draw-odds-${match.id}`;
                    const btnAwayOdds = `btn-away-odds-${match.id}`;
                    return (
                      <tr
                        className="table-primary align-middle"
                        key={match._id}
                      >
                        <th scope="row">{index + 1}</th>
                        <td>{match.home_name}</td>
                        <td>{match.away_name}</td>
                        <td>
                          {new Date(match.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </td>
                        <td>
                          <button
                            id={btnHomeOdds}
                            onClick={(e) => betHome(e, match, 'home')}
                            className="btn btn-outline-danger mx-2"
                            data-bs-toggle="modal"
                            data-bs-target="#betModal"
                          >
                            {match.odds.pre["1"]
                              ? match.odds.pre["1"]
                              : "Not available yet"}
                          </button>
                        </td>
                        <td>
                          <button
                            id={btnDrawOdds}
                            className="btn btn-outline-success"
                          >
                            {match.odds.pre["X"] ? match.odds.pre["X"] : "N/A"}
                          </button>
                        </td>
                        <td>
                          <button
                            id={btnAwayOdds}
                            className="btn btn-outline-success"
                          >
                            {match.odds.pre["2"] ? match.odds.pre["2"] : "N/A"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  ;
                </tbody>
              </table>
              <BetModal current={betCurrent}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
