import {Component, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {FileItem} from 'ng2-file-upload/file-upload/file-item.class';
import {SchoolService} from "../../services/school.service";
import {SessionTokenService} from "../../../core/session/session-token.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {SessionDataService} from "../../../core/session/session-data.service";

@Component({
  selector: 'app-password-change',
  templateUrl: './logo-change.component.html',
  styleUrls: ['./logo-change.component.css']
})
export class LogoChangeComponent {

  public uploader: FileUploader = new FileUploader({
    removeAfterUpload: true,
    method: 'POST',
    isHTML5: true
  });

  @ViewChild('uploaderRef') uploaderRef;

  constructor(schoolService: SchoolService, sessionTokenService: SessionTokenService,
              private sessionService: SessionDataService) {
    // this.imageData = sessionService.getSchoolLogo();
    // this.imageData = this.imageData ? sanitizer.bypassSecurityTrustStyle('url(' + this.imageData + ')') : 'auto';
   this.uploader.options.url = schoolService.getLogoChangeApiPath();

    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      const token: string = sessionTokenService.token;
      this.uploader.options.headers = [{ name: 'x-auth-token', value : token } ];
      if (this.uploader.queue.length > 1) {
        this.uploader.queue[0].remove();
      }
      fileItem.withCredentials = false;
      fileItem.onComplete = (resp, status: number) => {
        if (status === 200) {
          const blob = new Blob([fileItem._file]);
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const imageData = reader.result;
            sessionService.setSchoolLogo(imageData);
            this.uploaderRef.nativeElement.value = '';
          };
        }
      };
    };

  }

  getImageData() {
    return this.sessionService.getSchoolLogo();
  }
}
