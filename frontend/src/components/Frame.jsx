import { useContext, useState } from "react"
import { Outlet } from "react-router-dom"
import Nav from "./Nav"
import { SearchContext } from "../contexts/SearchContext";


export default function Frame() {

	const { search } = useContext(SearchContext);

	return (
		<main>
			<Nav />
			<div className="container-fluid frame-content">
				<Outlet />
			</div>
		</main>
	)
}