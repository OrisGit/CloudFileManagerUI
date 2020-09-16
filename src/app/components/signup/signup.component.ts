import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserServiceService} from '../../service/user-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('errorfield') errorField: ElementRef;

  username: string;
  email: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
  }

  send() {
    this.errorField.nativeElement.hidden = true;
    this.userService.register(this.username, this.email, this.password)
      .subscribe(
        () => this.router.navigate(['signin']),
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.errorField.nativeElement.hidden = false;
            this.errorField.nativeElement.innerText = error.error.message;
          }
        }
      );
  }
}
