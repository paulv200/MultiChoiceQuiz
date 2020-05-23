//---------------------------------------
// Question class
//---------------------------------------//
export class Quiz {

  public id: number;          //unique id
  public quizTitle: string;
  public quizDescription: string;
  

  //---------------------------------------
  constructor(id: number, quizTitle: string, quizDescription: string) {

    this.id = id;
    this.quizTitle = quizTitle;
    this.quizDescription = quizDescription;

  }

}
