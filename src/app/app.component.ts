import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularfirstapp';
  //loggedIn :boolean = false;

  constructor( private router: Router) { 
    // if(localStorage.getItem('access_token')!=null)
    // {
    //   this.loggedIn = true;
    // }
    // else{
    //   this.loggedIn = false;
    // }
  }


  onLogout()
  {
      // localStorage.removeItem('id');
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('userData');
      // //this.router.navigate(['/']);
      // window.location.href = '/login';
      // return true;
  }


}
