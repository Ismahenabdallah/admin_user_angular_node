import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  url = environment.urlBackend;
  role = '';
  helper = new JwtHelperService();
  profil = {
    _id: '',
    email: '',
    status: '',
    isAdmin: '',
    worksAt: '',
    livesIn: '',
    relationship: '',
    role:""
  };
  constructor(
    private http: HttpClient,
    private r: Router,
    private toastr: ToastrService,
    private arouter:ActivatedRoute,
  ) {}

  login(data: any) {
    return this.http.post(`${this.url}/login`, data);
  }
  saveData(token: any) {
    //  let decodeToken= this.helper.decodeToken(token)

    localStorage.setItem('token', token);
  }

  getProfile() {
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);
    this.profil._id = decodeToken._id;
    this.profil.email = decodeToken.email;
    this.profil.isAdmin = decodeToken.isAdmin;
    this.profil.livesIn = decodeToken.livesIn;
    this.profil.relationship = decodeToken.relationship;
    this.profil.status = decodeToken.status;
    this.profil.worksAt = decodeToken.worksAt;
    this.profil.role=decodeToken.role

    return this.profil;
  }
  getRole(){
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);
    this.role=decodeToken.role
    return this.role


  }

  verifRole(){
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);



    if (decodeToken.status === 'Desactive') {
      this.r.navigate(['/login']);
    }
    if (decodeToken.role === 'Admin') {
      console.log()
      if(this.arouter.snapshot.queryParams['returnUrl']){
        return  this.r.navigate([this.arouter.snapshot.queryParams['returnUrl']])

      }else{
             return this.r.navigate(['/admin'])
      }





    }
    if (decodeToken.role === 'User') {
      if(this.arouter.snapshot.queryParams['returnUrl']){
        return  this.r.navigate([this.arouter.snapshot.queryParams['returnUrl']])

      }else{
             return this.r.navigate(['/user'])
      }

    }
    return true
  }


  LoggedIn(){
    let token:any=localStorage.getItem('token')



    if(!token){
     return false
    }
    let expire=this.helper.isTokenExpired(token)

    if(expire){
      return false
    }

    return true
 }

  guardAUthAdmin(){
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);

    if(decodeToken.role !=="Admin"){
      return false

    }
    return true

  }
  guardAUthUser(){
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);
    if(decodeToken.role !=="User"){
      return false

    }
    return true

  }
  register(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }
}
export interface p {
  _id: '';
  email: '';
  status: '';
  isAdmin: '';
  worksAt: '';
  livesIn: '';
  relationship: '';
}
