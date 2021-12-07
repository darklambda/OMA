import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const API_URL = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: email,
      password: password
    }, httpOptions);
  }

  register(
    email: string,
    password: string,
    name: string,
    last_name: string,
    instrument: string,
    genre: number,
    bday_date: string,
    initial_year: number,
    academic_year: number,
    phone_number: string,
    type_id: string,
    country_id: string,
    type_musician: string,
    type_member: string,
    city_of_residence: string,
    rol: string,
    active: boolean,
    admin: boolean
  ): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: email,
      password: password,
      name: name,
      last_name: last_name,
      instrument: instrument,
      genre: genre,
      bday_date: bday_date,
      initial_year: initial_year,
      academic_year: academic_year,
      phone_number: phone_number,
      type_id: type_id,
      country_id: country_id,
      type_musician: type_musician,
      type_member: type_member,
      city_of_residence: city_of_residence,
      rol: rol,
      active: active,
      admin: admin
    }, httpOptions);
  }

  update(
    email: string,
    password: string,
    name: string,
    last_name: string,
    instrument: string,
    genre: number,
    bday_date: string,
    initial_year: number,
    academic_year: number,
    phone_number: string,
    type_id: string,
    country_id: string,
    type_musician: string,
    type_member: string,
    city_of_residence: string,
    rol: string,
    active: boolean,
    admin: boolean,
    id: string
  ): Observable<any> {
    return this.http.post(API_URL + 'edit/' + id, {
      email: email,
      password: password,
      name: name,
      last_name: last_name,
      instrument: instrument,
      genre: genre,
      bday_date: bday_date,
      initial_year: initial_year,
      academic_year: academic_year,
      phone_number: phone_number,
      type_id: type_id,
      country_id: country_id,
      type_musician: type_musician,
      type_member: type_member,
      city_of_residence: city_of_residence,
      rol: rol,
      active: active,
      admin: admin
    }, httpOptions);
  }
}