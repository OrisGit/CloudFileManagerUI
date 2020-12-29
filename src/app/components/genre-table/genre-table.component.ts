import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../service/session.service";
import {Genre} from "../../model/genre";
import {GenreService} from "../../service/genre.service";

@Component({
  selector: 'app-genre-table',
  templateUrl: './genre-table.component.html',
  styleUrls: ['./genre-table.component.css']
})
export class GenreTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'delete'];
  data: Genre[] = [];

  constructor(public session: SessionService, private genreService: GenreService) {
    genreService.getAll().subscribe(value =>
    {this.data = value;
      console.log(value)}
    );
  }

  delete(id: string) {
    this.genreService.delete(id)
      .subscribe(value => this.genreService.getAll().subscribe(value1 => this.data = value1));
  }

  ngOnInit(): void {
  }


}
