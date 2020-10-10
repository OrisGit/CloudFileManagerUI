export class FileDTO {
  id: string;
  name: string;
  extension: string;
  size: number;
  created: Date;
  modified: Date;
  parentDirectoryId: string;
}
