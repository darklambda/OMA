import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditSuccessDialog } from '../_dialogs/edit-success-dialog';
import { clean, format } from 'rut.js'

interface Selector { 
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  form: any = {
    email: null,
    password: null,
    name: null,
    last_name: null,
    instrument: null,
    genre: null, // check
    bday_date: null, // check
    initial_year: null, // check
    academic_year: null, // check
    phone_number: null,
    type_id: "Rut",
    country_id: null,
    type_musician: null,
    type_member: null,
    city_of_residence: null,
    rol: null,
    active: "Activo",
    admin: true
  };

  initialYear: Array<number> = [];
  academicYear: Array<number> = [];
  actualYear = new Date().getFullYear();

  genres: Selector[] = [
    {value: 'Mujer', viewValue: 'Mujer'},
    {value: 'Hombre', viewValue: 'Hombre'},
    {value: 'Otro', viewValue: 'Otro'},
  ];

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

  id_type: Selector[] = [
    {value: 'Rut', viewValue: 'Rut'},
    {value: 'Pasaporte', viewValue: 'Pasaporte'},
  ];

  id_musician: Selector[] = [
    {value: 'Planta', viewValue: 'Planta'},
    {value: 'Taller', viewValue: 'Taller'},
  ];

  id_member: Selector[] = [
    {value: 'Estudiante USM', viewValue: 'Estudiante USM'},
    {value: 'Prof/Func USM', viewValue: 'Prof/Func USM'},
    {value: 'Ex-Estudiante USM', viewValue: 'Ex-Estudiante USM'},
    {value: 'Externo', viewValue: 'Externo'},
  ];

  state: Selector[] = [
    {value: 'Activo', viewValue: 'Activo'},
    {value: 'Suspendido', viewValue: 'Suspendido'},
    {value: 'Inactivo', viewValue: 'Inactivo'},
    {value: 'Baja Permanente', viewValue: 'Baja Permanente'}
  ];

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              public dialog: MatDialog) { }

  

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.academicYear.push(i);
    }

    for (let i = 2008; i < this.actualYear; i++) {
      this.initialYear.push(i);
    }
    this.initialYear.reverse();
    let id = this.route.snapshot.paramMap.get('idUser');
    if (id == null){
      this.router.navigate(['list']);
    }
    this.userService.getAdminUserInfo(id).subscribe(
      data => {
        if (data == null) {
          this.router.navigate(['list']); 
        } else {
          this.form.email = data.email;
          //this.form.password = data.email;
          this.form.name = data.name;
          this.form.last_name = data.last_name;
          this.form.instrument = data.instrument;
          this.form.genre = data.genre;
          this.form.bday_date = data.bday_date;
          this.form.initial_year = data.initial_year;
          this.form.academic_year = data.academic_year;
          this.form.phone_number = data.phone_number;
          this.form.type_id = data.type_id;
          this.form.country_id = data.country_id;
          this.form.type_musician = data.type_musician;
          this.form.type_member = data.type_member;
          this.form.city_of_residence = data.city_of_residence;
          this.form.rol = data.rol;
          this.form.active = data.active;
          this.form.admin = data.admin;
        }
      },
      err => {
        this.router.navigate(['login']);
      }
    );
  }

  onSubmit(): void {
    const { email,
      password,
      name,
      last_name,
      instrument,
      genre,
      bday_date,
      initial_year,
      academic_year,
      phone_number,
      type_id,
      country_id,
      type_musician,
      type_member,
      city_of_residence,
      rol,
      active,
      admin } = this.form;
    let id = this.route.snapshot.paramMap.get('idUser');
    this.authService.update(email,
      password,
      name,
      last_name,
      instrument,
      genre,
      bday_date,
      initial_year,
      academic_year,
      phone_number,
      type_id,
      country_id,
      type_musician,
      type_member,
      city_of_residence,
      rol,
      active,
      admin,
      id).subscribe(
      data => {
        console.log(data);
        const dialogRef = this.dialog.open(EditSuccessDialog);
        setTimeout(() => {
          dialogRef.close();
          this.router.navigate(['list']);}, 2000);
      },
      err => {
        console.log(err)
      }
    );
  }

  keyPressNumbers(event: any) {
    if (this.form.type_id == "Pasaporte") {
      return true;
    } else {
      var charCode = (event.which) ? event.which : event.keyCode;
      if ((charCode < 48 || charCode > 57 || charCode == 75)) {
        event.preventDefault();
        return false;
      } else {
        return true;
      }
    }
  }

  idChange(): void {
    this.form.country_id = '';
  }

  formatId(): void {
    if (this.form.type_id === "Rut") {
      let idTmp = clean(this.form.country_id);
      if (idTmp == ''){
        this.form.country_id = '';
      } else {
        this.form.country_id = format(idTmp);
      }
    } 
  }
}

