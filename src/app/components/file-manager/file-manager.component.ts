import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../service/session.service';
import {Directory} from '../../model/directory';
import {ContentManagerService} from '../../service/content-manager.service';
import {FileService} from '../../service/file.service';
import {FileDTO} from '../../model/fileDTO';
import {SelectionService} from '../../service/selection.service';
import {DirectoryService} from '../../service/directory.service';

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
    private renderer: Renderer2,
    private fileService: FileService,
    private selectionService: SelectionService,
    private directoryService: DirectoryService
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

  onRightClick(event, selectedItem: any): boolean {
    const top = event.pageY;
    const left = event.pageX;
    this.contextMenu.nativeElement.setAttribute('style', 'display: block; top: ' + top + 'px; left: ' + left + 'px;');
    this.renderer.addClass(this.contextMenu.nativeElement, 'show');
    this.selectionService.addToSelection(selectedItem);
    return false;
  }

  closeContextMenu(): void {
    this.renderer.removeClass(this.contextMenu.nativeElement, 'show');
    this.contextMenu.nativeElement.removeAttribute('style');
    this.selectionService.cleanSelection();
  }

  download(): void {
    let request;
    if (this.selectionService.hasSelectedItems()) {
      if (this.selectionService.isMultipleSelection()) {
      } else {
        if (this.selectionService.hasSelectedDirectory()) {
        } else {
          request = this.fileService.downloadFile(this.selectionService.getSelectedFile());
        }
      }
    }

    if (request !== undefined) {
      console.log('Execute download request');
      request.subscribe(response => {
        console.log(response);
        const binaryData = [];
        binaryData.push(response.data);
        const url = window.URL.createObjectURL(new Blob(binaryData));
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        a.download = response.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

      }, error => {

        console.log(error);
      });
      this.closeContextMenu();
    }
  }

  delete(): void {
    let request;
    if (this.selectionService.hasSelectedItems()) {
      if (this.selectionService.isMultipleSelection()) {
      } else {
        if (this.selectionService.hasSelectedDirectory()) {
          request = this.directoryService.deleteDirectory(this.selectionService.getSelectedDirectory().id);
        } else {
          request = this.fileService.deleteFile(this.selectionService.getSelectedFile());
        }
      }
    }

    if (request !== undefined) {
      console.log('Execute delete request');
      request.subscribe(() => this.contentManager.reloadContent());
      this.closeContextMenu();
    }
  }
}
