import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  dataUser={
    _id:"",
    email:"",
    status:"",
    isAdmin:"",
    worksAt:"",
    livesIn:"",
    relationship:"",
  }
  constructor(private share:AuthserviceService) {

      this.dataUser.email=this.share.getProfile().email
     // console.log(this.dataUser.email)

    }
}
