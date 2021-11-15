import React from "react";
import "./Title.css";

export default function Title(props) {
    return (
        <div className="title_block">
            {props.children}
        </div>
    );
}