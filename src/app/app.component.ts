import { Component } from '@angular/core';
import { UserServiceService } from './service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CloudFileStorageFrontendV2';

  constructor(
    public userService: UserServiceService
  ) {
  }
}
