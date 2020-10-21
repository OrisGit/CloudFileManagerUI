import {FileDTO} from './fileDTO';
import {Directory} from './directory';

export class FileManagerItem {
  constructor(item: FileDTO | Directory) {
    this.description = item;
  }

  description: FileDTO | Directory;
  isSelected = false;
}
