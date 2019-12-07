import React, { Component } from "react";
import ScoreBar from "../../components/Score Bar"
import Stars from '../../components/Stars'

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionNumber: 0,
            selectOption: '',
            questions: props.questions,
            correctCount: 0,
            incorrectCount: 0,
            blackBar: 0,
            grayBar: 0,
            lightGrayBar: 100,
            showMessage: ''
        }
    }

    selectOption = (val, ind) => {
        const { questionNumber, questions, incorrectCount, correctCount } = this.state
        const { updateTotalQuestion } = this.props

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
        const totalQuestion = (questionNumber + 1) / questions.length * 100

        this.setState({ selectOption: ind + 1 })
        updateTotalQuestion(totalQuestion)

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
        const { updateTotalQuestion } = this.props
        const totalQuestion = (questionNumber + 1) / questions.length * 100

        this.setState({
            questionNumber: questionNumber + 1,
            selectOption: ''
        })

        updateTotalQuestion(totalQuestion)

    }

    renderQuestion = () => {
        const { questions, questionNumber } = this.state

        return <div>
            <div className="questionInfo">
                <h1>Question {questionNumber + 1} of {questions.length}</h1>
                <p>{questions[questionNumber].category}</p>
                <div>
                    <Stars difficulty={questions[questionNumber].difficulty} />
                </div>
            </div>

            <div className="question">
                <p>{questions[questionNumber].question}</p>
            </div>
        </div>
    }

    renderOptions() {
        const { questions, questionNumber, selectOption } = this.state

        return <div className="questionOption">
            <div className="optionButton">
                {questions[questionNumber].option.map((val, ind) => {
                    return <button
                        disabled={!!selectOption}
                        className={this.highlightSelected(val, ind)}
                        onClick={() => this.selectOption(val, ind)} key={ind}>{val}</button>
                })}
            </div>
        </div>
    }

    renderButtons() {
        const { questionNumber, selectOption, questions, showMessage } = this.state

        return !!selectOption && (
            <div className="showMessage">
                <p>{showMessage}</p>
                {questionNumber + 1 < questions.length && <button onClick={this.nextQuestion} > Next </button>}
            </div>
        )
    }

    renderScoreBar() {
        const { blackBar, grayBar, lightGrayBar } = this.state

        return <div className="scoreArea">
            <ScoreBar
                blackBar={blackBar}
                grayBar={grayBar}
                lightGrayBar={lightGrayBar}
            />
        </div>
    }

    render() {
        return (
            <div className="quizBody" >
                {this.renderQuestion()}
                {this.renderOptions()}
                {this.renderButtons()}
                {this.renderScoreBar()}
            </div>
        )

    }
}

export default Question
