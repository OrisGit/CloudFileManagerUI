import {Injectable} from '@angular/core';
import {FileDTO} from '../model/fileDTO';
import {Directory} from '../model/directory';
import {FileManagerItem} from '../model/file-manager-item';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedFiles: FileManagerItem[] = [];
  selectedDirectories: FileManagerItem[] = [];

  constructor() {
  }

  public select(item: FileManagerItem): void {
    console.log('Selected element: ' + JSON.stringify(item));
    item.isSelected = true;
    if (item.isDirectory) {
      if(this.selectedDirectories.indexOf(item) === -1) {
        this.selectedDirectories.push(item);
        console.log('Select dir: ' + item.description.id);
      }
    } else {
      if(this.selectedFiles.indexOf(item) === -1) {
        this.selectedFiles.push(item);
        console.log('Select file: ' + item.description.id);
      }
    }
  }

  public unselect(item: FileManagerItem): void {
    console.log('Selected element: ' + JSON.stringify(item));
    item.isSelected = false;
    if (item.isDirectory) {
      this.deleteItem(this.selectedDirectories, item);
      console.log('Unselect dir: ' + item.description.id);
    } else {
      this.deleteItem(this.selectedFiles, item);
      console.log('Unselect file: ' + item.description.id);
    }
  }

  private deleteItem(arr, item): void {
    const index = arr.indexOf(item);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  public cleanSelection(): void {
    console.log('Clean selection');
    this.selectedDirectories.forEach(value => value.isSelected = false);
    this.selectedFiles.forEach(value => value.isSelected = false);
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
    return this.selectedDirectories[0].description;
  }

  public getSelectedFile(): FileDTO {
    return this.selectedFiles[0].description;
  }
}
