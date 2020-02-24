import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// validaition helper
import { SpinxValidMatch } from 'src/app/_helpers/spinx-valid-match.validator';
import { SpinxValidNumeric } from 'src/app/_helpers/spinx-valid-numeric.validator';
import { SpinxValidAlphabet } from 'src/app/_helpers/spinx-valid-alphabet.validator';

// user service
import { UserService } from '../services/user.service';

// model
import { User } from '../model/user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})

export class AdduserComponent implements OnInit {

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

  // name = 'ng2-ckeditor';
  // ckeConfig: any;
  // mycontent: string;
  // log: string = '';
  
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
                private toastrService: ToastrService
              ) 
    {
    this.registerForm = fb.group({
      password: ["", Validators.required],
      cnfpassword: ["", Validators.required],
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
      dateofjoin:[],
      dateofjoin2:[null],
      ckeditor_info:[],
      email:([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    },{
        validator: [
                     SpinxValidMatch('password', 'cnfpassword'),
                     SpinxValidNumeric('mobile'),
                     SpinxValidAlphabet('company'),
                     //SpinxValidImage('imageInput',this.totalfiles),
                    ]
    });

   }

  ngOnInit() {
  }


  handleFileInput(e:any)
  {

     if(e.target.files)
     {
      const file: File = e.target.files[0];

      var allow_file_types = ['png','jpeg','pdf','jpg'];      
      var ext = file.name.substring(file.name.lastIndexOf('.') + 1);
      //console.log('chk file size : --> ',this.niceBytes(file.size)); 
      
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
     //console.log(index);
     //console.log(this.registerForm.value.country);
       
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

  get_checkbox_value(e:any)
  {
        if(e.target.checked)
        {
            this.eduFormArray.push(e.target.id);
        }
        else{
          let index = this.eduFormArray.indexOf(e.target.id);
          if (index !== -1) {
              this.eduFormArray.splice(index, 1);
          }
        }        
  }

  onCancel()
  {
    this.router.navigate(['/user/listuser']);
  }

  async onSubmit()
  {
      this.isSubmitted = true;

      //console.log('-----submit-------event-----');
      //console.log(this.registerForm.value.ckeditor_info);      
      
    if(this.registerForm.valid && this.eduFormArray.length>0 && this.team_dataFormArray.length>0 && this.totalfiles.length>0) 
    {
           
        // this.user_model.name = this.registerForm.value.name;
        // this.user_model.email = this.registerForm.value.email;
        // this.user_model.password = this.registerForm.value.password;
        // this.user_model.company_name = this.registerForm.value.company;
        // this.user_model.mobile = this.registerForm.value.mobile;
        // this.user_model.gender = this.registerForm.value.gender;
        // this.user_model.address = this.registerForm.value.address;
        // this.user_model.country = this.registerForm.value.country;
        // this.user_model.dateofjoin = this.registerForm.value.dateofjoin;

        //  this.user_model.edu_list = this.eduFormArray;        
        // this.user_model.team = this.team_dataFormArray;
        // this.user_model.user_profile = JSON.stringify(this.totalfiles[0]);

        let main_form: FormData = new FormData();
        main_form.append('name',this.registerForm.value.name);
        main_form.append('email',this.registerForm.value.email);
        main_form.append('password',this.registerForm.value.password);
        main_form.append('company_name',this.registerForm.value.company);
        main_form.append('mobile',this.registerForm.value.mobile);
        main_form.append('gender',this.registerForm.value.gender);
        main_form.append('address',this.registerForm.value.address);
        main_form.append('country',this.registerForm.value.country);
        main_form.append('dateofjoin',this.registerForm.value.dateofjoin);
        main_form.append('edu_list',JSON.stringify(this.eduFormArray));
        main_form.append('user_profile',this.totalfiles[0]);
        main_form.append('team',JSON.stringify(this.team_dataFormArray));
        main_form.append('ckeditor_info',this.registerForm.value.ckeditor_info);
        
        await this._uservice.user_post_image('add',main_form)
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

// onPaste_ckeditor(event)
// {
//   console.log('-------check----this-------onpaste---event-----');
//   console.log(event);

// }

// onChange_ckeditor(event)
// {
//   console.log('-------check----this-------onChange---event-----');
//   console.log(event);
// }



}
