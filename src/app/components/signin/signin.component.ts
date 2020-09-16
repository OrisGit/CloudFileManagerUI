import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/user';
import {UserServiceService} from '../../service/user-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('errorfield') errorField: ElementRef;

  email: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService
  ) {
    if(this.userService.authenticated) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.errorField.nativeElement.hidden = true;
    console.log('login is working');
    this.userService.login(this.email, this.password)
      .subscribe(
        () => this.router.navigate(['']),
        (error: HttpErrorResponse) => {
          if (error.status !== 401) {
            this.errorField.nativeElement.innerText = error.error.message;
          }
          this.errorField.nativeElement.hidden = false;
        }
      );
  }
}
