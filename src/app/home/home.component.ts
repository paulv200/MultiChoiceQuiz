import { Quiz } from '../shared/models/quiz.model';
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/services/quiz.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public quizes: Quiz[];

  constructor(private quizeDataService: QuizService) { }

  //---------------------------------
  ngOnInit(): void {
    this.fetchListOfQuizes();
  }

  //---------------------------------
  //Fetch all quizes and display a list of quizes
  fetchListOfQuizes() {
    this.quizes = this.quizeDataService.getQuizes();
    //console.log("this.quizes: " + this.quizes);
  }

}
