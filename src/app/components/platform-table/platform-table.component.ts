import { Component, OnInit } from '@angular/core';
import {Platform} from "../../model/platform";
import {SessionService} from "../../service/session.service";
import {PlatformService} from "../../service/platform.service";
import {DialogsService} from "../../service/dialogs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-platform-table',
  templateUrl: './platform-table.component.html',
  styleUrls: ['./platform-table.component.css']
})
export class PlatformTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'developer', 'family', 'update', 'delete'];
  data: Platform[] = [];
  current: Platform;
  modalHeader: string;
  modalButtonText: string;


  constructor(public session: SessionService, private router: Router, private platformService: PlatformService, public modal: DialogsService) {
    if (!this.session.isLoggedIn) {
      this.router.navigate(['signin']);
    } else {
      platformService.getAll().subscribe(value => {this.data = value; });
    }

  }

  delete(id: string) {
    this.platformService.delete(id)
      .subscribe(value => this.platformService.getAll().subscribe(value1 => this.data = value1));
  }

  update() {
    this.platformService.update(this.current, this.current.id)
      .subscribe(value => this.platformService.getAll().subscribe(value1 => this.data = value1));
  }

  add() {
    this.platformService.add(this.current)
      .subscribe(value => this.platformService.getAll().subscribe(value1 => this.data = value1));
  }

  ngOnInit(): void {
  }

  startCreate() {
    this.current = new Platform();
    this.modalHeader = 'Создать запись';
    this.modalButtonText = 'Создать';
  }

  startUpdate(row) {
    this.current = JSON.parse(JSON.stringify(row));
    this.modalHeader = 'Обновить запись';
    this.modalButtonText = 'Обновить';
  }

  commmit() {
    if(this.modalButtonText === 'Обновить') {
      this.update();
    } else {
      this.add();
    }
  }

}
