import "../css/style.css"
import "../css/navbar.css"
import ArticleSharpIcon from "@mui/icons-material/ArticleSharp"
import { useEffect, useState } from "react"
import CreateFile from "./CreateFile"
import CreateFolder from "./CreateFolder"
import DeleteAll from "./DeleteAll"
import NewFile from "./NewFile"
import NewFolder from "./NewFolder"
import DeleteDialog from "./DeleteDialog"
import AddressBar from "../addressbar/AddressBar"
import IconButton from "@mui/material/IconButton"
import HelpSharpIcon from "@mui/icons-material/HelpSharp"
import Tooltip from "@mui/material/Tooltip"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

function Navbar({
	currentFolder,
	setData,
	data,
	currentLocation,
	setCurrentLocation
}) {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth)
	const [fileName, setFileName] = useState(false)
	const [folderName, setFolderName] = useState(false)
	const [open, setOpen] = useState(false)

	const [anchorEl, setAnchorEl] = useState(null)
	const oopen = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleCloseAnchor = () => {
		setAnchorEl(null)
	}

	const handleClickOpen = () => {
		setFileName(false)
		setFolderName(false)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		const detectKeyDown = (e) => {
			if (e.shiftKey && e.key === "N") {
				console.log("shift + N")
				setFileName(true)
				setFolderName(false)
				e.preventDefault()
			}
			if (e.shiftKey && e.key === "F") {
				setFileName(false)
				setFolderName(true)
				e.preventDefault()
			}
			if (e.shiftKey && e.key === "C") {
				setFileName(false)
				setFolderName(false)
				e.preventDefault()
			}
			if (e.key === "Escape") {
				setFileName(false)
				setFolderName(false)
			}
		}
		document.addEventListener("keydown", detectKeyDown, true)
	}, [])

	useEffect(() => {
		window.addEventListener("resize", () => {
			setScreenWidth(window.innerWidth)
		})
	})

	return (
		<>
			<nav>
				<div className="left">
					<ArticleSharpIcon className="text-blue" fontSize="large" /> &nbsp;
					<b>DB-Docs</b>
				</div>
				<div className="right">
					<Tooltip title="Help">
						<IconButton className="btn" onClick={handleClick}>
							<HelpSharpIcon />
						</IconButton>
					</Tooltip>
					<CreateFile
						screenWidth={screenWidth}
						setFileName={setFileName}
						setFolderName={setFolderName}
					/>
					<CreateFolder
						screenWidth={screenWidth}
						setFileName={setFileName}
						setFolderName={setFolderName}
					/>
					<DeleteAll
						screenWidth={screenWidth}
						handleClickOpen={handleClickOpen}
					/>
				</div>
			</nav>
			{fileName && (
				<NewFile
					currentFolder={currentFolder}
					setData={setData}
					data={data}
					screenWidth={screenWidth}
					setFileName={setFileName}
				/>
			)}
			{folderName && (
				<NewFolder
					data={data}
					setFileName={setFileName}
					currentFolder={currentFolder}
					setData={setData}
					screenWidth={screenWidth}
					setFolderName={setFolderName}
				/>
			)}
			<DeleteDialog
				setCurrentLocation={setCurrentLocation}
				setData={setData}
				open={open}
				handleClose={handleClose}
			/>
			<AddressBar currentLocation={currentLocation} />
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={oopen}
				onClose={handleCloseAnchor}
				onClick={handleCloseAnchor}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0
						}
					}
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem>
					<div className="box">
						<h6>
							<strong>Shift + N</strong>
						</h6>
						<p>Shortcut key to create new text document</p>
					</div>
				</MenuItem>
				<MenuItem>
					<div className="box">
						<h6>
							<strong>Shift + F</strong>
						</h6>
						<p>Shortcut key to create new file folder</p>
					</div>
				</MenuItem>
				<MenuItem>
					<div className="box">
						<h6>
							<strong>Shift + S</strong>
						</h6>
						<p>Shortcut key to save any file or directory</p>
					</div>
				</MenuItem>
				<MenuItem>
					<div className="box">
						<h6>
							<strong>ESC or Shift + C</strong>
						</h6>
						<p>Shortcut key to cancel any operation</p>
					</div>
				</MenuItem>
			</Menu>
		</>
	)
}

export default Navbar
