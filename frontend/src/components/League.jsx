import { useEffect, useState } from "react";

export default function League({ id }) {

	const [clickedleague, setClickedLeague] = useState(null);

	useEffect(() => {
		fetch(`/api/countries/country/${id}/standings`)
			.then(resp => resp.json())
			.then(data => {
				setClickedLeague(data.response[0].language.standings);
				console.log(clickedleague);
			})
	}, [])

	/*return (
 		<>
			<div className="container">
				<div className="row">
					{
						league.map(team => {
							console.log(team);
							return (
								<div className="col col-md-2 col-sm-4">
									<div className="card">
										<div className="card-header">
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</> 
	)*/
		
}