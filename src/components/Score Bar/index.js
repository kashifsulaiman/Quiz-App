import React from "react";
import './index.css'

const ScoreBar = props => {
    const { blackBar, grayBar, lightGrayBar } = props

    return (
        <div className="scoreMain">
            <div className="score">
                <label>Score: {Math.round(grayBar)}%</label>
                <label>Max Score: {Math.round(lightGrayBar)}%</label>
            </div>

            <div className="scoreBar">
                <div className="lightGray" style={{ width: `${lightGrayBar}%` }}></div>
                <div className="gray" style={{ width: `${grayBar}%` }}></div>
                <div className="black" style={{ width: `${blackBar}%` }}></div>
            </div>

        </div>
    );
}

export default ScoreBar
