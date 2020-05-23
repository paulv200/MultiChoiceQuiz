import { Quiz } from '../models/quiz.model';
import { Injectable } from "@angular/core";

@Injectable()
export class QuizService {

  private quizes: Quiz[] = [
    new Quiz(
      1,
      "What are these colours?",
      "This quiz tests you understanding of some basic colours."
    ),

    new Quiz(
      2,
      "PHP Basics",
      "This quiz tests your basic knowledge of PHP."
    ),

    new Quiz(
      3,
      "Angular Project Questions",
      "This quiz tests your knowledge of starting an Angular project."
    ),

  ];

  

  //--------------------------------
  //Get all quizes
  getQuizes(): Quiz[] {
    return this.quizes.slice();
  }

  //--------------------------------
  //Returns one quiz.  The Quiz is an array with index starting at 0 so need to filter by id and then return quiz[0]
  getQuiz(quiz_id: number): Quiz {
    const quiz = this.quizes.filter(item => item.id == quiz_id);
    return quiz[0];
  }


  //--------------------------------
  //Get all questions for a given quiz id

  //--------------------------------
  //Create a new quiz

  //--------------------------------
  //Update a quiz


}



