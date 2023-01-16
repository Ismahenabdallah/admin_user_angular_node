import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
    url:any
    ngOnInit(): void {
      // this.url=this.arouter.snapshot.queryParams['returnUrl'] || '/login'
      // console.log(this.url)


    }

    login(f:any){
      let data=f.value


      this.share.login(data).subscribe({
        next:(res:any)=>{

          this.dataReceived=res
          this.share.saveData(this.dataReceived.token)
          this.share.verifRole()
          this.share. getRole()
          //this.r.navigate([this.url])



          // this.toastr.success(res.message,'',{
          //   timeOut: 3000,
          // });
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
