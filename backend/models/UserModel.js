import mongoose from "mongoose";
const { Schema, model} = mongoose;

const UserSchema = new Schema({
	email: { type: String/*,  maxLength: 100 */ },
	firstName: { type: String, required: true},
	lastName: { type: String, required: true},
	phone: { type: Number, required: true},
	createdAt: { type: Date },
	password: {type: String},
	deposit: { type: Number }
})

// Create a virtual with its full name
UserSchema.virtual("name").get(function () {
	let fullname = "";
	if (this.firstName && this.lastName) {
		fullname = `${this.lastName}, ${this.firstName}`
	}
})

export default model ("User", UserSchema)