//---------------------------------------
// Question class
//---------------------------------------//
export class Questions {

  public id: number;                //Unique id

  public quiz_id: number            //The number of the quiz which must match the entry in the Quiz array

  public questionTitle: string;     //The question

  public correctAnswerText: string;        //Text which confirms the answer to give further explanation.

  public inCorrectAnswerText: string;     //Text displayed for incorrect answer

  public questions: [string, boolean][];    //A question as a tuple
  

  //---------------------------------------
  constructor(id: number, quiz_id: number, questionTitle: string, correctAnswerText: string, inCorrectAnswerText: string, questions: [string, boolean][] ) {

    this.id = id;
    this.quiz_id = quiz_id;
    this.questionTitle = questionTitle;
    this.correctAnswerText = correctAnswerText;
    this.inCorrectAnswerText = inCorrectAnswerText;
    this.questions = this.shuffleArray(questions);

  }


  //--------------------------------
  //shuffle questions array here
  //Randomly shuffle the array
  //https://embed.plnkr.co/plunk/8gXT0Z
  shuffleArray(array: [string, boolean][]): [string, boolean][] {

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






}
