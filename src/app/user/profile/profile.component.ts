import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { GlobalapiService } from 'src/app/services/globalapi.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  isSubmitted: boolean = false;
  old_email_id:string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private globalapiService: GlobalapiService,
    private toastrService: ToastrService
    ) {
      this.profileForm = fb.group({
        fullname: ["", Validators.required],
        email: ["", Validators.required],
      });
    }

    public loading = false;

  async ngOnInit(){

     //let api_url = 'http://localhost:3005/admin_api/edit_user_angular';
     let api_url = `${environment.api_name}`;
     await this.globalapiService.past_data_to_server(api_url+'edit_user_angular',{'user_id':localStorage.getItem("id")})
     .subscribe(
      response => {
          if(response['status']==1)
          {
            this.profileForm.patchValue({
              fullname: response['data']['name'],
              email: response['data']['email'],
            });

              this.old_email_id = response['data']['email'];
          }
      }, err => {
          
      });
    
  }

  user_profile()
  {
    this.router.navigate(['/user/profile']);
  }

  async profileFormSubmit()
  {

    this.isSubmitted = true;
    if(this.profileForm.valid) 
    {
      //let api_url = 'http://localhost:3005/admin_api/angular_profile_update';
      let api_url = `${environment.api_name}`;

       const reqParams = {      
        email: this.profileForm.value.email,
        name: this.profileForm.value.fullname,
        o_email:this.old_email_id,
        user_id:localStorage.getItem("id")
       };

       await this.globalapiService.past_data_to_server(api_url+'angular_profile_update',reqParams)
       .subscribe(
        response => {
            if(response['success']==1)
            {
              this.toastrService.success('User Profile Update Successfully','User Profile');
            }
        }, err => {
            
        });
      


    }

  }


}
