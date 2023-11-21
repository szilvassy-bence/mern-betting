import express from "express";
const router = express.Router();

const headers = {
	"x-rapidapi-host": "v3.football.api-sports.io",
	"x-rapidapi-key": "f5507ae68a7fbb3daa338d43fc2f951f"
}

// GET all countries
router.get("/", async (req, res) => {
	try {
		const resp = await fetch("https://v3.football.api-sports.io/countries", {
			method: "GET",
			headers: headers
		});
		const countries = await resp.json();
		res.send(countries);
	} catch (error) {
		console.log(error);
	}

})

// GET all leagues in a country
router.get("/:country", async (req, res) => {
	const country = req.params.country;
	//console.log(country);
	try {
		const resp = await fetch(`https://v3.football.api-sports.io/leagues?country=${country}&season=2023`, {
			method: "GET",
			headers: headers
		});
		const countries = await resp.json();
		console.log(countries);
		res.send(countries);
	} catch(error) {
		console.log(error);
	}
})

// GET a league
router.get("/:country/:id", async (req, res) => {
	const country = req.params.country;
	const id = req.params.id;

	try {
		const resp = await fetch(`https://v3.football.api-sports.io/leagues?season=2023&id=${id}`, {
			method: "GET",
			headers: headers
		});
		const leagues = await resp.json();
		res.send(leagues)
	} catch (err) {
		console.log("Problem fetching");
	}
})


// GET standings 
router.get("/:country/:id/standings", async (req, res) => {
	const country = req.params.country;
	const id = req.params.id;

	try {
		const resp = await fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=2023`, {
			method: "GET",
			headers: headers
		});
		const leagues = await resp.json();
		res.send(leagues)
	} catch (err) {
		console.log("Problem fetching");
	}
})


export default router;

