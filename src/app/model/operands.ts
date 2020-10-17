export class Operands {
  constructor(filesIds: string[], directoriesIds: string[]) {
    this.directoriesIds = directoriesIds;
    this.filesIds = filesIds;
  }

  directoriesIds: string[] = [];
  filesIds: string[] = [];
}
