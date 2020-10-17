import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Directory} from '../model/directory';
import {AppConstants} from '../app-constants';
import {Observable} from 'rxjs';
import {DirectoryContent} from '../model/directory-content';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(
    private http: HttpClient
  ) {
  }

  getDirectoryContent(directoryId: string): Observable<DirectoryContent> {
    const url = this.createPath(directoryId);
    console.log('Execute request getDirectoryContent');
    return this.http.get<DirectoryContent>(url, {});
  }

  createDirectory(parentId: string, name: string): Observable<Directory> {
    const url = this.createPath(parentId);
    return this.http.post<Directory>(url, {name});
  }

  updateDirectoryName(directory: Directory, newName: string): Observable<any> {
    directory.name = newName;
    return this.http.put(AppConstants.DIRECTORY_TREE_API_V1, directory);
  }

  private createPath(directoryId: string): string {
    return AppConstants.DIRECTORY_TREE_API_V1 + '/' + directoryId;
  }
}
