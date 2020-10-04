import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../../app-constants';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  test() {
    this.http.get(AppConstants.HOST + '/test', {})
      .subscribe(value => console.log(value), error => console.log(error));
  }

}
