import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from '../models/user';

const auth_api = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;


  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(){
    return this.userSubject.value;
  }

  login(username: string, password: string){
    return this.http.post<User>(auth_api+'signin', {
      username,
      password}
      ).pipe(map(user=>{
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
    }
  

  logout (){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
