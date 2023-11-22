export default function BetModal({ current }) {

	// delete the todo item on click
	console.log(current);
	if (current) {
		//console.log(betTeam);
        //const betTeam = current.betId.slice(4,8);
    }




	// return a modal with id delete
	return (
		<div className="modal fade" id="betModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="deleteModalLabel">Do you want to bet on</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						If you want to delete the todo item, then click Delete button.
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
						<button type="button" data-bs-dismiss="modal" className="btn btn-primary">Delete</button>
					</div>
				</div>
			</div>
		</div>
		)
}