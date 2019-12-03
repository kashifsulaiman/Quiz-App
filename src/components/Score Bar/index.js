import React from "react";
import './index.css'

const ScoreBar = props => {
    return (
        <div className="scoreMain">
            <div className="score">
                <label>Max Score: 100%</label>
                <label>Min Score: 100%</label>
            </div>

            <div className="scoreBar">
                <div className="lightGray"></div>
                <div className="gray"></div>
                <div className="black"></div>
            </div>

        </div>
    );
}

export default ScoreBar;



