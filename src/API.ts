import { shuffleArray } from "./utils";

// IN this file we will call api.


// enum is a type defination or enum is new datatype

//exporting types is a good practice you can need them any time in project.
export enum Difficulty {
    EASY = "easy",
    MEDIUM =  "medium",
    HARD = "hard",
}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
} // we should have both correct and incorrect answers in on array so that at the time of quiz we can display the all answers
// we will create another type to handle this.

export type QuestionState = Question & { answers: string[] };
// this will use the types from Question and add this anwers property to it.
 

export const fetchQuizQuestions = async (amount : number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
   // console.log(data);

    //again implicit return.
    return data.results.map( (question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
        // spread operator means include all properties of question and after comma is a new property.
        //By the way it is es6 syntax
    ))


    // here we first await fetch itselg and then await json format of that fetch. This is new thing for me.
} 