import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { AuthGuard } from './services/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path:'Home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'slidebar', component: SlidebarComponent},
  {path:'profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
