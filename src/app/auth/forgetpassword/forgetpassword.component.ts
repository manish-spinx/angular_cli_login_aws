import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  
  forgetForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back_url()
  {
    this.router.navigate(['/login']);
  }

}
