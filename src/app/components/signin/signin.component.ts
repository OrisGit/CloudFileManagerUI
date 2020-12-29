import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {SessionService} from '../../service/session.service';

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
    private userService: UserService,
    private session: SessionService
  ) {
    if (this.session.isLoggedIn) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.errorField.nativeElement.hidden = true;
    this.userService.login(this.email, this.password)
      .subscribe(
        () => this.router.navigate(['file-manager']),
        (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status !== 401) {
            this.errorField.nativeElement.innerText = error.error.message;
          }
          this.errorField.nativeElement.hidden = false;
        }
      );
  }
}
