import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  user: User = new User;
  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute){
      if(this.authService.userValue){
        this.router.navigate(['/Home']);
      }
    }

  ngOnInit() {
   this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
   });
  }

  get f(){ return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.error='';
    this.loading=true;
    this.authService.login(this.f['username'].value, this.f['password'].value)
      .subscribe(response=>{
        this.user = response;
        console.log(this.user);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Home';
          this.router.navigate([returnUrl]);
      })
      }
  }


