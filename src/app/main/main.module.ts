import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { YourlistComponent } from './yourlist/yourlist.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HomeComponent,
    YourlistComponent,
    ProfileComponent
  ]
})
export class MainModule { }
