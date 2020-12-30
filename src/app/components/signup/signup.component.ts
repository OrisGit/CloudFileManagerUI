import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../service/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  email: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private session: SessionService
  ) {
    if (this.session.isLoggedIn) {
      this.router.navigate(['games']);
    }
  }

  ngOnInit(): void {
  }

  send() {
    this.userService.register(this.username, this.email, this.password)
      .subscribe(
        () => this.router.navigate(['signin']),
        (error: HttpErrorResponse) => {
          if (error.status >= 400) {
            console.log(error);
          }
        }
      );
  }
}
