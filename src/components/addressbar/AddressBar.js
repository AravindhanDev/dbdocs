import { useEffect } from "react"
import "../css/address.css"

function AddressBar({ currentLocation }) {
	useEffect(() => {}, [])

	return (
		<>
			<div className="address-bar">
				<input
					type="text"
					value={"🏠  " + currentLocation}
					readOnly
					className="form-control address"
					autoFocus={true}
				/>
			</div>
		</>
	)
}

export default AddressBar
