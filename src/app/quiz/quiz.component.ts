import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../shared/services/questions.services';
import { QuizService } from '../shared/services/quiz.services';
import { Questions } from '../shared/models/questions.model';
import { Quiz } from '../shared/models/quiz.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Answers } from '../shared/models/answers.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questionForm: FormGroup;

  public quizIDParam: number;
  public questionsArray: Questions[];             //the array of questions
  public answersArray: Answers[];                 //an array of answers
  public inCorrectAnswerArray: Answers[];         //an array of incorrect answers
  public quiz: Quiz;
  public quizTitle: string;
  public quizDescription: string;
  public questionPosition: number = 0;
  public theQuestion: Questions;
  public correctAnswerText: string = "";
  public inCorrectAnswerText: string = "";
  public hasStarted: boolean = false;               //checks to see that the quiz has started to control the the display of the main form

  public showCorrectAnswer: boolean = false;
  public showInCorrectAnswer: boolean = false;
  public showSubmitButton: boolean = true;
  public showNextButton: boolean = false;
  public showResultButton: boolean = false;
  public showResults: boolean = false;
  public showTitle: boolean = true;


  constructor(private route: ActivatedRoute,
    private quizService: QuizService,
    private questionsService: QuestionsService) { }

  //---------------------------
  ngOnInit(): void {
    this.questionForm = new FormGroup({       //define form
      'question': new FormControl(null, Validators.required)       //define each control with formstate, validation, asyncvalidation
    });
    this.getQuestions();
    this.getQuiz();
  }

  //---------------------------
  getQuestions() {
    this.quizIDParam = parseInt(this.route.snapshot.paramMap.get('id'));
    this.questionsArray = this.questionsService.getQuestionsByQuiz_ID(this.quizIDParam);
  }

  //---------------------------
  getQuiz() {
    this.quiz = this.quizService.getQuiz(this.quizIDParam);
    this.quizTitle = this.quiz.quizTitle;
    this.quizDescription = this.quiz.quizDescription;
  }

  //---------------------------
  noOfQuestions(): number {
    return this.questionsArray.length;
  }

  //---------------------------
  //Button start from beginning of questions
  onStart() {
    this.questionPosition = 0;
    this.hasStarted = true;
    this.theQuestion = this.questionsArray[this.questionPosition];
    this.answersArray = [];
    this.inCorrectAnswerArray = [];
    this.questionForm.reset();    //Reset the form for next question
    this.showSubmitButton = true;
    this.showResultButton = false;
    this.showNextButton = false;
    this.showCorrectAnswer = false;
    this.showInCorrectAnswer = false;
  }

  //---------------------------
  //Select next question button
  onNextQuestion() {  
 
    this.questionPosition++;
    if (this.questionPosition < this.questionsArray.length) {
      this.theQuestion = this.questionsArray[this.questionPosition];
    }
    this.startAnsDisplay();
    this.questionForm.reset();      //Reset the form for next question
  }

  //---------------------------
  //Select next question button
  onSkipQuestion() {

    if (this.questionPosition < this.questionsArray.length - 1) {

        if (!this.checkIfAnswerExists(this.answersArray, this.quizIDParam, this.questionPosition + 1)) {
          //Create answer details and add to the array answersArray
          var theAnswer: Answers = new Answers(this.quizIDParam, this.questionPosition + 1, false, this.theQuestion.questionTitle);     //Set theAnswer to false
          this.answersArray.push(theAnswer);
        }

        this.questionPosition++;    //reset for new question

        this.theQuestion = this.questionsArray[this.questionPosition];
        this.startAnsDisplay();
        this.questionForm.reset();      //Reset the form for next question      
    }
    else
    {                                 //If at end then set buttons.
        this.showResultButton = true;
        this.showNextButton = false;
        this.showSubmitButton = false;

        if (!this.checkIfAnswerExists(this.answersArray, this.quizIDParam, this.questionPosition + 1)) {
          var theAnswer: Answers = new Answers(this.quizIDParam, this.questionPosition + 1, false, this.theQuestion.questionTitle);     //Set theAnswer to false
          this.answersArray.push(theAnswer);
        }
 
    } 

  }

  //---------------------------
  //Click answer button
  //If form has no errors then continue
  //    Add the answer to the ansersArray
  //    Check if the answer is correct
  //      If answer is correct then say "Well Done" else say "Not Correct"
  //         If not correct, ask if want to try again
  onSubmit() {    

    if (this.questionForm.status === "VALID") {   //form must be valid and not submitted

      var enteredAnswer: string = "";
      enteredAnswer = this.questionForm.value.question;

      if (this.isAnswerCorrect(enteredAnswer, this.theQuestion)) {
            //Correct answer
            this.correctAnsDisplay();

            if (!this.checkIfAnswerExists(this.answersArray, this.quizIDParam, this.questionPosition + 1)) {
              //only make the answer true if the person has answered the question 0 times before
              //Create answer details and add to the array answersArray
              var theAnswer: Answers = new Answers(this.quizIDParam, this.questionPosition + 1, true, this.theQuestion.questionTitle);     //Set theAnswer to true
              this.answersArray.push(theAnswer);
            }

            var atEnd: boolean = false;
            if (this.questionPosition + 1 >= this.questionsArray.length) {
              atEnd = true;            
            }

            if (atEnd) {   //If at end then set buttons.
              this.showResultButton = true;
              this.showNextButton = false;
            }

            this.correctAnswerText = this.theQuestion.correctAnswerText;
      }
      else {
        //Not correct answer
        this.inCorrectAnsDisplay();
        this.inCorrectAnswerText = this.theQuestion.inCorrectAnswerText;
        
        if (!this.checkIfAnswerExists(this.answersArray, this.quizIDParam, this.questionPosition + 1)) {
          //only add false to this array if not attempted question before.
          var theAnswer: Answers = new Answers(this.quizIDParam, this.questionPosition + 1, false, this.theQuestion.questionTitle);     //Set theAnswer to true
          this.answersArray.push(theAnswer);
        }

      }

      window.scrollTo(0, 0);    //scroll to top

    }
    else {
      console.log("Form is invalid");
    }   

  }

  //---------------------------
  onShowResults() {
    this.showResults = true;
    this.showTitle = false;
    this.showCorrectAnswer = false;
    this.showInCorrectAnswer = false;
    this.showResultButton = false;

    this.inCorrectAnswerArray = this.answersArray.filter(item => item.result === false);    //return an array of incorrect answers for the display
  }

  //---------------------------
  //Check if this quiz id and question id is already in answersArray.
  //This could be another way of checking if the array should have
  //another entry added instead of using onAttempts.
  checkIfAnswerExists(answersArray: Answers[], quizId: number, questionId: number): boolean {

    var result: Answers[] = [];
    result = answersArray.filter(item => item.quiz_id === quizId && item.questionNo === questionId);    //return an array where quiz_id and questionNo exists
    if (result.length === 0) {
      return false;     //not found in array
    }
    else {
      return true;      //found in array
    }

  }


  //---------------------------
  //Count the number of correct answers
  getNoOfCorrectAnswers(): number {
    var count: number = 0;
    this.answersArray.forEach((element) => {
      if (element.result) {
        count++;
      }
    });
    return count;
  }


  //---------------------------
  //Check the answer to see if it is correct
  isAnswerCorrect(enteredAnswer: string, theQuestion: Questions): boolean {

    //From theQuestion, need to get the "true" value from the array questions
    //where element[0] is the name, and elmenct[1] is true / false.
    var correctAns: string = "";
    theQuestion.questions.forEach((element) => {
      //console.log("questions: " + element);
      //console.log(element[0]);
      //console.log(element[1]);
      if (element[1] === true) {
        correctAns = element[0];
      }
    });

    if (correctAns === enteredAnswer) {
      return true;
    }
    else {
      return false;
    }
    
  }

  //---------------------------
  isAtStart(): boolean {
    if (this.questionPosition == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  //---------------------------
  //Has the Start button been selected
  started(): boolean {
    if (this.hasStarted) {
      return true;
    }
    else {
      return false;
    }
  }

  //---------------------------
  //Checks to see if this radio button is valid
  isRadioValid(): boolean {
    const isValid: boolean = this.questionForm.get('question').valid;
    return isValid;
  }

  //---------------------------
  //Returns true if there are zero incorrect answers, false otherwise
  isZeroIncorrectAnswers(): boolean {

    if (this.inCorrectAnswerArray.length === 0) {
      return true;
    }
    else {
      return false;
    }
    
  }
    
  //---------------------------
  correctAnsDisplay() {
    this.showCorrectAnswer = true;
    this.showInCorrectAnswer = false;
    //this.showBlankRow = false;
    this.showSubmitButton = false;
    this.showNextButton = true;
    this.showResultButton = false;
  }

  //---------------------------
  inCorrectAnsDisplay() {
    this.showCorrectAnswer = false;
    this.showInCorrectAnswer = true;
    //this.showBlankRow = false;
    this.showSubmitButton = true;
    this.showNextButton = false;
    this.showResultButton = false;
  }

  //---------------------------
  startAnsDisplay() {
    this.showCorrectAnswer = false;
    this.showInCorrectAnswer = false;
    //this.showBlankRow = true;
    this.showSubmitButton = true;
    this.showNextButton = false;
    this.showResultButton = false;
  }

}
