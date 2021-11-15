import React from "react";
import { Link } from "react-router-dom";
import "./StatsCard.css";

const StatsCard = (props) => {
    return (
        <div class="container" xs={12} lg={12} sm={6} md={6}>
            <div class="card">
                <div class="imgBx">
                    {props.img}
                </div>
                <div className="contentBx">
                    <h2>{props.title}</h2>
                    <div className="size">
                        <h3>{props.subTitle}</h3>
                        <span>{props.number}</span>
                    </div>
                    
                    <Link to={props.link}>More info</Link>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
