import { Component, OnInit } from '@angular/core';
import {Developer} from "../../model/developer";
import {SessionService} from "../../service/session.service";
import {DeveloperService} from "../../service/developer.service";
import {DialogsService} from "../../service/dialogs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-developer-table',
  templateUrl: './developer-table.component.html',
  styleUrls: ['./developer-table.component.css']
})
export class DeveloperTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'headquarters', 'founded', 'update', 'delete'];
  data: Developer[] = [];
  current: Developer;
  modalHeader: string;
  modalButtonText: string;


  constructor(public session: SessionService,
              private router: Router,
              private developerService: DeveloperService,
              public modal: DialogsService) {
    if (!this.session.isLoggedIn) {
      this.router.navigate(['signin']);
    } else {
      developerService.getAll().subscribe(value =>
        {this.data = value;
          console.log(value)}
      );
    }

  }

  delete(id: string) {
    this.developerService.delete(id)
      .subscribe(value => this.developerService.getAll().subscribe(value1 => this.data = value1));
  }

  update() {
    this.developerService.update(this.current, this.current.id)
      .subscribe(value => this.developerService.getAll().subscribe(value1 => this.data = value1));
  }

  add() {
    this.developerService.add(this.current)
      .subscribe(value => this.developerService.getAll().subscribe(value1 => this.data = value1));
  }

  ngOnInit(): void {
  }

  startCreate() {
    this.current = new Developer();
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
