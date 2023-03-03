import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 user?: any;

  constructor( private authService: AuthService, private router: Router ){
    this.authService.user.subscribe(x => this.user =x);
  }


  ngOnint(): void{
  
  }

  logout(){
    this.authService.logout();
  }
}
