import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { clean, format } from 'rut.js'

interface Selector { 
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  
  form: any = {
    email: null,
    password: null,
    name: null,
    last_name: null,
    instrument: null,
    genre: "Otro", // check
    bday_date: null, // check
    initial_year: null, // check
    academic_year: null, // check
    phone_number: null,
    type_id: "Rut",
    country_id: '',
    type_musician: null,
    type_member: null,
    city_of_residence: null,
    rol: null,
    active: "Activo",
    admin: true
  };

  isSignUpFailed = false;
  errorMessage = '';
  

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.academicYear.push(i);
    }

    for (let i = 2008; i < this.actualYear; i++) {
      this.initialYear.push(i);
    }
    this.initialYear.reverse();

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
    this.authService.register(email,
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
      admin).subscribe(
      data => {
        this.isSignUpFailed = false;
        this.router.navigate(['list']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
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