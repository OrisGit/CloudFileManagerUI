import {Injectable} from '@angular/core';
import {FileDTO} from '../model/fileDTO';
import {Directory} from '../model/directory';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedFiles: FileDTO[] = [];
  selectedDirectories: Directory[] = [];

  constructor() {
  }

  public addToSelection(selectedItem: any): void {
    console.log('Selected element: ' + JSON.stringify(selectedItem));
    console.log(selectedItem.extension !== undefined);
    if (selectedItem.extension !== undefined) {
      this.selectedFiles.push(selectedItem);
      console.log('Select file: ' + selectedItem.id);
    } else {
      this.selectedDirectories.push(selectedItem);
      console.log('Select dir: ' + selectedItem.id);
    }
  }

  public cleanSelection(): void {
    console.log('Clean selection');
    this.selectedDirectories = [];
    this.selectedFiles = [];
  }

  public isMultipleSelection(): boolean {
    return this.selectedFiles.length + this.selectedDirectories.length > 1;
  }

  public hasSelectedItems(): boolean {
    console.log('Selected dirs: ' + this.selectedDirectories.length + ' Selected files: ' + this.selectedFiles.length);
    return this.selectedFiles.length + this.selectedDirectories.length > 0;
  }

  public hasSelectedDirectory(): boolean {
    return this.selectedDirectories.length > 0;
  }

  public hasSelectedFile(): boolean {
    return this.selectedFiles.length > 0;
  }

  public getSelectedDirectory(): Directory {
    return this.selectedDirectories[0];
  }

  public getSelectedFile(): FileDTO {
    return this.selectedFiles[0];
  }
}
