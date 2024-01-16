import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainRoutingModule } from './main/main-routing.module';
import { HomeComponent } from './main/home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { MainService } from 'src/_core/services/main.service';



@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    MainModule,
    NavbarComponent,
    MainRoutingModule,
    HomeComponent,
  ],
  providers: [provideHttpClient(), MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
