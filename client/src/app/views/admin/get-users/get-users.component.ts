import { Component, OnDestroy } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Subscription } from 'rxjs';
import {FormBuilder , NgForm, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnDestroy {


  getall:Subscription
  users:any=[]
  f: any;

  dataUser={
    _id:"",
    email:"",
    status:"",
    isAdmin:"",
    worksAt:"",
    livesIn:"",
    relationship:"",
  }
 constructor(private toastr: ToastrService,private share:ServicesService  ,private route :Router, private builderForm:FormBuilder){

  this.getall=this.share.getAllusers().subscribe(data=>{
    //console.log("users",data)
    this.users=data

   })
   this.f=this.builderForm.group({

    email:['', [Validators.email, Validators.required]],
    password:['', Validators.required],
    confirm:['', Validators.required],
    livesIn:['', Validators.required],
    worksAt:['', Validators.required],
    relationship:['', Validators.required],
  })

 }
 messageError=''


Del(id:any , i :number){
  this.share.deleteUser(id).subscribe({
    next: (res:any) => {this.route.navigate(['/admin/all'])
    this.users.splice(i,1)
     this.toastr.success(res.message,'',{
      timeOut: 3000,
      });  }, // nextHandler


});

}


getbyid(id:any){
  this.share.getById(id).subscribe((res:any)=>
  {
this.dataUser._id=res.user._id
this.dataUser.email=res.user.email
this.dataUser.status=res.user.status
this.dataUser.isAdmin=res.user.isAdmin
this.dataUser.worksAt=res.user.worksAt
this.dataUser.livesIn=res.user.livesIn
this.dataUser.relationship=res.user.relationship


})

}
Add(f:any){
  let data=f.value
  // console.log(data)
  this.share.addUsers(data).subscribe({
    next: (res:any) => {this.route.navigate(['/admin/all'])
  console.log("res",res.newUser
  )
   // let indexId=this.users.findIndex((obj:any)=>obj._id==this.dataUser._id)

    this.users.push(res.newUser)
    // this.dataUser._id=res.user._id
    // this.dataUser.email=res.user.email
    // this.dataUser.status=res.user.status
    // this.dataUser.isAdmin=res.user.isAdmin
    // this.dataUser.worksAt=res.user.worksAt
    // this.dataUser.livesIn=res.user.livesIn
    // this.dataUser.relationship=res.user.relationship

      this.toastr.success(res.message,'',{
      timeOut: 3000,
      });
              }, // nextHandler
    error: (err:HttpErrorResponse) => {
       this.messageError=err.error.msg
       this.toastr.error(err.error.msg,'',{
        timeOut: 3000,
      });
       //console.log(err.error)
      }, // errorHandler


});

}
update(form:any){
  let data=form.value
  this.share.updateUser(this.dataUser._id,data).subscribe((res:any)=>{

   let indexId=this.users.findIndex((obj:any)=>obj._id==this.dataUser._id)

   this.users[indexId].email=data.email
   this.users[indexId].isAdmin=data.isAdmin
   this.users[indexId].worksAt=data.worksAt
   this.users[indexId].status=data.status
   this.users[indexId].livesIn=data.livesIn
   this.users[indexId].relationship=data.relationship
   this.toastr.success(res.message,'',{
    timeOut: 3000,
    });


  })
 }
 details(id:any){
  this.route.navigate([`/admin/details/${id}`])
}

  ngOnDestroy(): void {
    this.getall.unsubscribe()
  }
}
