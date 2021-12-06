import React from "react";
import { Link } from "react-router-dom";
import "./StatsCard.css";
import {useTranslation} from "react-i18next"; 
/**
 * 
 * @property {string} link - redirect on More info button
 * @property {string} title - card title
 * @property {string} number - number of elements
 * @property {component} img - background icon
 * @returns stats card for showing number of important records and redirect button to more detailed view
 */

const StatsCard = (props) => {
	const { t } = useTranslation();
    return (
        <div className="container" xs={12} lg={12} sm={6} md={6}>
            <div className="card">
                <div className="imgBx">
                    {props.img}
                </div>
                <div className="contentBx">
                    <h2>{t(props.title)}</h2>
                    <div className="size">
                        <span>{props.number}</span>
                    </div>
                    
                    <Link to={props.link}>{t("moreInfo")}</Link>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
