//---------------------------------------
// Answers class
//---------------------------------------//
export class Answers {

  //public id: number;                //Unique id

  public quiz_id: number            //The number of the quiz

  public questionNo: number;        //The question

  public result: boolean;           //If the answer given was true or false.

  public questionTitle: string;     //The question
  //---------------------------------------
  constructor(quiz_id: number, questionNo: number, result: boolean, questionTitle: string ) {

    //this.id = id;
    this.quiz_id = quiz_id;
    this.questionNo = questionNo;
    this.result = result;
    this.questionTitle = questionTitle;

  }


}
