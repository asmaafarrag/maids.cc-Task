import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../shared/Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalUser } from '../shared/Models/local-user.model'
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginError = false;
  localUser: LocalUser[];
  access_token: string;
  errorMessage:string;

  constructor(private userService: UserService, private router: Router , public location :Location) { 
    const body = document.getElementsByTagName('body')[0];
        
    //body.classList.remove('fixed-navbar');

    body.classList.remove('2-columns');
    body.classList.add('1-column');
    body.classList.add('blank-page');
    body.classList.add('blank-page');
    
  }

  ngOnInit() {
    const firstTime = localStorage.getItem('key')
    if(!firstTime){
     localStorage.setItem('key','loaded')
     location.reload()
    }else {
      localStorage.removeItem('key') 
    }
    this.Logout(); 
  }

  // make Token request from WebAPI method
  OnSubmit(customerInfoSerial: string) {
    

    this.userService.userAuthentication(customerInfoSerial)
      .subscribe((data: any) => {
        this.access_token = data.access_token;
        localStorage.setItem('userToken', data.access_token);
        this.errorMessage = null;
      },
        (err: HttpErrorResponse) => {
          this.isLoginError = true;
          this.errorMessage = 'Error';
          console.log(this.errorMessage);
        });
  }

  OnLogin(userName: string, password: string) {
    this.userService.getGetLocalUser(userName, password)
      .subscribe((data: any) => {
        this.localUser = data;
        
        if(this.localUser != null && this.localUser.length > 0){  
          console.log(this.localUser[0].EmpID.toString());
          localStorage.setItem('lUsr', this.localUser[0].UserId.toString());  
          localStorage.setItem('EmpID', this.localUser[0].EmpID.toString()); 
          localStorage.setItem('UserType', this.localUser[0].UserType);
          localStorage.setItem('userName', userName);  
          this.errorMessage = null;      
          this.router.navigate(['/home']);
          // location.reload()
        }
        else {
          this.errorMessage = "خطأ فى اسم المستخدم أو كلمة المرور";
          this.isLoginError = true;
        }
      },
        (err: HttpErrorResponse) => {
          this.isLoginError = true;
        });
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('lUsr');
    localStorage.removeItem('EmpID');
    localStorage.removeItem('UserType');
    this.access_token = null;
    this.errorMessage = null; 
  }

}
