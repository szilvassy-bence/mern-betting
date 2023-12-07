import express from "express";
const router = express.Router();
import Bet from "../models/BetModel.js"


const liveScoreKeys = {
	key: "jTOINGjDJbOFpJbb",
	secretKey: "PROUA1CySxYZqpeJi2s5ILJsWx7mhix7"
}

// GET a league
router.get("/leagues", async (req, res) => {
	try {
		const resp = await fetch(`https://livescore-api.com/api-client/competitions/list.json?&key=jTOINGjDJbOFpJbb&secret=PROUA1CySxYZqpeJi2s5ILJsWx7mhix7`);
		const list = await resp.json();
		const leagues = list.data.competition.filter(comp => comp.is_league === "1" && comp.tier === "1")
		return res.status(200).json(leagues)
	} catch (err) {
		console.log("Problem fetchingggg");
		res.status(500).json({})
	}
})


router.get("/leagues/:leagueId", async (req, res) => {
	const leagueId = req.params.leagueId;
	console.log(leagueId);
	try {
		const resp = await fetch(`https://livescore-api.com/api-client/fixtures/matches.json?&key=${liveScoreKeys.key}&secret=${liveScoreKeys.secretKey}&competition_id=${leagueId}`);
		const league = await resp.json();
		console.log(league);
		res.status(200).json({league});
	} catch(error) {
		console.log(error);
		res.status(500).json({})
	}
})


router.post("/league/new", async (req, res) => {
	const { data } = req.body;
	data.betAmount = Number(data.betAmount);
	data.betOdds = Number(data.betOdds);
	data.betWin = Number(data.betWin);
	console.log(data);
	
	try {
		const bet = await Bet.create( data );
		res.status(200).json({bet})
	} catch(err) {
		console.log(err);
		res.status(500).json({err})
	}
})


export default router;

