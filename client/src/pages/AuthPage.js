import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/useHttp.hook";
import { useMsg } from "../hooks/useMsg.hook";

export const AuthPage = () => {

	const auth = useContext(AuthContext);
	const msg = useMsg();
	const { isLoading, error, clearError, request } = useHttp();
	const [form, setForm] = useState(
		{
			email: "",
			password: "",
		}
	);

	useEffect( () => {
		if (error) {
			msg(error);
			clearError();
		}
	}, [error, msg, clearError] );

	const changeHandler = (event) => {
		setForm({...form, [event.target.name]: event.target.value});
	};

	const registerHandler = async () => {
		try {
			const data = await request("/api/auth/singup", "POST", {...form});
			msg(data.message);
		} catch (e) {}
	};

	const loginHandler = async () => {
		try {
			const data = await request("/api/auth/login", "POST", {...form});
			auth.login(data.token, data.userId);
		} catch (e) {}
	};

	return (
		<div className="row">
			<div className="col s6 offset-s3">

				<h1>url-shortener</h1>

				<div className="card blue darken-1">

					<div className="card-content white-text">
						<span className="card-title">Login</span>
						<div>

							<div className="input-field">
								<input
									placeholder="email"
									id="email"
									type="email"
									name="email"
									value={form.email}
									className="yellow-input"
									onChange={changeHandler}
								/>
								<label htmlFor="email"></label>
							</div>

							<div className="input-field">
								<input
									placeholder="password"
									id="password"
									type="password"
									name="password"
									value={form.password}
									className="yellow-input"
									onChange={changeHandler}
								/>
								<label htmlFor="password"></label>
							</div>

						</div>
					</div>

					<div className="card-action">

						<button
							className="btn yellow darken-4"
							onClick={loginHandler}
							style={{marginRight: 10}}
							disabled={isLoading || form.email === "" || form.password === ""}
						>Sing in</button>

						<button
							className="btn grey lighten-4 black-text"
							onClick={registerHandler}
							disabled={isLoading || form.email === "" || form.password === ""}
						>Sing up</button>
					</div>
				</div>

			</div>
		</div>
	)
}