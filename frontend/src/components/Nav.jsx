export default function Nav({ backToStarter, setSearchValue, searchValue }) {


	return (
		<div className="container-fluid">
			<div className="navbar bg-dark navbar-expand-lg">
				<div className="container py-3">
				<button type="button" onClick={backToStarter}>Back</button>
				<input type="text" value={searchValue} placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)}/>
				<button type="button">Click</button>
				</div>
			</div>
		</div>
	)
}