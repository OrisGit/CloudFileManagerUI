import {Injectable} from '@angular/core';
import {DirectoryContent} from '../model/directory-content';
import {DirectoryService} from './directory.service';
import {Directory} from '../model/directory';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ContentManagerService {

  content: DirectoryContent = new DirectoryContent();
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

  createDirectory(name: string): Observable<Directory> {
    const currentDirectory = this.getCurrentDirectory();
    console.log('create: ' + name + ' in ' + JSON.stringify(currentDirectory));
    return this.directoryService.createDirectory(currentDirectory.id, name)
      .pipe(
        tap(value => {
          this.content.directories.push(value);
        })
      );
  }

  private loadContent(directory: Directory): Observable<DirectoryContent> {
    console.log('load content for: ', JSON.stringify(directory));
    return this.directoryService.getDirectoryContent(directory.id)
      .pipe(
        tap(value => {
          this.content = value;
          console.log('loaded content: ' + JSON.stringify(value));
        })
      );
  }

  private getCurrentDirectory(): Directory {
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

  private addToPath(directory: Directory): void {
    console.log('add to path: ' + JSON.stringify(directory));
    this.breadcrumbs.push(directory);
  }

  private removeLastFromPath(): void {
    console.log('remove last dir from path');
    this.breadcrumbs.splice(this.breadcrumbs.length - 1, 1);
  }

  private loadContentForRoot(): void {
    const root = new Directory();
    root.id = this.sessionService.getRootDirectoryId();
    root.name = 'root';
    this.loadContentFor(root);
  }
}
