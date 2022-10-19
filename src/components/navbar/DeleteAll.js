import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp"

function DeleteAll({ screenWidth, handleClickOpen }) {
	return (
		<Tooltip title="Delete All">
			<Button
				variant="contained"
				className="btn-red"
				onClick={() => handleClickOpen()}
			>
				{screenWidth > 755 ? "Delete All" : <DeleteSharpIcon />}
			</Button>
		</Tooltip>
	)
}

export default DeleteAll
