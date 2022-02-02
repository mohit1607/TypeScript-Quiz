// here we will define function to randomize or shuffel the questions.

export const shuffleArray = (array: any[]) => 
    [...array].sort(() => Math.random() - 0.5);

    //array.sort method with randomization    remember this for future.