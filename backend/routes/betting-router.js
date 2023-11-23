import express from "express";
const router = express.Router();

const liveScoreKeys = {
	key: "jTOINGjDJbOFpJbb",
	secretKey: "PROUA1CySxYZqpeJi2s5ILJsWx7mhix7"
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
router.get("/:leagueId", async (req, res) => {
	const leagueId = req.params.leagueId;
	console.log(leagueId);
	try {
		const resp = await fetch(`https://livescore-api.com/api-client/fixtures/matches.json?&key=${liveScoreKeys.key}&secret=${liveScoreKeys.secretKey}&competition_id=${leagueId}`);
		const league = await resp.json();
		console.log(league);
		res.json({league});
	} catch(error) {
		console.log(error);
	}
})

//BlackjackID
router.get("/blackjack/deckid", async (req, res) => {
	console.log("asd")
	try {
		const resp = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
		const deckId = await resp.json();
		console.log(deckId);
		res.send(deckId);
	} catch (error) {
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

