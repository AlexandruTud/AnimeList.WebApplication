import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full', data: { hideNavbar: true } },
  {
    path: 'register',
    component: RegisterComponent,
    data: { hideNavbar: true }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { hideNavbar: true }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
