import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"
import InsertDriveFileSharpIcon from "@mui/icons-material/InsertDriveFileSharp"

function CreateFile({ screenWidth, setFileName, setFolderName }) {
	return (
		<Tooltip title="Create File">
			<Button
				variant="contained"
				className="btn-blue"
				onClick={() => {
					setFileName(true)
					setFolderName(false)
				}}
			>
				{screenWidth > 755 ? "Create File" : <InsertDriveFileSharpIcon />}
			</Button>
		</Tooltip>
	)
}

export default CreateFile
