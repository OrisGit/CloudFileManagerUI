import {Injectable} from '@angular/core';
import {DirectoryContent} from '../model/directory-content';
import {DirectoryService} from './directory.service';
import {Directory} from '../model/directory';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';
import {FileManagerItem} from '../model/file-manager-item';

@Injectable({
  providedIn: 'root'
})
export class ContentManagerService {

  directories: FileManagerItem[] = [];
  files: FileManagerItem[] = [];
  breadcrumbs: Directory[] = [];


  constructor(
    private directoryService: DirectoryService,
    private sessionService: SessionService
  ) {
    this.loadContentForRoot();
  }

  loadContentFor(directory: Directory): void {
    this.loadContent(directory)
      .subscribe(
        () => this.addToPath(directory)
      );
  }

  loadContentForPreviousDirectory(): void {
    this.loadContent(this.getPreviousDirectory())
      .subscribe(() => {
        this.removeLastFromPath();
      });
  }

  loadContentForDirectoryByIndex(index: number): void {
    this.loadContent(this.getDirectoryByIndex(index))
      .subscribe(() => {
        this.removeToIndex(index);
      });
  }

  reloadContent(): void {
    this.loadContentForDirectoryByIndex(this.breadcrumbs.length - 1);
  }

  createDirectory(name: string): Observable<Directory> {
    const currentDirectory = this.getCurrentDirectory();
    console.log('create: ' + name + ' in ' + JSON.stringify(currentDirectory));
    return this.directoryService.createDirectory(currentDirectory.id, name);
  }

  private loadContent(directory: Directory): Observable<DirectoryContent> {
    console.log('load content for: ', JSON.stringify(directory));
    return this.directoryService.getDirectoryContent(directory.id)
      .pipe(
        tap(value => {
          this.files = value.files.map(file => new FileManagerItem(file, false));
          this.directories = value.directories.map(dir => new FileManagerItem(dir, true));
          console.log('loaded content: ' + JSON.stringify(value));
        })
      );
  }

  public getCurrentDirectory(): Directory {
    if (this.breadcrumbs.length === 0) {
      return null;
    } else {
      return this.breadcrumbs[this.breadcrumbs.length - 1];
    }
  }

  private getPreviousDirectory(): Directory {
    if (this.breadcrumbs.length === 0) {
      return null;
    } else {
      return this.breadcrumbs[this.breadcrumbs.length - 2];
    }
  }

  private getDirectoryByIndex(index: number): Directory {
    if (this.breadcrumbs.length === 0) {
      return null;
    } else {
      return this.breadcrumbs[index];
    }
  }

  private addToPath(directory: Directory): void {
    console.log('add to path: ' + JSON.stringify(directory));
    this.breadcrumbs.push(directory);
  }

  private removeLastFromPath(): void {
    console.log('remove last dir from path');
    this.removeToIndex(this.breadcrumbs.length - 2);
  }

  private loadContentForRoot(): void {
    const root = new Directory();
    root.id = this.sessionService.getRootDirectoryId();
    root.name = 'root';
    this.loadContentFor(root);
  }

  private removeToIndex(index: number): void {
    console.log('remove to index: ' + index);

    this.breadcrumbs.splice(index + 1, this.breadcrumbs.length - index - 1);
  }
}
