import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"
import FolderSharpIcon from "@mui/icons-material/FolderSharp"

function CreateFolder({ screenWidth, setFileName, setFolderName }) {
	return (
		<Tooltip title="Create Folder">
			<Button
				variant="contained"
				className="btn-blue"
				onClick={() => {
					setFileName(false)
					setFolderName(true)
				}}
			>
				{screenWidth > 755 ? "Create Folder" : <FolderSharpIcon />}
			</Button>
		</Tooltip>
	)
}

export default CreateFolder
