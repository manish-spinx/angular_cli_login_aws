import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService
    ) { }
  public loading = false;

  ngOnInit(): void { 
    if (localStorage.getItem('userData')) {
        this.router.navigate(['dashboard']);
    } else {
        this.router.navigate(['login']);
    }

    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required]),
    });
  }

  forget_password()
  {
    this.router.navigate(['/forgetpassword']);
  }

async loginFormSubmit() {
  this.isSubmitted = true;
    if (this.loginForm.valid) 
    {      
      this.loading = true;
      var postData = this.loginForm.value;

      var data = {
          email: postData.email,
          password: postData.password
      }

     await this.authenticationService.login(data)
      .subscribe(
      async next => {
            if(next['status']==1)
            {
               //this.router.navigate(['/dashboard']);
               await this.toastrService.success('Login Successfully !','Login');
               window.location.href = '/dashboard';
               return true;
            }
            else{
               //lert('something validaiton issue !'); 
               
            }        
      },
      error => {
        this.loading = false;
        this.isSubmitted = false;
      })

    } 
}
  

}
