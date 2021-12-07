import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Users } from '../_models/user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userInfo: Users = new Users();

  constructor(private token: TokenStorageService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getUserInfo(this.currentUser.id).subscribe(
      data => {
        if (data == null) {
          this.router.navigate(['home']); 
        } else {
          //console.log(data)
          this.userInfo = data;
        }
      },
      err => {
        console.log(err);
        this.router.navigate(['login']);
      }
    );
  }
}