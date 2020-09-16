import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../../service/user-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserServiceService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout()
      .subscribe(() => this.router.navigate(['signin']));
  }

}
