import { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp.hook";
import { AuthContext } from "../context/AuthContext";
import { MyLoader } from "../components/MyLoader";
import { LinksList } from "../components/LinksList";

export const LinksPage = () => {

	const [links, setLinks] = useState([]);
	const {request, isLoading} = useHttp();
	const { token } = useContext(AuthContext);

	const fetchLinks = useCallback( async () => {
		try {
			const data = await request("/api/link", "GET", null, {Authorization: `Bearer ${token}`});
			setLinks(data);
		} catch (e) {}
	}, [token, request] );

	useEffect( () => {
		fetchLinks();
	}, [fetchLinks] );

	if (isLoading) return <MyLoader />

	return (
		<div>
			{!isLoading && <LinksList links={links} />}
		</div>
	)
}