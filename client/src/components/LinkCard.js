export const LinkCard = ({link}) => {
	return (
		<div>
			<h2>Info:</h2>
			<p>original link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
			<p>shortened link: <a href={link.to} target="_blank" rel="noreferrer">{link.to}</a></p>
			<p>number of clicks: {link.clicks}</p>
			<p>created date: {new Date(link.date).toLocaleDateString("en-GB")}</p>
		</div>
	)
}