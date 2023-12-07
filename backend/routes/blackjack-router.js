import express from "express";
const router = express.Router();

//BlackjackID
router.get("/deckid", async (req, res) => {
	console.log("Getting deckid")
	try {
		const resp = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
		const deckId = await resp.json();
		console.log(deckId);
		res.send(deckId);
	} catch (error) {
		console.log(error);
	}
})

export default router;
