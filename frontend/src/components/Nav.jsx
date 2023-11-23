export default function Nav({ backToStarter }) {
	return (
		<div className="container-fluid">
			<div className="navbar bg-dark navbar-expand-lg">
				<div className="container py-3">
				<button type="button" onClick={backToStarter}>Back</button>
					<button type="button">Click</button>
				</div>
			</div>
		</div>
	)
}