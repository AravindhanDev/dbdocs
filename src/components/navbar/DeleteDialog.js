import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"

function DeleteDialog({
	setData,
	handleClose,
	open,
	setCurrentLocation,
	handleClickOpen
}) {
	function handleClick() {
		handleClose()
		localStorage.setItem("db", JSON.stringify([]))
		let db = JSON.parse(localStorage.getItem("db"))
		setData(db)
		localStorage.setItem("currentFolder", "root")
		localStorage.setItem("currentFolderName", "root")
		localStorage.setItem("currentFile", "")
		setCurrentLocation("/")
		localStorage.setItem("currentLocation", "/")
		localStorage.setItem("isFileOpen", false)
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Confirmation?</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Are you sure you want to delete all the files & directories <br /> in
					current directory?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					className="btn-outline-red"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					className="btn-red"
					onClick={handleClick}
					autoFocus
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DeleteDialog
