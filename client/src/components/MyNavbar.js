import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


export const MyNavbar = () => {

	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	const logoutHandler = (event) => {
		event.preventDefault();
		auth.logout();
		navigate("/");
	}

	return (
		<nav>
			<div className="nav-wrapper container">

				<span className="brand-logo">url-shortener</span>

				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><NavLink to="/create">create</NavLink></li>
					<li><NavLink to="/links">links</NavLink></li>
					<li><a href="/" onClick={logoutHandler}>logout</a></li>
				</ul>
			</div>
		</nav>
	)
}