import React, { Component } from 'react';
import './index.css'
import ProgressBar from '../../components/Progress Bar'
import ScoreBar from "../../components/Score Bar"
import Questions from "../../questions.json"

class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            questionNumber: 0,
            questions: [],
            selectOption: '',
            totalQuestion: 0,
            correctCount: 0,
            incorrectCount: 0,
            blackBar: 0,
            grayBar: 0,
            lightGrayBar: 100,
            showMessage: '',
        }
    }
    componentDidMount() {
        this.readQuestions()
    }

    readQuestions = () => {
        const questions = Questions.map(quest => {
            const option = {}
            option.category = decodeURIComponent(quest.category)
            option.correct_answer = decodeURIComponent(quest.correct_answer)
            option.difficulty = decodeURIComponent(quest.difficulty)
            option.question = decodeURIComponent(quest.question)
            option.type = decodeURIComponent(quest.type)
            option.incorrect_answers = quest.incorrect_answers.map(d =>
                decodeURIComponent(d)
            )
            option.option = [option.correct_answer, ...option.incorrect_answers].sort(
                () => Math.random() - 0.5
            );
            return option
        })

        this.setState({ questions, totalQuestion: 1 / questions.length * 100 })
    }

    renderStars = (param) => {
        const difficulties = {
            hard: 3,
            medium: 2,
            easy: 1,
        }
        const stars = [] 

        for (let i = 0; i < 3; i++) {
            if(i < difficulties[param] ){
                stars.push(<i className={`fa fa-star `} key={i} />)
            }
            else {
                stars.push(<i style={{color: "lightgray"}} className={`fa fa-star `} key={i} />)

            }
        }
        return <div> {stars} </div>
    }

    selectOption = (val, ind) => {
        const { questionNumber, questions, incorrectCount, correctCount } = this.state

        if (questions[questionNumber].correct_answer === val) {
            this.setState({
                showMessage: "Correct!",
                grayBar: (correctCount + 1) / (questionNumber + 1) * 100,
                blackBar: (correctCount + 1) / questions.length * 100,
                correctCount: correctCount + 1,
            })
        }
        else {
            this.setState({
                showMessage: "Sorry!",
                grayBar: (correctCount) / (questionNumber + 1) * 100,
                lightGrayBar: (correctCount + (questions.length - (questionNumber + 1))) / questions.length * 100,
                incorrectCount: incorrectCount + 1
            })
        }

        this.setState({ selectOption: ind + 1, totalQuestion: (questionNumber + 1) / questions.length * 100 })

    }

    highlightSelected = (val, ind) => {
        const { questionNumber, questions, selectOption } = this.state

        if (selectOption === ind + 1) {
            return "selectedOption"
        }
        if (selectOption && questions[questionNumber].correct_answer === val) {
            return "correctOption"
        }
        return "options"
    }

    nextQuestion = () => {
        const { questionNumber, questions } = this.state

        this.setState({
            questionNumber: questionNumber + 1,
            selectOption: '',
            totalQuestion: (questionNumber + 1) / questions.length * 100
        })
    }

    render() {
        const {
            questionNumber,
            questions,
            selectOption,
            totalQuestion,
            blackBar,
            grayBar,
            lightGrayBar,
            showMessage
        } = this.state
        return (
            <div className="quizMain">
                <ProgressBar question={totalQuestion} />

                {!!questions.length && <div className="quizBody" >

                    <div className="questionInfo">
                        <h1>Question {questionNumber + 1} of {questions.length}</h1>
                        <p>{questions[questionNumber].category}</p>
                        <div>
                            {this.renderStars(questions[questionNumber].difficulty)}
                        </div>
                    </div>

                    <div className="question">
                        <p>{questions[questionNumber].question}</p>
                    </div>

                    <div className="questionOption">
                        <div className="optionButton">
                            {questions[questionNumber].option.map((val, ind) => {
                                return <button
                                    disabled={!!selectOption}
                                    className={this.highlightSelected(val, ind)}
                                    onClick={() => this.selectOption(val, ind)} key={ind}>{val}</button>
                            })}
                        </div>
                    </div>

                    {
                        !!selectOption && (
                            <div className="showMessage">
                                <p>{showMessage}</p>
                               {questionNumber + 1 < questions.length && <button onClick={this.nextQuestion} > Next </button>}
                            </div>
                        )
                    }

                    <div className="scoreArea">
                        <ScoreBar
                            blackBar={blackBar}
                            grayBar={grayBar}
                            lightGrayBar={lightGrayBar}
                        />
                    </div>

                </div>
                }
            </div>
        )
    }
}

export default Quiz