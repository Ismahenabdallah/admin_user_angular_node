import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private share:AuthserviceService ,private r:Router){
   //  hedi badelnaha b guard router canActivate
// this.share.LoggedIn()
// if(this.share.LoggedIn()==false){

//   this.r.navigate(['/login'])
//   console.log(this.share.LoggedIn())}
   }

}
