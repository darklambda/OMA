import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrls: ['./piece-list.component.css']
})

export class PieceListComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              public datepipe: DatePipe,) { }

  pieces: Array<any>;

  ngOnInit(): void {
    this.fetchData();
  }


  fetchData():void  {
    this.userService.getPieceList().subscribe(
      data => {
        this.pieces = data;
        console.log(data);
      },
      err => {
        this.router.navigate(['login']);
      }
    );
  }

  dateFormat(date: string): string{
    let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');
    return latest_date;
   }

}
