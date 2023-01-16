import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from "./components/navbar/navbar.component";



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        NotFoundComponent,
        NavbarComponent
    ],
    providers: [],

    bootstrap: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        LayoutsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,


    ]
})
export class AppModule { }
