import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { saveAs } from 'file-saver';

const AUTH_API = 'http://localhost:8080/api/test/';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  options = {};

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

  getCsv(): any  {
    this.http.get(AUTH_API + 'downloadCsv', {responseType: 'blob'})
    .subscribe(
      (response: any) => { 
        let blob:any = new Blob([response], { type: '.csv' });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, 'orchestra.csv');
      }
    );
  }

}
