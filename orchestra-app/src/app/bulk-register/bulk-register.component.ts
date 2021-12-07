import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/test/';

@Component({
  selector: 'app-bulk-register',
  templateUrl: './bulk-register.component.html',
  styleUrls: ['./bulk-register.component.css']
})
export class BulkRegisterComponent implements OnInit {

  fileName = '';
  uploading = false;
  uploadProgress: number;
  uploadSub: Subscription;
  
  formData = new FormData();
  failedUpload = false;
  failWarning = false;

  Message: any = null;
  done = false;
  requiredFileType = ".csv";

  constructor(private userService: UserService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getAdminViews().subscribe(
      data => {
        console.log(data);
      },
      err => {
        this.router.navigate(['login']);
      }
    );
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        this.formData.append("bulk", file);
        
    }
}

  upload() {
    this.uploading = true;
    console.log("sending")
    const upload$ = this.http.post(AUTH_API + "uploadBulk", this.formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
  })
  .pipe(
    finalize(() => {
      this.reset();
    })
  );
  this.uploadSub = upload$.subscribe(event => {
    if (event.type == HttpEventType.UploadProgress) {
      this.uploadProgress = Math.round(100 * (event.loaded / event.total));
    } else if ( event.type == HttpEventType.Response ) {
      if (event.status == 200) {
        this.Message = event.body;
        console.log(this.Message.length, this.Message[0].hasOwnProperty('success'));
        if (this.Message[0].hasOwnProperty('success')) {
          this.done = true;
        } else {
          this.failWarning = true;
        }
      } else {
        this.failedUpload = true;
      }
      
    }
  }) 

}

cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

  reset() {
    console.log('carga terminada')
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}
