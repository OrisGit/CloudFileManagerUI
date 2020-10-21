export class FileManagerItem {
  constructor(item: any, isDirectory: boolean) {
    this.description = item;
    this.isDirectory = isDirectory;
  }

  description: any;
  isSelected = false;
  isDirectory;
}
