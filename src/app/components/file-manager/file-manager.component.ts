import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../service/session.service';
import {Directory} from '../../model/directory';
import {ContentManagerService} from '../../service/content-manager.service';
import {FileService} from '../../service/file.service';
import {SelectionService} from '../../service/selection.service';
import {DirectoryService} from '../../service/directory.service';
import {OperationsService} from '../../service/operations.service';
import {FileManagerItem} from '../../model/file-manager-item';
import {DialogsService} from '../../service/dialogs.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  @ViewChild('fileContextMenu', {static: false})
  fileContextMenuRef: ElementRef;

  @ViewChild('areaContextMenu', {static: false})
  areaContextMenu: ElementRef;

  fileUploaderIsOpen = false;
  selectionModeOn = false;

  isCopy: boolean;
  filesToCopy: FileManagerItem[] = [];
  directoriesToCopy: FileManagerItem[] = [];
  clickedItem: FileManagerItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    public contentManager: ContentManagerService,
    private renderer: Renderer2,
    private fileService: FileService,
    private selectionService: SelectionService,
    private directoryService: DirectoryService,
    private operationsService: OperationsService,
    public dialogs: DialogsService
  ) {
    if (!this.session.isLoggedIn) {
      this.router.navigate(['signin']);
    }
  }

  openDirectory(directory: Directory): void {
    console.log(directory.id);
    this.toDisableSelectionMode();
    this.contentManager.loadContentFor(directory);
  }

  openPreviousDirectory(): void {
    this.toDisableSelectionMode();
    this.contentManager.loadContentForPreviousDirectory();
  }

  ngOnInit(): void {
  }

  openDirectoryByIndex(index: number): void {
    this.toDisableSelectionMode();
    this.contentManager.loadContentForDirectoryByIndex(index);
  }

  onRightClick(event, selectedItem?: any): boolean {
    if (event.target.classList.contains('row')) {
      this.hideContextMenu(this.fileContextMenuRef);
      return this.onRightClickOnArea(event);
    } else if (selectedItem !== undefined) {
      this.hideContextMenu(this.areaContextMenu);
      return this.onRightClickOnFile(event, selectedItem);
    }
  }

  onRightClickOnFile(event, selectedItem: FileManagerItem): boolean {
    this.showContextMenu(event, this.fileContextMenuRef);
    selectedItem.isSelected = true;
    this.clickedItem = selectedItem;
    return false;
  }

  onRightClickOnArea(event: any): boolean {
    if (!this.selectionModeOn) {
      this.showContextMenu(event, this.areaContextMenu);
    }

    return false;
  }

  onCloseContextMenu(): void {
    this.hideContextMenu(this.areaContextMenu);
    this.hideContextMenu(this.fileContextMenuRef);
    this.cleanSelection();
  }

  cleanSelection() {
    if(this.clickedItem !== undefined) {
      this.clickedItem.isSelected = false;
      this.clickedItem = undefined;
    }
    if (!this.selectionModeOn) {
      this.selectionService.cleanSelection();
    }
  }

  hideContextMenu(contextMenu: ElementRef): void {
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
    this.selectionService.select(this.clickedItem);
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
    this.toDisableSelectionMode();
  }

  delete(): void {
    this.selectionService.select(this.clickedItem);
    if (this.selectionService.hasSelectedItems()) {
      console.log('Execute delete request');
      this.operationsService.deleteOperation(this.selectionService.selectedFiles.map(value => value.description.id),
        this.selectionService.selectedDirectories.map(value => value.description.id))
        .subscribe(() => this.contentManager.reloadContent());
    }
    this.onCloseContextMenu();
    this.toDisableSelectionMode();
  }

  copy(): void {
    this.selectionService.select(this.clickedItem);
    this.isCopy = true;
    this.addSelectedToBuffer();
    this.onCloseContextMenu();
    this.toDisableSelectionMode();
  }

  cut(): void {
    this.selectionService.select(this.clickedItem);
    this.isCopy = false;
    this.addSelectedToBuffer();
    this.onCloseContextMenu();
    this.toDisableSelectionMode();
  }

  addSelectedToBuffer(): void {
    this.filesToCopy = [...this.selectionService.selectedFiles];
    this.directoriesToCopy = [...this.selectionService.selectedDirectories];
  }

  paste(): void {
    if (this.bufferHasElements()) {
      if (this.isCopy) {
        console.log('Execute copy request');
        this.operationsService.copyOperation(this.filesToCopy.map(value => value.description.id),
          this.directoriesToCopy.map(value => value.description.id), this.contentManager.getCurrentDirectory().id)
          .subscribe(() => this.contentManager.reloadContent());
      } else {
        console.log('Execute copy request');
        this.operationsService.moveOperation(this.filesToCopy.map(value => value.description.id),
          this.directoriesToCopy.map(value => value.description.id), this.contentManager.getCurrentDirectory().id)
          .subscribe(() => this.contentManager.reloadContent());
      }
    }
    this.onCloseContextMenu();
  }

  bufferHasElements(): boolean {
    return this.filesToCopy.length > 0 || this.directoriesToCopy.length > 0;
  }

  itemOnClick(item: FileManagerItem): void {
    if (this.selectionModeOn) {
      if (item.isSelected) {
        this.selectionService.unselect(item);
      } else {
        this.selectionService.select(item);
      }
    } else if (item.isDirectory) {
      this.openDirectory(item.description);
    }
  }

  toggleSelectionMode(): void {
    if (this.selectionModeOn) {
      this.toDisableSelectionMode();
    } else {
      this.toEnableSelectionMode();
    }
  }

  selectAll(): void {
    this.toEnableSelectionMode();
    this.selectionService.cleanSelection();
    this.contentManager.directories.forEach(value => this.selectionService.select(value));
    this.contentManager.files.forEach(value => this.selectionService.select(value));
  }

  toEnableSelectionMode(): void {
    this.selectionModeOn = true;
    this.fileUploaderIsOpen = false;
  }

  toDisableSelectionMode(): void {
    this.selectionModeOn = false;
    this.selectionService.cleanSelection();
  }

  openFileUploader(): void {
    if(!this.selectionModeOn) {
      this.fileUploaderIsOpen = !this.fileUploaderIsOpen;
    }
  }

  renameDirectory(newName: string): void {
    this.directoryService
      .updateDirectoryName(this.clickedItem.description, newName)
      .subscribe(() => this.contentManager.reloadContent());
    this.onCloseContextMenu();
  }

  createDirectory(folderName: string): void {
    this.contentManager.createDirectory(folderName)
      .subscribe(() => this.contentManager.reloadContent());
  }
}
