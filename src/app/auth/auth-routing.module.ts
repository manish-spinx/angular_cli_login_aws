import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent, children: [
      {
        path: 'login', component: LoginComponent
      },      
      {
        path: '', redirectTo: 'login',pathMatch: 'full'
      },      
    ]
  },
  { path: 'forgetpassword', component: ForgetpasswordComponent},
  { path: 'resetpassword', component: ResetpasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
