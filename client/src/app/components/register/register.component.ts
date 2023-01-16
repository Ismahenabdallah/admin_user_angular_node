import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  dataReceived:any
  constructor(public share:AuthserviceService,
    private toastr: ToastrService ,
    private arouter:ActivatedRoute,
    private r : Router) {
      if(this.share.LoggedIn()==true){
        console.log(this.share.role)
        if(this.share.getRole()==="Admin"){
               this.r.navigate(["/admin"])
        }else{
          this.r.navigate(["/user"])
        }
       }
    }



    register(f:any){
      let data=f.value


      this.share.register(data).subscribe({
        next:(res:any)=>{

          this.dataReceived=res
          console.log(res)


          this.r.navigate(['/login'])



          this.toastr.success(res.message,'',{
            timeOut: 3000,
          });
        },
        error: (err:HttpErrorResponse) => {
         console.log(err)
          this.toastr.error(err.error.msg,'',{
           timeOut: 3000,
         });
         //console.log(err.error)
         },

      })
    }

}
