import { useState, MouseEvent } from "react";
import "./QuizApp.css"

export type QuestionsConfig = {
    question: string;
    answer: string;
    options: string[];
}

const QuestionsAndAnswer: QuestionsConfig[] = [
    {
        question: "What is my Current City ?",
        answer: "San Francisco",
        options: ["San Francisco", "London", "Mumbai", "Seattle"]
    },
    {
        question: "Which is the bigger club ?",
        answer: "Liverpool",
        options: ["Chelsea", "Liverpool", "Manchester City", "Manchester United"]
    },
    {
        question: "What is the capital of India ?",
        answer: "Delhi",
        options: ["San Francisco", "Delhi", "Boston", "New York"]
    },
    {
        question: "Which is used for constant variable in JS ?",
        answer: "const",
        options: ["const", "var", "let"]
    },
    {
        question: "How do you add in JS ?",
        answer: "+",
        options: ["&&", "+", "-", "*"]
    }
]


const QuizApp = () => {
    const numberOfQuestions = QuestionsAndAnswer.length;
    const arr = Array(numberOfQuestions).fill(0);
    const [resultCount, setResultCount] = useState(arr);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [message, setMessage] = useState("");
    const [isSubmitPage, setIsSubmitPage] = useState(Boolean)
    const [selected, setSelected] = useState<string | null>(null);

    const handleNextClick = () => {
        setCurrentQuestion((prevTab) => prevTab + 1);
    };

    const handlePreviousClick = () => {
        setCurrentQuestion((prevTab) => prevTab - 1);
    };

    const handleAnswer = (e: MouseEvent<HTMLButtonElement>, currentQuestion: number) => {
        if(QuestionsAndAnswer[currentQuestion].answer === e.currentTarget.value) {
            setResultCount((prev) => {
                 prev[currentQuestion] = 1
                return prev;
            });
            setMessage("Correct Answer");
        } else {
            setResultCount((prev) => {
                 prev[currentQuestion] = 0
                return prev;
            });
            setMessage("Wrong Answer");
        }
        setTimeout(() => {
            if(currentQuestion !== QuestionsAndAnswer.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
            }
            setMessage("")
        }, 1000)
    }

    const correctQuestions = (resultArr: number[]) => {
        let count = 0;
        resultArr.forEach((val: number) => {
            if(val === 1) count ++;
        })
        return count;
    }

    const handleTryAgain = () => {
        setCurrentQuestion(0);
        setResultCount(arr);
        setMessage("");
        setIsSubmitPage(false);
    };

    const showSubmitPage = () => {
        return (
            <div className="submit-page">
                <div className="result-message">You Got {correctQuestions(resultCount)}/{numberOfQuestions} Right </div>
                <button className="try-button" onClick={handleTryAgain}>Try Again</button>
            </div>
        )
    }

    const questionsAnswer = (currentQuestion: number) => {
        console.log(currentQuestion)
        return (
            <div className="Questions-container">
                <div className="question-count">Question: {currentQuestion + 1}/{numberOfQuestions}</div>
                <div className="question">{QuestionsAndAnswer[currentQuestion].question}</div>
                <div className="answers">
                    {QuestionsAndAnswer[currentQuestion].options.map((answer: string, answerIndx: number) => (
                            <button
                                className={`${selected === answer ? "selected" : ""} answer-buttons`}
                                key={answerIndx}
                                value={answer}
                                onClick={((e) => {
                                    setSelected(answer)
                                    handleAnswer(e, currentQuestion)
                                })}>
                                {answer}
                            </button>
                    )
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="header">Quiz App</div>
                {!isSubmitPage ? questionsAnswer(currentQuestion) : showSubmitPage()}
            {!isSubmitPage && <div className="Score">
                <span> Score: {correctQuestions(resultCount)} / {numberOfQuestions}</span>
            </div>}
            <div className={`${resultCount[currentQuestion] === 1 ? "green" : "red"} message`}>{message}</div>
            {currentQuestion == QuestionsAndAnswer.length - 1 && !isSubmitPage && (
                <button className="submit-button" onClick={() => setIsSubmitPage(true)}>Submit</button>
            )}
            <div className="buttons">
                {currentQuestion > 0 && !isSubmitPage && (
                    <button className="previous-button" onClick={handlePreviousClick}>Previous</button>
                )}
                {currentQuestion !== QuestionsAndAnswer.length - 1 && !isSubmitPage &&  (
                    <button className="next-button" onClick={handleNextClick}>Next</button>
                )}
            </div> 
        </div>
    )

}

export default QuizApp;