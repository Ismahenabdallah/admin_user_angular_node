import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetUsersRoutingModule } from './get-users-routing.module';
import { GetUsersComponent } from './get-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GetUsersComponent],
  imports: [
    CommonModule,
    GetUsersRoutingModule,
    FormsModule ,
    ReactiveFormsModule,

  ]
})
export class GetUsersModule { }
