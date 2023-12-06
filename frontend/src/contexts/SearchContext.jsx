import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

export const SearchContext = createContext();

export function SearchContextComponent() {

	const [search, setSearch] = useState(null);
	const [sort, setSort] = useState(null);
	const [league, setLeague] = useState(null);
	const [user, setUser] = useState(null);


	return <SearchContext.Provider value={{search, setSearch, sort, setSort, user, setUser }} >
		<Outlet />
	</SearchContext.Provider>
}