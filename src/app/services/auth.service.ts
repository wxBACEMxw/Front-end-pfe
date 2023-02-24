import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const auth_api = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headres: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any>{
    return this.http.post(auth_api+'signin', {
      username,
      password
    });
  }
}
