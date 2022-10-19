import { useEffect } from "react"
import "../css/style.css"
import "../css/data.css"
import Button from "@mui/material/Button"
import ForwardIcon from "@mui/icons-material/Forward"
import empty_folder from "../images/empty_folder.png"
import Structure from "./Structure"

function Data({
	data,
	setData,
	currentFile,
	currentFolder,
	currentFolderName,
	setFileOpen,
	setCurrentFile,
	setCurrentFolder,
	setCurrentFolderName,
	currentLocation,
	setCurrentLocation,
	setFileName,
	setFolderName
}) {
	function getFolder(db) {
		if (currentFolder === "root") {
			setData(db)
		} else {
			for (let value of db) {
				if (value.type === "folder") {
					if (value.id === currentFolder) {
						data = value.content
						setData(data)
					} else {
						getFolder(value.content)
					}
				}
			}
		}
	}

	function renderParent(db, parentId) {
		if (parentId === "root") {
			data = db
			setData(data)
			return
		}
		for (let value of db) {
			if (value.type === "folder") {
				if (value.id === parentId) {
					data = value.content
					setData(data)
				} else {
					renderParent(value.content, parentId)
				}
			}
		}
	}

	useEffect(() => {
		let db = JSON.parse(localStorage.getItem("db"))
		setData(db)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		let db = JSON.parse(localStorage.getItem("db"))
		getFolder(db)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentFolder])

	function goBack(e) {
		if (currentFolder === "root") return
		let db = JSON.parse(localStorage.getItem("db"))
		function traverse(db, currentFolder) {
			for (let value of db) {
				if (value.type === "folder") {
					if (value.id === currentFolder) {
						currentFolder = value.parent
						currentFolderName = value.name
						renderParent(db, value.parent)
						setCurrentFolder(currentFolder)
						setCurrentFolderName(currentFolderName)
						localStorage.setItem("currentFolder", currentFolder)
						localStorage.setItem("currentFolderName", currentFolderName)
						if (currentFolder === "root") {
							currentLocation = "/"
							setCurrentLocation(currentLocation)
							localStorage.setItem("currentLocation", currentLocation)
						} else {
							currentLocation = currentLocation.slice(0, -1)
							for (let i = currentLocation.length - 1; i >= 0; i--) {
								if (currentLocation[i] === "/") {
									break
								}
								currentLocation = currentLocation.slice(0, -1)
							}
							setCurrentLocation(currentLocation)
							localStorage.setItem("currentLocation", currentLocation)
						}
					} else {
						traverse(value.content, currentFolder)
					}
				}
			}
		}
		traverse(db, currentFolder)
	}

	function handleDoubleClick(event) {
		let id = event.currentTarget.getAttribute("id")
		let name = event.currentTarget.getAttribute("name")
		let type = event.currentTarget.className

		if (type === "folder") {
			localStorage.setItem("currentFolder", id)
			localStorage.setItem("currentFolderName", name)
			let current = localStorage.getItem("currentFolder")
			let folderName = localStorage.getItem("currentFolderName")
			currentFolder = current
			currentFolderName = folderName
			setCurrentFolder(currentFolder)
			setCurrentFolderName(currentFolderName)
			if (currentFolder !== "root") {
				currentLocation += `${currentFolderName}/`
				localStorage.setItem("currentLocation", currentLocation)
				setCurrentLocation(currentLocation)
			}
		} else {
			currentFile = id
			setCurrentFile(currentFile)
			localStorage.setItem("currentFile", currentFile)
			localStorage.setItem("isFileOpen", true)
			setFileOpen(localStorage.getItem("isFileOpen"))
		}
	}

	function deleteFile(db, deleteId) {
		let index = -1
		if (currentFolder === "root") {
			for (let i = 0; i < db.length; i++) {
				const { id, type } = db[i]
				if (type === "file") {
					if (id === deleteId) {
						index = i
					}
				}
			}
		} else {
			for (let i = 0; i < db.length; i++) {
				const { id, type, content } = db[i]
				if (type === "folder") {
					deleteFile(content, deleteId)
				} else {
					if (id === deleteId) {
						index = i
					}
				}
			}
		}
		if (index !== -1) {
			db.splice(index, 1)
		}
	}

	function deleteFolder(db, deleteId) {
		let index = -1
		if (currentFolder === "root") {
			console.log("in root")
			for (let i = 0; i < db.length; i++) {
				const { id, type } = db[i]
				if (type === "folder") {
					if (id === deleteId) index = i
				}
			}
		} else {
			console.log("not in root")
			for (let i = 0; i < db.length; i++) {
				const { id, type, content } = db[i]
				if (type === "folder") {
					if (id === deleteId) index = i
					else deleteFolder(content, deleteId)
				}
			}
		}
		if (index !== -1) {
			db.splice(index, 1)
		}
	}

	function renameFolder(db, folder, value) {
		for (let data of db) {
			if (data.type === "folder") {
				if (data.id === folder) {
					data.name = value
				} else {
					renameFolder(data.content, folder, value)
				}
			}
		}
	}

	function renameFile(db, file, value) {
		for (let data of db) {
			if (data.type === "folder") {
				renameFile(data.content, file, value)
			} else {
				if (data.id === file) {
					data.name = value
				}
			}
		}
	}

	function handleClick(event) {
		let deleteId =
			event.currentTarget.parentElement.parentElement.getAttribute("id")
		let deleteName =
			event.currentTarget.parentElement.parentElement.getAttribute("name")
		let type = event.currentTarget.parentElement.parentElement.className
		let typeOperation = event.currentTarget.name
		let db = JSON.parse(localStorage.getItem("db"))
		if (typeOperation === "delete") {
			if (type === "file") {
				deleteFile(db, deleteId)
			} else {
				deleteFolder(db, deleteId)
			}
			localStorage.setItem("db", JSON.stringify(db))
			getFolder(db)
		} else {
			let name = ""
			if (type === "file")
				name = prompt("Enter new name for " + type, deleteName)
			else name = prompt("Enter new name for " + type, deleteName)
			if (name === "" || name === null || name === deleteName) return
			if (type === "file") renameFile(db, deleteId, name)
			else renameFolder(db, deleteId, name)
			localStorage.setItem("db", JSON.stringify(db))
			getFolder(db)
		}
	}

	return (
		<div className="data-grid">
			{currentFolder !== "root" && (
				<div className="navigation">
					<Button variant="contained" onClick={goBack} className="btn-grey">
						<ForwardIcon className="reverse" />
					</Button>
				</div>
			)}
			{data.length === 0 && (
				<div className="empty mt-3">
					<img src={empty_folder} className="empty-img" alt="" />
				</div>
			)}
			{data.length > 0 && (
				<table className="table mt-3">
					<thead className="data-head">
						<tr>
							<th>#</th>
							<th style={{ textAlign: "center" }}>Name</th>
							<th style={{ textAlign: "center" }}>Type</th>
							<th style={{ textAlign: "center" }}>Created at</th>
							<th style={{ textAlign: "center" }}>Operation</th>
						</tr>
					</thead>
					<tbody className="data">
						{data.map(({ name, type, createdAt, id, content }) => {
							return (
								<Structure
									key={id}
									id={id}
									name={name}
									type={type}
									content={content}
									createdAt={createdAt}
									handleClick={handleClick}
									handleDoubleClick={handleDoubleClick}
								/>
							)
						})}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Data
