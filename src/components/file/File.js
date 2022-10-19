import "../css/style.css"
import "../css/file.css"
import Button from "@mui/material/Button"
import SaveSharpIcon from "@mui/icons-material/SaveSharp"
import CloseSharpIcon from "@mui/icons-material/CloseSharp"
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp"
import Brightness4SharpIcon from "@mui/icons-material/Brightness4Sharp"
import { useEffect, useRef, useState } from "react"

function File({ setFileOpen, currentFile, setCurrentFile }) {
	const [fileContent, setFileContent] = useState("")
	const [fileDarkTheme, setFileDarkTheme] = useState(false)
	const [fileName, setFileName] = useState("")
	const textArea = useRef()

	function getCurrentFileName(db, currentFile) {
		for (let data of db) {
			if (data.type === "folder") {
				getCurrentFileName(data.content, currentFile)
			} else {
				if (data.id === currentFile) {
					setFileName(data.name + ".txt")
				}
			}
		}
	}

	function setContentLoading(db, currentFile) {
		for (let data of db) {
			if (data.type === "folder") {
				getCurrentFileName(data.content, currentFile)
			} else {
				console.log(data, currentFile)

				if (data.id === currentFile) {
					setFileContent(data.content)
				}
			}
		}
	}

	useEffect(() => {
		let db = JSON.parse(localStorage.getItem("db"))
		let file = localStorage.getItem("currentFile")
		let fileTheme = JSON.parse(localStorage.getItem("fileDarkTheme")) || false
		if (fileTheme) {
			setFileDarkTheme(true)
		} else {
			setFileDarkTheme(false)
		}
		// eslint-disable-next-line
		currentFile = file
		setCurrentFile(currentFile)
		getCurrentFileName(db, file)
		setContentLoading(db, currentFile)
		function traverse(db, currentFile) {
			for (let value of db) {
				if (value.type === "folder") {
					traverse(value.content, currentFile)
				} else {
					if (value.id === currentFile) {
						setFileContent(value.content)
					}
				}
			}
		}
		traverse(db, currentFile)
		const detectKeyDown = (e) => {
			if (e.shiftKey && e.key === "S") {
				handleClick()
				setFileName("Saving...")
				setTimeout(() => getCurrentFileName(db, currentFile), 1000)
				e.preventDefault()
			}
		}
		document.addEventListener("keydown", detectKeyDown, true)
		let interval = setInterval(() => {
			textArea.current.spellcheck = false
		})
		return () => clearInterval(interval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function handleKeyDown(event) {
		event.target.spellCheck = false
		if (event.key === "Tab") {
			const start = textArea.current.selectionStart
			const end = textArea.current.selectionEnd
			textArea.current.value =
				textArea.current.value.substring(0, start) +
				"\t" +
				textArea.current.value.substring(end)
			event.preventDefault()
		}
	}

	function setContent(db, currentFile, content) {
		for (let value of db) {
			if (value.type === "folder") {
				setContent(value.content, currentFile, content)
			} else {
				if (value.id === currentFile) {
					value.content = content
				}
			}
		}
		localStorage.setItem("db", JSON.stringify(db))
	}

	function handleClose() {
		localStorage.setItem("isFileOpen", false)
		setFileOpen(false)
	}

	function handleClick() {
		let content = textArea.current.value
		if (content === "") return
		let db = JSON.parse(localStorage.getItem("db"))
		setFileName("Saving...")
		setTimeout(() => getCurrentFileName(db, currentFile), 1000)
		setContent(db, currentFile, content)
	}

	function handleChange(e) {
		setFileContent(e.target.value)
	}

	const darkStyle = {
		backgroundColor: fileDarkTheme ? "#161A1D" : "#fff",
		color: fileDarkTheme ? "#fff" : "#161A1D"
	}

	function handleTheme() {
		if (JSON.parse(localStorage.getItem("fileDarkTheme"))) {
			localStorage.setItem("fileDarkTheme", false)
			setFileDarkTheme(false)
		} else {
			setFileDarkTheme(true)
			localStorage.setItem("fileDarkTheme", true)
		}
	}

	return (
		<>
			<div className="file">
				<header className="mb-3">
					<Button variant="contained" onClick={handleClose}>
						<CloseSharpIcon />
					</Button>
					<Button variant="contained" className="btn-red" onClick={handleClick}>
						<SaveSharpIcon />
					</Button>
				</header>
				<span className="fileName">
					<DescriptionSharpIcon />
					&nbsp; {fileName}
				</span>
				&nbsp;&nbsp;
				<span className="changeTheme" onClick={handleTheme}>
					<Brightness4SharpIcon />
					&nbsp; Turn {fileDarkTheme ? "On" : "Off"} The Light
				</span>
				<textarea
					style={darkStyle}
					ref={textArea}
					spellCheck={false}
					value={fileContent}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					placeholder="Type here...  👈"
					autoFocus={true}
				></textarea>
			</div>
		</>
	)
}

export default File
