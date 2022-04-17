import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.hook";
import { AuthContext } from "./context/AuthContext";
import { MyNavbar } from "./components/MyNavbar";
import { MyLoader } from "./components/MyLoader";

export default function App() {

	const {login, logout, token, userId, isReady} = useAuth();
	const isAuthed = !!token;

	const routes = useRoutes(isAuthed);

	if (!isReady) return <MyLoader />

	return (
		<AuthContext.Provider value={{login, logout, token, userId, isAuthed}}>
			<BrowserRouter>
				{isAuthed && <MyNavbar />}
				<div className="container">
					{routes}
				</div>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}