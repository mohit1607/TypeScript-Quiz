import React from 'react';

//types
import {AnswerObject} from './App'
//styles
import {Wrapper, ButtonWrapper} from './QuestionCard.styles'

type props = {
    question: string;
    answers: string[];
    callback: (e : React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuesions: number;
};

const QuestionCard: React.FC<props> = ({
    question,
    answers,
    callback, 
    userAnswer,
    questionNr, 
    totalQuesions
}) => (
<Wrapper>
    <p className="number">
        Question: {questionNr} / {totalQuesions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question}}/> 
    {/* {here we will set innerhtml by dom instead of doing in p tag} */}
    <div>
        {
            // yet another implicit return
            // key is very important.
            answers.map( answer => (
                <ButtonWrapper  
                key ={answer}
                correct={userAnswer?.correctAnswer === answer
                // here ? is called option chaining.
                }
                 userClicked={userAnswer?.answer == answer}
                >
                    <button disabled={!!userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </ButtonWrapper>
            ))  // we can use {!!userAnswer} to make it boolean and also {userAnswer ? true: false}
        }
    </div>
</Wrapper>
);

// we can use implicit return also i.e we dont need to write the return keyword.


//instead of passing props directly we use implicit props so that we can destructure them in brackets.

export default QuestionCard;
