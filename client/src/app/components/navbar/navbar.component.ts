import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public share:AuthserviceService, private r:Router ) {



  }

    logout(){
     localStorage.removeItem('token')
     this.r.navigate(['/login'])

    }

}
