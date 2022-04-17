import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useHttp } from "../hooks/useHttp.hook";
import { AuthContext } from "../context/AuthContext";

export const CreatePage = () => {

	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const {request} = useHttp();
	const [link, setLink] = useState("");
	const pressHandler = async (event) => {
		if (event.key === "Enter") {
			try {
				const data = await request("/api/link/generate", "POST", {from: link}, {Authorization: `Bearer ${auth.token}`});
				navigate(`/detail/${data.link._id}`);
				console.log(`lalal: ${data.link._id}`);
			} catch (e) {}
		}
	}

	return (
		<div className="row">
			<div className="col s8 offset-s2">

				<div className="input-field">
					<input
						placeholder="put your link..."
						id="link"
						type="text"
						value={link}
						onChange={e => setLink(e.target.value)}
						onKeyPress={pressHandler}
					/>
					<label htmlFor="link"></label>
				</div>

			</div>
		</div>
	)
}