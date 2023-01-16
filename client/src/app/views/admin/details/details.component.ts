import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  dataUser:any
  id:any
  errormsg=""
 constructor(private toastr: ToastrService,private share:ServicesService , private route:ActivatedRoute){
  this.route.params.subscribe(params=>this.id=params['id'])


 this.share.getById(this.id).subscribe({
  next:(res:any)=>{
    this.dataUser=res.user

  //console.log(res.user)
},
  error: (err:HttpErrorResponse) => {
    //console.log("err",err.error.message)
    this.errormsg="We dont't found this User in our database"
    this.toastr.error(err.error.message,'',{
     timeOut: 3000,
   });

   },
 })
 }
}
