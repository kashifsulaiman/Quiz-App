import React, { Component } from 'react';
import './index.css'
import ProgressBar from '../../components/Progress Bar'
import Questions from '../../components/Question'
import questionsData from "../../questions.json"

class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            totalQuestion: 0
        }
    }
    componentDidMount() {
        this.readQuestions()
    }

    readQuestions () {
        const questions = questionsData.map(quest => {
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

    updateTotalQuestion = (totalQuestion) => {
        this.setState({ totalQuestion })
    }

    render() {
        const {
            questions,
            totalQuestion,
        } = this.state
        return (
            <div className="quizMain">
                <ProgressBar question={totalQuestion} />

            { !!questions.length && 
                <Questions 
                    questions={ questions } 
                    updateTotalQuestion={ this.updateTotalQuestion }/> }
            </div>
        )
    }
}

export default Quiz