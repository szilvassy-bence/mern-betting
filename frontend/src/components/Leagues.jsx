
export default function Leagues ({premier, bundesliga}) {

  return (
    <>
			<div className="card" onClick={bundesliga}>Bundesliga</div>
			<div className="card" onClick={premier}>Premier League</div>
    </>
  )
}