import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {Genre} from "../../model/genre";
import {GenreService} from "../../service/genre.service";
import {DialogsService} from "../../service/dialogs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-genre-table',
  templateUrl: './genre-table.component.html',
  styleUrls: ['./genre-table.component.css']
})
export class GenreTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'update', 'delete'];
  data: Genre[] = [];
  current: Genre;
  modalHeader: string;
  modalButtonText: string;


  constructor(public session: SessionService,  private router: Router, private genreService: GenreService, public modal: DialogsService) {
    if (!this.session.isLoggedIn) {
      this.router.navigate(['signin']);
    } else {
      genreService.getAll().subscribe(value =>
        {this.data = value;
          console.log(value)}
      );
    }

  }

  delete(id: string) {
    this.genreService.delete(id)
      .subscribe(value => this.genreService.getAll().subscribe(value1 => this.data = value1));
  }

  update() {
    this.genreService.update(this.current, this.current.id)
      .subscribe(value => this.genreService.getAll().subscribe(value1 => this.data = value1));
  }

  add() {
    this.genreService.add(this.current)
      .subscribe(value => this.genreService.getAll().subscribe(value1 => this.data = value1));
  }

  ngOnInit(): void {
  }

  startCreate() {
    this.current = new Genre();
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
