import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/useHttp.hook";
import { AuthContext } from "../context/AuthContext";
import { MyLoader } from "../components/MyLoader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage = () => {

	const { token } = useContext(AuthContext);
	const { request, isLoading } = useHttp();
	const [link, setLink] = useState(null);
	const linkId = useParams().id;

	const fetchLink = useCallback( async () => {
		try {
			const data = await request(`/api/link/${linkId}`, "GET", null, {Authorization: `Bearer ${token}`});
			setLink(data);
		} catch (e) {}
	}, [token, linkId, request]);

	useEffect( () => {
		fetchLink();
	}, [fetchLink]);

	if (isLoading) return <MyLoader />

	return (
		<div>
			{ !isLoading && link && <LinkCard link={link} /> }
		</div>
	)
}