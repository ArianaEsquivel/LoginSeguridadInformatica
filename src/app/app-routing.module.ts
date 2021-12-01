import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { SalirGuard } from './shared/guards/salir/salir.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [SalirGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [SalirGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
