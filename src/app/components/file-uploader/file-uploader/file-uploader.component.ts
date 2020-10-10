import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileDTO} from '../../../model/fileDTO';
import {FileUploaderService} from '../../../service/file-uploader.service';
import {SelectedFile} from '../../../model/selected-file';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {ContentManagerService} from '../../../service/content-manager.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedFiles: SelectedFile[] = [];

  constructor(
    private fileUploader: FileUploaderService,
    private contentManager: ContentManagerService
  ) {
  }

  ngOnInit(): void {
  }

  @ViewChild('FileSelectInput') FileSelectInputDialog: ElementRef;

  public openAddFilesDialog(): void {
    const e: HTMLElement = this.FileSelectInputDialog.nativeElement;
    e.click();
  }

  onFileSelected(event): void {
    if (event.target.files.length > 0) {
      console.log('File selected: ' + event.target.files[0].name);

      const file = new FileDTO();
      const nameAndExtension = event.target.files[0].name.split('.', 2);
      file.name = nameAndExtension[0];
      if (nameAndExtension.length > 1) {
        file.extension = nameAndExtension[1];
      }
      file.size = event.target.files[0].size;

      const selectedFile = new SelectedFile();
      selectedFile.file = file;
      selectedFile.progress = 0;

      this.selectedFiles.push(selectedFile);

      this.fileUploader.uploadFile(event.target.files[0]).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          selectedFile.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.contentManager.reloadContent();
        }
      });
    }
  }
}
