import React from "react";
import './index.css'

const ProgressBar = props => {
    const width = props.question
    return (
        <div className="progressBar">
            <div style={{width:`${width}%`}}></div>
        </div>
    );
}

export default ProgressBar



