import { v4 as getId } from "uuid"
import Button from "@mui/material/Button"
import SaveSharpIcon from "@mui/icons-material/SaveSharp"
import ClearSharpIcon from "@mui/icons-material/ClearSharp"
import { useRef } from "react"

function NewFile({ currentFolder, data, setData, setFileName, screenWidth }) {
	const inputFile = useRef()

	function checkIfExist(name) {
		if (data.length === 0) return false
		if (name === "") return false
		for (let value of data) {
			if (value.type === "file" && value.name === name) return true
		}
		return false
	}

	function handleChange(e) {
		e.target.style.border = "2px solid #2d31fa"
	}

	function handleClick(e) {
		let fileValue = inputFile.current.value
		if (fileValue === "") return
		if (checkIfExist(fileValue.trim())) {
			for (let i = 1; i < 1000; i++) {
				fileValue = `${fileValue}(${i})`
				if (!checkIfExist(fileValue.trim())) {
					e.currentTarget.parentElement.firstElementChild.value = fileValue
					return
				}
				fileValue = fileValue.slice(0, -3)
			}
		}
		let date = new Date().getDate()
		let month = new Date().getMonth()
		let minutes = new Date().getMinutes()
		date = date < 10 ? "0" + date : date
		month = month < 10 ? "0" + month : month
		minutes = minutes < 10 ? "0" + minutes : minutes
		let time = `${date}-${month}-${new Date().getFullYear()} ${new Date().getHours()}:${minutes}`
		let fileObj = {
			id: getId(),
			name: inputFile.current.value,
			type: "file",
			createdAt: time,
			content: ""
		}
		let db = JSON.parse(localStorage.getItem("db"))
		if (currentFolder === "root") {
			db.push(fileObj)
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
			sourceFolder.push(fileObj) // push new file
			saveFolder(sourceFolder, db) // save file into folder
			data = sourceFolder
			setData(data)
			localStorage.setItem("db", JSON.stringify(db))
		}
		setFileName(false)
	}

	function handleKeyDown(e) {
		if (e.key === "Enter") {
			let btn = e.currentTarget.nextElementSibling.nextElementSibling
			btn.click()
		}
	}

	return (
		<div className="createFile">
			<input
				ref={inputFile}
				type="text"
				placeholder="File Name  🗎"
				className="form-control file-input"
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				autoFocus
			/>
			<Button
				variant="contained"
				onClick={() => setFileName(false)}
				className="btn-blue"
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

export default NewFile
