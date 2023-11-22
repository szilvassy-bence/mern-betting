import { useState, useEffect } from "react";


export default function Leagues({ country }) {
	const [leagues, setLeagues] = useState(null);
	useEffect(() => {
		fetch(`/api/countries/${country}`)
			.then(resp => resp.json())
			.then(leaguesData => {
				setLeagues(leaguesData.response);
				console.log(leagues)
			})
			.catch(error => console.log(error))
	}, []);

	return (
		<>
			{ leagues === null ? (
				<h1>Loading</h1>
			) : (
				<div className="container">
					<div className="row">
						{ leagues.map(league => {
							return (
								<div className="col col-md2 col-sm-4" key={league.league.name}>
									<div className="card">
										<div className="card-header">
											<h2>{league.league.name}</h2>
										</div>
										<div className="card-body">
											<h2></h2>
										</div>
										<div className="card-footer">
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			)
			}
		</>
	)
}