import "../css/data.css"
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp"
import EditSharpIcon from "@mui/icons-material/EditSharp"
import file from "../images/file1.png"
import IconButton from "@mui/material/IconButton"
import folder from "../images/folder.png"
import folder_linux from "../images/folder_linux.png"
import Tooltip from "@mui/material/Tooltip"

function Structure({
	name,
	type,
	createdAt,
	id,
	content,
	handleDoubleClick,
	handleClick
}) {
	return (
		<tr
			name={name}
			className={type}
			onDoubleClick={handleDoubleClick}
			key={id}
			id={id}
		>
			<td>
				<img
					className={type === "file" ? "data-icon" : "data-folder"}
					src={
						type === "file" ? file : content.length > 0 ? folder_linux : folder
					}
					alt=""
				/>
			</td>
			<td style={{ textAlign: "center" }}>
				{`${name}${type === "file" ? ".txt" : ""}`}
			</td>
			<td style={{ textAlign: "center" }}>
				{type === "file" ? "Text Document" : "File Folder"}
			</td>
			<td style={{ textAlign: "center" }}>{createdAt}</td>
			<td style={{ textAlign: "center" }}>
				<Tooltip title={`Rename ${type}`}>
					<IconButton
						onClick={handleClick}
						variant="outlined"
						name="rename"
						className="btn-outline-red"
					>
						<EditSharpIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title={`Delete ${type}`}>
					<IconButton
						onClick={handleClick}
						variant="outlined"
						name="delete"
						className="btn-outline-red"
					>
						<DeleteSharpIcon />
					</IconButton>
				</Tooltip>
			</td>
		</tr>
	)
}

export default Structure
