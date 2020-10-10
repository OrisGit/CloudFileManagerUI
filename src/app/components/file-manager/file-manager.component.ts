import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../service/session.service';
import {Directory} from '../../model/directory';
import {ContentManagerService} from '../../service/content-manager.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  @ViewChild('contextMenu', {static: false})
  contextMenu: ElementRef;

  fileUploaderIsOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    public contentManager: ContentManagerService,
    private renderer: Renderer2
  ) {
    console.log('Costructor');
    if (!this.session.isLoggedIn) {
      this.router.navigate(['signin']);
    }
  }

  openDirectory(directory: Directory): void {
    console.log(directory.id);
    this.contentManager.loadContentFor(directory);
  }

  openPreviousDirectory(): void {
    this.contentManager.loadContentForPreviousDirectory();
  }

  ngOnInit(): void {
  }

  upload(files: any): void {
    console.log('files to upload ' + JSON.stringify(files));
  }

  openDirectoryByIndex(index: number): void {
    this.contentManager.loadContentForDirectoryByIndex(index);
  }

  onRightClick(event): boolean {
    const top = event.pageY;
    console.log('top ' + event.pageY);
    const left = event.pageX;
    console.log('left ' + event.pageX);
    this.contextMenu.nativeElement.setAttribute('style', 'display: block; top: ' + top + 'px; left: ' + left + 'px;');
    this.renderer.addClass(this.contextMenu.nativeElement, 'show');

    return false;
  }

  closeContextMenu() {
    this.renderer.removeClass(this.contextMenu.nativeElement, 'show');
    this.contextMenu.nativeElement.removeAttribute('style');
  }
}
