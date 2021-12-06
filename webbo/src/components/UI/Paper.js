import React from "react";
import "./Paper.css";


const Paper = (props) => {
	return <div className={"paper " + "elevation" + props.elevation}>{props.children}</div>;
};

export default Paper;
