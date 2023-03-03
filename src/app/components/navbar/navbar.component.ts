import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../slidebar/slidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  private listTitles: any[] = [];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  isVisible = false;
  user?: any;

  constructor(private authService: AuthService, location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
        this.sidebarVisible = false;
        this.authService.user.subscribe(x => this.user =x);
  }

  ngOnInit(){
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
       var $layer: any = document.getElementsByClassName('close-layer')[0];
       if ($layer) {
         $layer.remove();
         this.mobile_menu_visible = 0;
       }
   });
  }
  logout(){
    this.authService.logout();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function(){
        toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
};
sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
};


sidebarToggle() {
  
};

getTitle(){
  var titlee = this.location.prepareExternalUrl(this.location.path());
  if(titlee.charAt(0) === '#'){
      titlee = titlee.slice( 1 );
  }

  for(var item = 0; item < this.listTitles.length; item++){
      if(this.listTitles[item].path === titlee){
          return this.listTitles[item].title;
      }
  }
  return 'Dashboard';
}


}
