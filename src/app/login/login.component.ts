import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../shared/Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalUser } from '../shared/Models/local-user.model'
// import { TranslateService } from '@ngx-translate/core';
import { interval } from 'rxjs';
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
  customerInfoSerial:string = 'pergola';
  selectedType :string= '';
  hide = true;

  constructor(private userService: UserService, private router: Router  ,public location :Location) {

    const body = document.getElementsByTagName('body')[0];

    //body.classList.remove('fixed-navbar');

    body.classList.remove('2-columns');
    body.classList.add('1-column');
    body.classList.add('blank-page');
    body.classList.add('blank-page');

  }

  ngOnInit() {

    this.Logout();
  }



  // make Token request from WebAPI method
  // OnSubmit(customerInfoSerial: string) {

  //   this.userService.userAuthentication(customerInfoSerial,customerInfoSerial)
  //     .subscribe((data: any) => {
  //       this.access_token = data.access_token;


  //       localStorage.setItem('userToken', data.access_token);
  //       this.errorMessage = null;
  //     },
  //       (err: HttpErrorResponse) => {
  //         this.isLoginError = true;
  //         this.errorMessage = 'Error';
  //         console.log(this.errorMessage);
  //       });
  // }




  OnLogin(userName: string, password: string ) {
    // this.router.navigate(['/home']);
    //  this.access_token = 'amir';
      //  localStorage.setItem('userToken', 'amir');
      this.userService.userAuthentication(userName, password)
      .subscribe((data: any) => {
        console.log(data);
        this.access_token = data.response.token;
        localStorage.setItem('userToken',  this.access_token);
        localStorage.setItem('userName', userName);

        // localStorage.setItem('lUsr', this.localUser[0].UserId.toString());
        // localStorage.setItem('EmpID', this.localUser[0].EmpID.toString());
        localStorage.setItem('UserType', data.response.userRole);

        this.errorMessage = null;

        // this.userService.userAuthentication(userName, password )
        // .subscribe((data: any) => {
        //   this.localUser = data;

        //   console.log(data , 'daa')

        //   if(this.localUser != null && this.localUser.length > 0){
        //     // localStorage.setItem('lUsr', this.localUser[0].UserId.toString());
        //     // localStorage.setItem('EmpID', this.localUser[0].EmpID.toString());
        //     // localStorage.setItem('entrpriseId', this.localUser[0].EnterpriseId.toString());
        //     // localStorage.setItem('UserType', this.localUser[0].UserType);
        //     localStorage.setItem('userName', userName);
            this.errorMessage = null;
            this.router.navigate(['/home']);


          // }
          // else {

          },
        // },
          (err: HttpErrorResponse) => {
            this.isLoginError = true;
            this.errorMessage = "خطأ فى اسم المستخدم أو كلمة المرور";
            this.isLoginError = true;
            localStorage.removeItem('userToken');
          });
      // },
      //   (err: HttpErrorResponse) => {
      //     this.isLoginError = true;
      //     this.errorMessage = 'Error';
      //     console.log(this.errorMessage);
      //   });



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
