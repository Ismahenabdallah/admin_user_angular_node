import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import{AuthserviceService} from './services/authservice.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-project';
  constructor(private toastr: ToastrService , public share:AuthserviceService ) {


  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }

}
