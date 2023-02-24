import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: any = {
    username: null,
    pssword: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService){}

  ngOnInit(): void {
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

  onSubmit(): void{
    const {username, password} = this.form;
    this.authService.login(username, password).subscribe({
      next: data =>{
        this.tokenStorageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        this.reloadPage();
      },
      error: err =>{
        this.errorMessage = err.errorMessage;
        this.isLoginFailed = true;
      }
    });

  }

  reloadPage(): void{
    window.location.reload();
  }
  }

