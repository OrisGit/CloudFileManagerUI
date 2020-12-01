import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    const params = new HttpParams().set('parentId', parentId);
    return this.http.post<Directory>(AppConstants.DIRECTORY_TREE_API_V1, {name}, {params:params});
  }

  updateDirectoryName(directory: Directory, newName: string): Observable<any> {
    const url = this.createPath(directory.id);
    directory.name = newName;
    return this.http.put(url, directory);
  }

  private createPath(directoryId: string): string {
    return AppConstants.DIRECTORY_TREE_API_V1 + '/' + directoryId;
  }
}
