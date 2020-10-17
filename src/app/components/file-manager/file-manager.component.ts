import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../service/session.service';
import {Directory} from '../../model/directory';
import {ContentManagerService} from '../../service/content-manager.service';
import {FileService} from '../../service/file.service';
import {FileDTO} from '../../model/fileDTO';
import {SelectionService} from '../../service/selection.service';
import {DirectoryService} from '../../service/directory.service';
import {OperationsService} from '../../service/operations.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  @ViewChild('fileContextMenu', {static: false})
  fileContextMenu: ElementRef;

  @ViewChild('areaContextMenu', {static: false})
  areaContextMenu: ElementRef;

  fileUploaderIsOpen = false;

  isCopy: boolean;
  filesToCopy: FileDTO[] = [];
  directoriesToCopy: Directory[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    public contentManager: ContentManagerService,
    private renderer: Renderer2,
    private fileService: FileService,
    private selectionService: SelectionService,
    private directoryService: DirectoryService,
    private operationsService: OperationsService
  ) {
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

  onRightClick(event, selectedItem?: any): boolean {
    if (event.target.classList.contains('row')) {
      this.hideContextMenu(this.fileContextMenu);
      return this.onRightClickOnArea(event);
    } else if (selectedItem !== undefined) {
      this.hideContextMenu(this.areaContextMenu);
      return this.onRightClickOnFile(event, selectedItem);
    }
  }

  onRightClickOnFile(event, selectedItem: any): boolean {
    this.showContextMenu(event, this.fileContextMenu);
    this.selectionService.addToSelection(selectedItem);
    return false;
  }

  onRightClickOnArea(event: any): boolean {
    this.showContextMenu(event, this.areaContextMenu);
    return false;
  }

  onCloseContextMenu(): void {
    this.hideContextMenu(this.areaContextMenu);
    this.hideContextMenu(this.fileContextMenu);
    this.selectionService.cleanSelection();
  }

  private hideContextMenu(contextMenu: ElementRef): void {
    this.renderer.removeClass(contextMenu.nativeElement, 'show');
    contextMenu.nativeElement.removeAttribute('style');
  }

  private showContextMenu(event: any, contextMenu: ElementRef): void {
    const top = event.pageY;
    const left = event.pageX;
    contextMenu.nativeElement.setAttribute('style', 'display: block; top: ' + top + 'px; left: ' + left + 'px;');
    this.renderer.addClass(contextMenu.nativeElement, 'show');
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
      this.onCloseContextMenu();
    }
  }

  delete(): void {
    if (this.selectionService.hasSelectedItems()) {
      console.log('Execute delete request');
      this.operationsService.deleteOperation(this.selectionService.selectedFiles.map(value => value.id),
        this.selectionService.selectedDirectories.map(value => value.id))
        .subscribe(() => this.contentManager.reloadContent());
    }
    this.onCloseContextMenu();
  }

  copy(): void {
    this.isCopy = true;
    this.addSelectedToBuffer();
    this.onCloseContextMenu();
  }

  cut(): void {
    this.isCopy = false;
    this.addSelectedToBuffer();
    this.onCloseContextMenu();
  }

  addSelectedToBuffer(): void {
    this.filesToCopy = [...this.selectionService.selectedFiles];
    this.directoriesToCopy = [...this.selectionService.selectedDirectories];
  }

  paste(): void {
    if (this.bufferHasElements()) {
      if (this.isCopy) {
        console.log('Execute copy request');
        this.operationsService.copyOperation(this.filesToCopy.map(value => value.id),
          this.directoriesToCopy.map(value => value.id), this.contentManager.getCurrentDirectory().id)
          .subscribe(() => this.contentManager.reloadContent());
      } else {
        console.log('Execute copy request');
        this.operationsService.moveOperation(this.filesToCopy.map(value => value.id),
          this.directoriesToCopy.map(value => value.id), this.contentManager.getCurrentDirectory().id)
          .subscribe(() => this.contentManager.reloadContent());
      }
    }
    this.onCloseContextMenu();
  }

  bufferHasElements(): boolean {
    return this.filesToCopy.length > 0 || this.directoriesToCopy.length > 0;
  }
}
