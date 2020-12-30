import { Component, OnInit } from '@angular/core';
import {Publisher} from "../../model/publisher";
import {SessionService} from "../../service/session.service";
import {PublisherService} from "../../service/publisher.service";
import {DialogsService} from "../../service/dialogs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-publisher-table',
  templateUrl: './publisher-table.component.html',
  styleUrls: ['./publisher-table.component.css']
})
export class PublisherTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'headquarters', 'founded', 'update', 'delete'];
  data: Publisher[] = [];
  current: Publisher;
  modalHeader: string;
  modalButtonText: string;


  constructor(public session: SessionService, private router: Router, private publisherService: PublisherService, public modal: DialogsService) {
    if (!this.session.isLoggedIn) {
      this.router.navigate(['signin']);
    } else {
      publisherService.getAll().subscribe(value =>
        {this.data = value;
          console.log(value)}
      );
    }
  }

  delete(id: string) {
    this.publisherService.delete(id)
      .subscribe(value => this.publisherService.getAll().subscribe(value1 => this.data = value1));
  }

  update() {
    this.publisherService.update(this.current, this.current.id)
      .subscribe(value => this.publisherService.getAll().subscribe(value1 => this.data = value1));
  }

  add() {
    this.publisherService.add(this.current)
      .subscribe(value => this.publisherService.getAll().subscribe(value1 => this.data = value1));
  }

  ngOnInit(): void {
  }

  startCreate() {
    this.current = new Publisher();
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
