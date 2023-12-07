import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import BetModal from "./BetModal";


export default function League() {
  const { id } = useParams();
  console.log(id);

  const [clickedLeague, setClickedLeague] = useState(null);
  const [betCurrent, setBetCurrent] = useState(null);

  useEffect(() => {
    fetch(`/api/betting/leagues/${id}`)
      .then((response) => response.json())
      .then((league) => {
        console.log(league.league.data.fixtures);
        const data = league.league.data.fixtures
        const filterLeague = data.filter(match => match.odds.pre["1"] !== null)
        setClickedLeague(filterLeague);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleBet(e, match) {

    const betSide = e.target.id.slice(4,5);

    const betDetails = {
      id: match.id,
      betSide: betSide,
      betOdds: match.odds.pre[betSide],
      betTeam: betSide === "1" ? match.home_name : betSide === "X" ? "draw" : match.away_name
    }

    setBetCurrent({
      ...match,
      betDetails});

    console.log(betCurrent);
  }

  return (
    <>
      {clickedLeague === null ? (
        <h1>Loading</h1>
      ) : (
        <div className="container-fluid bg-dark">
          <div className="container py-5">
            <h2 className="text-light">List of matches</h2>
            <div className="row ">
              <table className="table caption-top table-sm table-bordered table-striped p-5">
                <caption className="text-light">
                  Gamble responsibly
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
                    const btnHomeOdds = `btn-1-odds-${match.id}`;
                    const btnDrawOdds = `btn-X-odds-${match.id}`;
                    const btnAwayOdds = `btn-2-odds-${match.id}`;
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
                            className="btn btn-outline-danger mx-2"
                            data-bs-toggle="modal"
                            data-bs-target="#betModal"
                            onClick={(e) => handleBet(e, match)}
                          >
                            {match.odds.pre["1"] ? match.odds.pre["1"] : "N/A"}
                          </button>
                        </td>
                        <td>
                          <button
                            id={btnDrawOdds}
                            className="btn btn-outline-success"
                            data-bs-toggle="modal"
                            data-bs-target="#betModal"
                            onClick={(e) => handleBet(e, match)}
                          >
                            {match.odds.pre["X"] ? match.odds.pre["X"] : "N/A"}
                          </button>
                        </td>
                        <td>
                          <button
                            id={btnAwayOdds}
                            className="btn btn-outline-success"
                            data-bs-toggle="modal"
                            data-bs-target="#betModal"
                            onClick={(e) => handleBet(e, match)}
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
              <BetModal betCurrent={betCurrent} setBetCurrent={setBetCurrent} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
