import React, { Component } from 'react';

import './index.css'
import ProgressBar from '../../components/Progress Bar'
import ScoreBar from "../../components/Score Bar"

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="quizMain">
                <ProgressBar question={60} />

                <div className="quizBody" >

                    <div className="questionInfo">
                        <h1>Question 14 of 20</h1>
                        <p>Entertainment: Board Game</p>
                        <i className={`fa fa-star`} />
                    </div>

                    <div className="question">
                        <p> some question jskld askd askjd kasjd aksdj as
                            sdaksjdh askjdh kasd kasd kasd kas dksd aksd kasdj
                            asdakjshd kasj kasd kjas dksjd kjas kasjd kasjd
                        </p>
                    </div>

                    <div className="questionOption">
                        <div className="optionButton">
                            <button>value</button>
                            <button>value</button>
                            <button>value</button>
                            <button>value</button>
                        </div>
                    </div>

                    <div className="scoreArea">
                        <ScoreBar/>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Quiz;