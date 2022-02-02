import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';

//components 
import QuestionCard from './QuestionCard';

//styles
import { GlobalStyle , Wrapper} from './App.styles';

//types
import { Difficulty , QuestionState} from './API';

export type AnswerObject = { // export bcoz we have to use it in question card.
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}  // why answer object =  we make object of answer that shows the question and correct answer and our answer this is important
// because when game is finished we might want to show the details of the questions.

// it is easy to modify total questions as we are declaring it out of app fun.
const TOTAL_QUESTIONS = 10 ;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setquestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameover] = useState(true);


  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));  // it will output promise


  // functionality

  const startQuiz = async () => {
    // this function deals with api and stuff.

    setLoading(true);  // loading untill we get the data.
    setGameover(false); // because the game is started.

    try{
      const newQuestions  = await fetchQuizQuestions( 
        TOTAL_QUESTIONS, 
        Difficulty.EASY
        );

        // console.log(newQuestions); // yes we are getting the data I checked.

       setquestions(newQuestions);
    }catch(e){
      console.log(e);  //error handling is necessery. 
    }

    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false); 
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      //Users answer
      const answer = e.currentTarget.value; 
      //check answer against the correct value 
      const correct = questions[number].correct_answer === answer;  // this is boolean
      //add score if answer is correct
      if(correct) setScore(prev => prev + 1);
      //save answer in array for user answr
      const answerObject = {
        question: questions[number].question,
        answer : answer, // when these two are same you can just write answer
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // move on to next question if not last question
    const nextQuestion = number +1; // we are checking already if wer are not on last question.
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameover(true);
    }else {
      setNumber(nextQuestion);
    }
  }


  return (
    <>
    <GlobalStyle/>
    <Wrapper>
    <h1>Quiz</h1>
    {
      // gameOver ? <button className='start' onClick={startQuiz}>Start Quiz</button> : ""
      // instead use this
      gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startQuiz}>Start Quiz</button>
      ) : null    // short circuit operator is "&&" use for conditional rendering.
    }
    {!gameOver ? <p className='score'>Score: {score}</p> : null}
    {loading && <p>Loading questions...</p>}
    {!loading && !gameOver && (
    <QuestionCard
    questionNr={number +1}
    totalQuesions={TOTAL_QUESTIONS}
    question={questions[number].question}
    answers={questions[number].answers}
    userAnswer={  // so here we are passign the question number index in so to check answer is submitted or not.
      userAnswers ? userAnswers[number] : undefined
     }
    callback={checkAnswer}
     />
    )}

    {
      // we will show button if user given the answerand also check we are not on last question.
      !gameOver && !loading && userAnswers.length === number +1 && number !== TOTAL_QUESTIONS -1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question  
        </button>
      ) : null
    }
    </Wrapper>
    </>
  );
};

export default App;

// hey this app is not using question answer inbuilt because it will be easy to hack and cheat so
// we using trivia api for quiz.