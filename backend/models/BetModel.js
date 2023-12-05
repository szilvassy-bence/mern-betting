import mongoose from "mongoose";
const { Schema, model } = mongoose;

//include user info here
const betSchema = new Schema({
	betSide: String,
	betAmount: Number,
	betOdds: Number,
	betWin: Number,
	id: String
})

export default model ("Bet", betSchema)