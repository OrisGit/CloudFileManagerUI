import { Component, OnInit } from '@angular/core';
import {Game} from "../../model/game";
import {SessionService} from "../../service/session.service";
import {GameService} from "../../service/game.service";
import {DialogsService} from "../../service/dialogs.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GameTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'release', 'pegiRate', 'criticsScore', 'personalScore', 'update', 'delete'];
  data: Game[] = [];
  current: Game;
  modalHeader: string;
  modalButtonText: string;
  expandedElement: Game | null;


  constructor(public session: SessionService, private router: Router, private gameService: GameService, public modal: DialogsService) {
    if (!this.session.isLoggedIn) {
      this.router.navigate(['signin']);
    } else {
      gameService.getAll().subscribe(value =>
        {this.data = value;
          console.log(value)}
      );
    }

  }

  delete(id: string) {
    this.gameService.delete(id)
      .subscribe(value => this.gameService.getAll().subscribe(value1 => this.data = value1));
  }

  update() {
    this.gameService.update(this.current, this.current.id)
      .subscribe(value => this.gameService.getAll().subscribe(value1 => this.data = value1));
  }

  add() {
    this.gameService.add(this.current)
      .subscribe(value => this.gameService.getAll().subscribe(value1 => this.data = value1));
  }

  ngOnInit(): void {
  }

  startCreate() {
    this.current = new Game();
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

  deleteGenre(element, genreId) {
    let index = element.genres.findIndex(value => value.id === genreId);
    if(index > -1) {
      element.genres.splice(index, 1);
    }
    this.gameService.update(element, element.id)
      .subscribe(value => this.gameService.getAll().subscribe(value1 => this.data = value1));
  }

  deletePlatform(element, platformId) {
    let index = element.platforms.findIndex(value => value.id === platformId);
    if(index > -1) {
      element.platforms.splice(index, 1);
    }
    this.gameService.update(element, element.id)
      .subscribe(value => this.gameService.getAll().subscribe(value1 => this.data = value1));
  }

  deletePublisher(element, publisherId) {
    let index = element.publishers.findIndex(value => value.id === publisherId);
    if(index > -1) {
      element.publishers.splice(index, 1);
    }
    this.gameService.update(element, element.id)
      .subscribe(value => this.gameService.getAll().subscribe(value1 => this.data = value1));
  }
}
