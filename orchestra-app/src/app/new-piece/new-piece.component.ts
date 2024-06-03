import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Selector { 
  value: string;
  viewValue: string;
}

const AUTH_API = environment.AUTH_API;

@Component({
  selector: 'app-new-piece',
  templateUrl: './new-piece.component.html',
  styleUrls: ['./new-piece.component.css']
})
export class NewPieceComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private http: HttpClient) { }

instruments: Selector[] = [
  {value: 'Violín I', viewValue: 'Violín I'},
  {value: 'Violín II', viewValue: 'Violín II'},
  {value: 'Viola', viewValue: 'Viola'},
  {value: 'Cello', viewValue: 'Cello'},
  {value: 'Contrabajo', viewValue: 'Contrabajo'},
  {value: 'Flauta', viewValue: 'Flauta'},
  {value: 'Clarinete', viewValue: 'Clarinete'},
  {value: 'Oboe', viewValue: 'Oboe'},
  {value: 'Fagot', viewValue: 'Fagot'},
  {value: 'Corno Frances', viewValue: 'Corno Frances'},
  {value: 'Trompeta', viewValue: 'Trompeta'},
  {value: 'Trombón', viewValue: 'Trombón'},
  {value: 'Tuba', viewValue: 'Tuba'},
  {value: 'Percusion', viewValue: 'Percusion'},
  {value: 'Piano', viewValue: 'Piano'},
  {value: 'Dirección', viewValue: 'Dirección'},
];

formData = new FormData();
files: Array<File> = [];
inst: Array<string> = [];
requiredFileType = ".pdf";

uploading = false;
uploadProgress: number;
uploadSub: Subscription;
failedUpload = false;
failWarning = false;
done = false;

form: any = {
    name: null,
    composer: null,
    year: null,
    code: null
  };

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

  onSubmit(): void {
    const { name,
      composer,
      year,
      code } = this.form;
    this.formData.append("name", name);
    this.formData.append("composer", composer);
    this.formData.append("year", year);
    this.formData.append("code", code);
    if (this.files.length > 0) {
      this.formData.append("fileInstruments", this.inst.toString());
      for (let ind in this.files) {
        this.formData.append(ind, this.files[ind]);
      }
    }

    this.uploading = true;
    console.log("sending")
    const upload$ = this.http.post(AUTH_API + "newPiece", this.formData, {
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
        if (event.body.hasOwnProperty('success')){ 
          this.done = true;
        } else {
          this.failWarning = true;
        }
      } else {
        this.failedUpload = true;
      }
      
    }
  }); 
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

  onFileSelected(event: any): void {
    const file:FileList = event.target.files;
    for (let i = 0; i < file.length; i++) {
      this.files.push(file[i])
      this.inst.push('');
    }
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.inst.splice(index, 1);
  }

}
