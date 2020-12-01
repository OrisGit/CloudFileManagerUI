import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileDTO} from '../../../model/fileDTO';
import {FileUploaderService} from '../../../service/file-uploader.service';
import {FileToUpload} from '../../../model/file-to-upload';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {ContentManagerService} from '../../../service/content-manager.service';
import {NotificationService} from '../../../service/notification.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedFiles: FileToUpload[] = [];

  constructor(
    private fileUploader: FileUploaderService,
    private contentManager: ContentManagerService,
    private notification: NotificationService
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

      const fileToUpload = new FileToUpload();
      fileToUpload.file = file;
      fileToUpload.progress = 0;

      this.selectedFiles.push(fileToUpload);

      this.fileUploader.uploadFile(event.target.files[0]).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          fileToUpload.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.notification.showSuccess('File ' + fileToUpload.file.name + '.' + fileToUpload.file.extension + ' is completely uploaded!', 'File uploading status');
          this.contentManager.reloadContent();
        }
      });
    }
  }
}
