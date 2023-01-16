import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { GuardAdminGuard } from './guards/guard-admin.guard';
import { GuardAuthGuard } from './guards/guard-auth.guard';
import { GuardUserGuard } from './guards/guard-user.guard';
import { AdminComponent } from './layouts/admin/admin.component';
import { UserComponent } from './layouts/user/user.component';

const routes: Routes = [
 // {path:"" , component:AppComponent},
  {path:"admin" , component:AdminComponent,canActivate:[GuardAuthGuard, GuardAdminGuard] , children:[
    {path:"" , loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)}
 ,
    {path:"dash" , loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)}
 ,
 {path:"all" , loadChildren:()=>import('./views/admin/get-users/get-users.module').then(m=>m.GetUsersModule)}
,
{path:"details/:id" , loadChildren:()=>import('./views/admin/details/details.module').then(m=>m.DetailsModule)}


  ]},
  {path:"user" , component: UserComponent,canActivate:[GuardAuthGuard , GuardUserGuard] , children : [
    {path:"profil" , loadChildren:()=>import('./views/user/profil/profil.module').then(m=>m.ProfilModule)} ,

  ] },


  {path:"login" , component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"**" , component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
