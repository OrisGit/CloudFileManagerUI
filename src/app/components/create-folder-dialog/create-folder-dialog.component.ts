import { Component, OnInit } from '@angular/core';
import {ContentManagerService} from '../../service/content-manager.service';

@Component({
  selector: 'app-create-folder-dialog',
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.css']
})
export class CreateFolderDialogComponent implements OnInit {

  folderName: string;

  constructor(
    private contentManager: ContentManagerService
  ) { }

  ngOnInit(): void {
  }

  createDirectory(folderName: string): void {
    this.contentManager.createDirectory(folderName)
      .subscribe( () => this.contentManager.reloadContent());
    this.folderName = '';
  }
}
