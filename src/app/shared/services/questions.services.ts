import { Questions } from '../models/questions.model';
import { Injectable } from "@angular/core";

@Injectable()
export class QuestionsService {

  private questions: Questions[] = [
    new Questions(
      1,          //unique index id
      1,          //quiz id
      "What colour is the sky?",
      "Good job, the sky is Blue",
      "That was an incorrect answer, try again.",
      [["Blue", true], ["Red", false], ["Green", false]]
    ),

    new Questions(
      2,
      1,
      "What colour is the sea?",
      "Good job, the sea is Green",
      "That was an incorrect answer, try again.",
      [["Green", true], ["Red", false], ["Blue", false]]
    ),

    new Questions(
      3,
      1,
      "What colour is the sand?",
      "Good, job, the and is yellow",
      "That was an incorrect answer, try again.",
      [["Yellow", true], ["Green", false], ["Blue", false]]
    ),

    new Questions(
      4,
      2,
      "Array values that are keyed by integer values are called:",
      "Correct, PHP indexed array is an array which is represented by an index number.\nAll elements of the array are represented by an index number which starts from 0.\nPHP indexed arrays can store numbers, strings or any object.\nPHP indexed array is also known as numeric array.",
      "That was an incorrect answer, try again.",
      [["indexed arrays", true], ["associative arrays", false], ["absolute arrays", false], ["multi-dimensional arrays", false]]
    ),

    new Questions(
      5,
      2,
      "How do you test if the following variable is numeric?\n$number = 5;",
      "Correct, is_numeric returns true if the variable is a number or a numeric string, false otherwise.",
      "That was an incorrect answer, try again.",
      [["is_numeric($number)", true], ["isnumeric($number)", false], ["is_number($number)", false]]
    ),

    new Questions(
      6,
      2,
      "How do you test if the following variable is an integer?\n$number = 5;",
      "Correct, is_int() can be used to test if the type of the given variable is an integer.\nTo test if a variable is a number or a numeric string (such as form input, which is always a string), you must use is_numeric().",
      "That was an incorrect answer, try again.",
      [["is_int($number)", true], ["isint($number)", false], ["is_numeric($number)", false]]
    ),


    new Questions(
      7,
      2,
      "How do you sort the following array in ascending order?\n$ages = (10, 20, 19, 2, 29); ",
      "Correct, indexed arrays are sorted using sort(), while asort() is for associative arrays sorted by value, and ksort is for assoiative arrays by key.",
      "That was an incorrect answer, try again.",
      [["sort($ages)", true], ["asort($ages)", false], ["ksort($ages)", false]]
    ),

    new Questions(
      8,
      2,
      "Which of the following are correct ways of creating an array called group?\n(1) $group[0] = \"admin\";\n(2) group[0] = \"admin\";\n(3) $group = array(\"admin\");\n(4) $group[] = array(\"admin\");",
      "Correct, (2) is incorrect as the variable does not start with $, and (4) is incorrect as you do not need to use the [] with an array construtor.", 
      "That was an incorrect answer, try again.",
      [["(1) and (3)", true], ["(2) and (3)", false], ["(4)", false], ["(2)", false]]
    ),

    new Questions(
      9,
      3,
      "How do you create a component?",
      "Correct, enter 'ng generate component mycomponent' in your command window",
      "That was an incorrect answer, try again.",
      [["ng generate component mycomponent", true], ["ng create component mycomponent", false], ["npm generate mycomponent", false]]
    ),

    new Questions(
      10,
      3,
      "How do you create a new angular project?",
      "Correct, enter 'ng new my-dream-app' in your command window.",
      "That was an incorrect answer, try again.",
      [["ng new my-dream-app", true], ["ng create my-dream-app", false], ["npm new my-dream-app", false]]
    ),


  ];

  //--------------------------------
  //Returns all questions
  getQuestions(): Questions[] {
    return this.questions.slice();
  }

  //--------------------------------
  //Gets one row where index is the array index starting at 0
  getQuestion(question_id: number): Questions {
    //console.log("questions: " + question_id)
    return this.questions[question_id];
  }

  //--------------------------------
  //Get all questions for a given quiz id
  getQuestionsByQuiz_ID(quiz_id: number) {

    //https://stackoverflow.com/questions/52311150/find-all-matching-elements-with-in-an-array-of-objects
    //Filter array by quiz_id

    //const items = this.questions.filter(item => item.quiz_id == quiz_id);
    const items = this.shuffleArray(this.questions.filter(item => item.quiz_id == quiz_id));

    return items;
  }


  //--------------------------------
  //Randomly shuffle the array
  //https://embed.plnkr.co/plunk/8gXT0Z
  shuffleArray(array: Questions[]): Questions[] {

    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;

  }


  //--------------------------------
  //Create a new question


  //--------------------------------
  //Update an existing question



}


