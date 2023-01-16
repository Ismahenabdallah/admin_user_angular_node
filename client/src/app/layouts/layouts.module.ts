import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';






@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,

  ],

  imports: [
    CommonModule,
    RouterModule,

    // FormsModule,
    // ReactiveFormsModule

  ]
})
export class LayoutsModule { }
