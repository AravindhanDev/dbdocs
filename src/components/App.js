import React, { useEffect, useState } from "react"
import Navbar from "./navbar/Navbar"
import File from "./file/File"
import Data from "./data/Data"

function App() {
	const [data, setData] = useState([])
	const [currentFolder, setCurrentFolder] = useState("root")
	const [currentFolderName, setCurrentFolderName] = useState("root")
	const [isFileOpen, setFileOpen] = useState(false)
	const [currentFile, setCurrentFile] = useState("")
	const [currentLocation, setCurrentLocation] = useState("/")

	useEffect(() => {
		const db = JSON.parse(localStorage.getItem("db")) || []
		localStorage.setItem("db", JSON.stringify(db))
		if (!localStorage.getItem("currentFolder")) {
			localStorage.setItem("currentFolder", "root")
			localStorage.setItem("currentFolderName", "root")
			setCurrentFolder("root")
			setCurrentFolderName("root")
		} else {
			let name = localStorage.getItem("currentFolderName")
			setCurrentFolderName(name)
			let value = localStorage.getItem("currentFolder")
			setCurrentFolder(value)
		}
		let current = localStorage.getItem("currentFile") || ""
		localStorage.setItem("currentFile", current)
		let fileStatus = JSON.parse(localStorage.getItem("isFileOpen")) || false
		localStorage.setItem("isFileOpen", fileStatus)
		let location = localStorage.getItem("currentLocation") || "/"
		localStorage.setItem("currentLocation", location)
		setFileOpen(fileStatus)
		setCurrentLocation(location)
	}, [])

	return (
		<>
			{!isFileOpen && (
				<Navbar
					data={data}
					currentFile={currentFile}
					currentFolder={currentFolder}
					isFileOpen={isFileOpen}
					setFileOpen={setFileOpen}
					setData={setData}
					currentLocation={currentLocation}
					setCurrentLocation={setCurrentLocation}
				/>
			)}
			{!isFileOpen && (
				<Data
					data={data}
					setData={setData}
					setFileOpen={setFileOpen}
					currentFile={currentFile}
					setCurrentFile={setCurrentFile}
					currentFolder={currentFolder}
					setCurrentFolder={setCurrentFolder}
					currentFolderName={currentFolderName}
					setCurrentFolderName={setCurrentFolderName}
					currentLocation={currentLocation}
					setCurrentLocation={setCurrentLocation}
				/>
			)}
			{isFileOpen && (
				<File
					currentFile={currentFile}
					setFileOpen={setFileOpen}
					setCurrentFile={setCurrentFile}
				/>
			)}
		</>
	)
}

export default App
