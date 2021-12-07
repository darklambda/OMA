import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin = false;

  constructor(private userService: UserService,
              private router: Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getUserViews().subscribe(
      data => {
        const user = this.tokenStorageService.getUser();
        this.isAdmin = user.admin;

      },
      err => {
        this.router.navigate(['login']);
        //this.content = JSON.parse(err.error).message;
      }
    );
  }
}