import { v4 as getId } from "uuid"
import Button from "@mui/material/Button"
import SaveSharpIcon from "@mui/icons-material/SaveSharp"
import ClearSharpIcon from "@mui/icons-material/ClearSharp"
import { useRef } from "react"

function NewFolder({
	data,
	currentFolder,
	setData,
	setFolderName,
	screenWidth
}) {
	const inputFolder = useRef()

	function handleKeyDown(e) {
		if (e.key === "Enter") {
			let btn = e.currentTarget.nextElementSibling.nextElementSibling
			btn.click()
		}
	}

	function checkIfExist(name) {
		if (name === "") return false
		for (let value of data) {
			if (value.type === "folder" && value.name === name) return true
		}
		return false
	}

	function handleClick(e) {
		let folderValue = inputFolder.current.value
		if (folderValue === "") return
		if (checkIfExist(folderValue.trim())) {
			for (let i = 1; i < 1000; i++) {
				folderValue = `${folderValue}(${i})`
				if (!checkIfExist(folderValue.trim())) {
					e.currentTarget.parentElement.firstElementChild.value = folderValue
					return
				}
				folderValue = folderValue.slice(0, -3)
			}
		}
		let date = new Date().getDate()
		let month = new Date().getMonth()
		let minutes = new Date().getMinutes()
		date = date < 10 ? "0" + date : date
		month = month < 10 ? "0" + month : month
		minutes = minutes < 10 ? "0" + minutes : minutes
		let time = `${date}-${month}-${new Date().getFullYear()} ${new Date().getHours()}:${minutes}`
		let folderObj = {
			id: getId(),
			name: inputFolder.current.value,
			type: "folder",
			createdAt: time,
			parent: currentFolder,
			content: []
		}
		let db = JSON.parse(localStorage.getItem("db"))
		if (currentFolder === "root") {
			db.push(folderObj)
			localStorage.setItem("db", JSON.stringify(db))
			db = JSON.parse(localStorage.getItem("db"))
			setData(db)
		} else {
			let sourceFolder = []
			function getFolder(db) {
				for (let data of db) {
					if (data.type === "folder") {
						if (data.id === currentFolder) {
							sourceFolder = data.content
						} else {
							getFolder(data.content)
						}
					}
				}
			}
			function saveFolder(sourceFolder, db) {
				for (let data of db) {
					if (data.type === "folder") {
						if (data.id === currentFolder) {
							data.content = sourceFolder
						} else {
							getFolder(data.content)
						}
					}
				}
			}
			getFolder(db) // obtained source folder
			sourceFolder.push(folderObj) // push new file
			saveFolder(sourceFolder, db) // save file into folder
			data = sourceFolder
			setData(data)
			localStorage.setItem("db", JSON.stringify(db))
		}
		setFolderName(false)
	}

	return (
		<div className="createFolder">
			<input
				onKeyDown={handleKeyDown}
				type="text"
				ref={inputFolder}
				placeholder="Folder Name  🗀"
				className="form-control file-input"
				autoFocus
			/>
			<Button
				variant="contained"
				className="btn-blue"
				onClick={() => setFolderName(false)}
			>
				{screenWidth > 600 ? "Cancel" : <ClearSharpIcon />}
			</Button>
			&nbsp;&nbsp;
			<Button variant="contained" onClick={handleClick} className="btn-blue">
				{screenWidth > 400 ? "Save" : <SaveSharpIcon />}
			</Button>
		</div>
	)
}

export default NewFolder
