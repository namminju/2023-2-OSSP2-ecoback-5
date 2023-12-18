import Backbutton from "kitae/backbutton";
import React from "react";
import "../css/BackbuttonBar.css";

const BackbuttonBar = ({title}) => {

    return (
        <div style={{ display: 'flex' }}>
            <Backbutton />
            <p id="bar_title"  style={{ fontSize: '20px' }} >{title}</p>
        </div>
    );
};

export default BackbuttonBar;