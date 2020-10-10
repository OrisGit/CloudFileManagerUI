import {Injectable} from '@angular/core';
import {FileService} from './file.service';
import {ContentManagerService} from './content-manager.service';
import {Observable} from 'rxjs';
import {HttpEvent} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(
    private fileService: FileService,
    private contentManager: ContentManagerService) {
  }

  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const currentDirectory = this.contentManager.getCurrentDirectory();
    console.log('Upload file: ' + JSON.stringify(file) + ' to ' + JSON.stringify(currentDirectory));
    return this.fileService.uploadFile(file, currentDirectory.id);
  }
}
