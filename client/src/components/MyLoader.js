export const MyLoader = () => {
	return (
		<div style={{display: "flex", justifyContent: "center", paddingTop: "5rem"}}>
			<div className="preloader-wrapper active">
				<div className="spinner-layer spinner-red-only">
					<div className="circle-clipper left"><div className="circle" /></div>
					<div className="gap-patch"><div className="circle" /></div>
					<div className="circle-clipper right"><div className="circle" /></div>
				</div>
			</div>
		</div>
	)
}