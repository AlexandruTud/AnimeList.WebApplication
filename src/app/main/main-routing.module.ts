import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { YourlistComponent } from './yourlist/yourlist.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'yourlist', component: YourlistComponent
  },
  {
    path: 'profile', component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
