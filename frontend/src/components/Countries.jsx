import {useState, useEffect} from "react";

export default function Countries() {

	const [countries, setCountries] = useState([]);

	useEffect(() => {
		fetch('/api/countries/')
			.then(response => response.json())
			.then(countries => {
				setCountries(countries.response);
				console.log(countries);
			})
			.catch(error => console.log(error))
	}, []);

	return (
		<>
			{ countries === null ? (
				<h1>Loading</h1>
			) : (
				<div className="container">
					<div className="row">
						{ countries.map(country => {
							return (
								<div className="col col-md2 col-sm-4" key={countries.name}>
									<div className="card">
										<div className="card-header">
											<h2>{country.name}</h2>
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