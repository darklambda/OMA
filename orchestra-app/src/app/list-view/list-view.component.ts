import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { DatePipe } from '@angular/common'
import { TokenStorageService } from '../_services/token-storage.service';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.AUTH_API;

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  constructor(private userService: UserService,
              private http: HttpClient,
              private router: Router,
              public datepipe: DatePipe,
              private tokenStorageService: TokenStorageService) { }
  
  currentEmail = '';

  columnsToDisplay = ['name', 'last_name', 'instrument', 'genre', 'bday_date', 'initial_year', 'academic_year', 
   'email', 'phone_number', 'country_id',  'type_member', 'city_of_residence', 'rol', 'active', 'edit'];
  dataSource: MatTableDataSource<UsersList> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterValues: any = {
    activeValue: false
  }

  isTemp: boolean = false;

  ngOnInit(): void {
    this.fetchData();
    const user = this.tokenStorageService.getUser();
    this.currentEmail = user.email;
    if (user.email === "temp@mail.com") {
      this.isTemp = true;
    }
  }

  private createFilter(): (users: UsersList, filter: string) => boolean {
    let filterFunction = function (users: UsersList, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let inactiveUsers = true;
      return  searchTerms.activeValue ||  (users.active == "Activo");
    }
    return filterFunction;
  }

  applyFilter(){
    this.filterValues.activeValue = !this.filterValues.activeValue
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  clearFilter() {
    this.filterValues.activeValue = true;
    this.applyFilter();
  }

  dateFormat(date: string): string{
    let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');
    return latest_date;
   }

  editUser(idUser: string): void {
    this.router.navigate(['edit', idUser], );
  }

  deleteUser(id: string): void {
    this.http.get(AUTH_API + "delete/" + id)
    .subscribe( 
    (resp) => {console.log("done")} ,
    (err) => {console.log(err)},
    () => this.fetchData() );
  }

  fetchData():void  {
    this.userService.getUserList().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<UsersList>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createFilter();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      },
      err => {
        this.router.navigate(['login']);
      }
    );
  }

}


export interface UsersList {
  academic_year: number;
  active: string;
  //admin: boolean;
  bday_date: Date;
  city_of_residence: string;
  country_id: string;
  createdAt: Date;
  email: string;
  genre: string;
  id: number;
  initial_year: number;
  instrument: string;
  last_name: string;
  name: string;
  //password: string;
  phone_number: string;
  rol: string;
  type_id: string;
  type_member: string;
  type_musician: string;
  updatedAt: Date;
}
