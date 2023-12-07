import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

export const SearchContext = createContext();

export function SearchContextComponent() {


	const [search, setSearch] = useState(null);
	const [sort, setSort] = useState(null);
	const [league, setLeague] = useState(null);
	const [user, setUser] = useState(null);
	const [funds, setFunds] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetch(`/api/user/funds/${user}`)
				const data = await result.json()
				console.log(data);
				setFunds(data)
			} catch (error) {
				console.error(error)
			}
		}
		if(user !== null){
			fetchData()
		}
		
		
	}, [user])



	return <SearchContext.Provider value={{search, setSearch, sort, setSort, user, setUser, funds, setFunds }} >
		<Outlet />
	</SearchContext.Provider>
}