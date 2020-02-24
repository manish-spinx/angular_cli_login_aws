import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router,ActivatedRoute  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// user service
import { UserService } from '../services/user.service';
// model
import { User } from '../model/user';
// validaition helper
import { SpinxValidMatch } from 'src/app/_helpers/spinx-valid-match.validator';
import { SpinxValidNumeric } from 'src/app/_helpers/spinx-valid-numeric.validator';
import { SpinxValidAlphabet } from 'src/app/_helpers/spinx-valid-alphabet.validator';
import * as moment from 'moment';



@Component({
    selector: 'app-edituser',
    templateUrl: 'edituser.component.html'
})

export class EdituserComponent implements OnInit {

    //Below All variable add user form related  
    user_model = new User();
    registerForm: FormGroup;
    isSubmitted: boolean = false;
    submit_validaiton_flag: boolean = false;
    team:any;
    eduFormArray:string[]=[]; 
    team_dataFormArray:string[]=[]; 
    drop_down_list:any;
    custom_image_valdaiton:string="";
    image_valdaiton:boolean = false;
    public totalfiles: Array<File> =[];
    public totalfiles_name:any;
    public edit_from_profile_link:any;
    existing_image:any;


  public genders = [
      { id:'1',value: 'F', display: 'Female'},
      { id:'2',value: 'M', display: 'Male' }
    ];
    
public country_list = [
  { id:'1',name: 'India'},
  { id:'2',name: 'Us' },
  { id:'3',name: 'Russian' },
];

public team_list = [
  { id:'1',name: 'India'},
  { id:'2',name: 'Us'},
  { id:'3',name: 'Russian' },
];
    
public education_list = [
  { id:'1',name: 'B.E.IT'},
  { id:'2',name: 'MCA' },
  { id:'3',name: 'BCA' },
  { id:'4',name: 'Diploma'},
];

public units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

niceBytes(x){
  if(x === 1) return '1 byte';  
  let l = 0, n = parseInt(x, 10) || 0;  
  while(n >= 1024 && ++l){
      n = n/1024;
  }
    // + ' ' + this.units[l]
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + this.units[l]);
}

    
    constructor(
      private fb: FormBuilder,
      private _uservice:UserService,
      private router: Router,
      private route: ActivatedRoute,
      private toastrService: ToastrService
      ) {

        this.registerForm = fb.group({
            mobile:["", Validators.required],
            company:["", Validators.required],      
            name:["", Validators.required],
            gender:["", Validators.required],
            address:[null],
            country:["", Validators.required],
            //team:[[],Validators.required],
            edu_data:[],
            team_data:[],
            user_profile_data:[],
            dateofjoin:'',
            ckeditor_info:'',
            email:([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
          },{
              validator: [
                           SpinxValidNumeric('mobile'),
                           SpinxValidAlphabet('company'),
                           //SpinxValidImage('imageInput',this.totalfiles),
                          ]
          });
     }

async ngOnInit() { 
        await this._uservice.user_post('edit_user_angular',{user_id:this.route.snapshot.params.id})
        .subscribe(
          response => {

                console.log('---------- > user response ---- >');
                console.log(response);
                
                // profile_image: "1579152749098_SYZe9l0h06K1eCKQBYwwUxz4p.jpg"
                // profile_image_link: "http://localhost:3005/uploads/user/1579152749098_SYZe9l0h06K1eCKQBYwwUxz4p.jpg"
                // dateofjoin: "2020/01/23 00:00:00"
                

                if(response['status']==="1")
                {
                    this.registerForm.patchValue({
                        email: response['data']['email'],
                        name: response['data']['name'],
                        mobile: response['data']['mobile'],
                        dateofjoin: new Date(response['data']['dateofjoin']),
                        address: response['data']['address'],
                        company: response['data']['company_name'],
                        gender: response['data']['gender'],
                        country: response['data']['country'],
                        team_data:response['data']['team'],
                        edu_data:response['data']['edu_list'],
                        ckeditor_info:response['data']['ckeditor_info'],
                      });   
                      
                    this.edit_from_profile_link = response['data']['profile_image_link'];
                    this.existing_image = response['data']['profile_image'];

                     // Education List
                     this.eduFormArray = response['data']['edu_list'];
                     this.education_list = this.education_list.map(function(val){ 
                      if(response['data']['edu_list'].indexOf(val.id) !== -1)
                      {
                        return {id:val.id,name:val.name,status:true};
                      }
                      else{
                        return {id:val.id,name:val.name,status:false};
                      }   
                    }) 

                    // Team List
                    this.team_dataFormArray = response['data']['team'];
                    this.team_list = this.team_list.map(function(val){ 
                      if(response['data']['team'].indexOf(val.id) !== -1)
                      {
                        return {id:val.id,name:val.name,status:true};
                      }
                      else{
                        return {id:val.id,name:val.name,status:false};
                      }   
                    }) 


                }
                else{
                    alert(response['message'].message);
                }  

                
                
          }, err => {
              
          });

}

get_checkbox_value(e:any)
{
      if(e.target.checked)
      {
          this.eduFormArray.push(e.target.id);
      }
      else
      {
        let index = this.eduFormArray.indexOf(e.target.id);
        if (index !== -1) 
        {
            this.eduFormArray.splice(index, 1);
        }
      }
}

handleFileInput(e:any)
{
    if(e.target.files)
    {
      const file: File = e.target.files[0];
      var allow_file_types = ['png','jpeg','pdf','jpg'];      
      var ext = file.name.substring(file.name.lastIndexOf('.') + 1);    
      
        if(!allow_file_types.includes(ext))
        {
            this.image_valdaiton = true;           
        }
        else{

            this.totalfiles = e.target.files;
            this.image_valdaiton = false;           
        }
    }
}

onChange_country_selection(index:any)
{
    console.log('--------simple----single-----dropdown--------');
}

onChange_team_selection(e:any)
{
  var options = e.target.options;
  this.team_dataFormArray = [];
  for (var i = 0, l = options.length; i < l; i++) 
  {
    if (options[i].selected) {
      this.team_dataFormArray.push(options[i].value);
    }
  }

}

addEvent(type,event)
{  
    if(type==='change') 
    {
        this.registerForm.value.dateofjoin = event.target.value;
    }   
    
}


onCancel()
{
  this.router.navigate(['/user/listuser']);
}

async onSubmit()
{
    console.log('-------chk---------onSubmit-----');
    console.log(this.registerForm.value);

    this.isSubmitted = true;
    if(this.registerForm.valid && this.eduFormArray.length>0 && this.team_dataFormArray.length>0) 
    {

      let main_form: FormData = new FormData();
        main_form.append('name',this.registerForm.value.name);
        main_form.append('email',this.registerForm.value.email);
        main_form.append('company_name',this.registerForm.value.company);
        main_form.append('mobile',this.registerForm.value.mobile);
        main_form.append('gender',this.registerForm.value.gender);
        main_form.append('address',this.registerForm.value.address);
        main_form.append('country',this.registerForm.value.country);
        main_form.append('dateofjoin',this.registerForm.value.dateofjoin);
        main_form.append('edu_list',JSON.stringify(this.eduFormArray));        
        main_form.append('team',JSON.stringify(this.team_dataFormArray));
        main_form.append('ckeditor_info',this.registerForm.value.ckeditor_info);
        main_form.append('user_profile',this.totalfiles[0]);
        main_form.append('user_id',this.route.snapshot.params.id);
        main_form.append('existing_image',this.existing_image);


        await this._uservice.user_post_image('update',main_form)
        .subscribe(
          response => {
                 if(response['status']===1)
                  {
                       //alert(response['message']);
                       this.toastrService.success(response['message'],'User Management');
                       this.router.navigate(['/user/listuser']);
                  }      
          }, err => {
              
          });

    }
    else{
        console.log('form validaiton no......');
        this.isSubmitted = false;
        this.submit_validaiton_flag=true;
        return;
    }

}



}