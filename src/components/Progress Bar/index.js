import React from "react";
import './index.css'

const ProgressBar = props => {
    const width = props.question || 1;
    return (
        <div className="progressBar">
            <div style={{width:`${width}%`}}></div>
        </div>
    );
}

export default ProgressBar;



