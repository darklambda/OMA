import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserViews(): Observable<any> { //user
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminViews(): Observable<any> { //admin
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUserList(): Observable<any> { //admin
    return this.http.get(API_URL + 'userList', { responseType: 'json' });
  }

  getAdminUserInfo(id: string): Observable<any> { //admin
    return this.http.get(API_URL + 'adminUserInfo/' + id, { responseType: 'json' });
  }

  getUserInfo(id: string): Observable<any> { //admin
    return this.http.get(API_URL + 'profile/' + id, { responseType: 'json' });
  }

  getPieceList(): Observable<any> { //admin
    return this.http.get(API_URL + 'pieceList', { responseType: 'json' });
  }
}