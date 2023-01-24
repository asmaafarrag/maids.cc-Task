 import { Component, OnInit } from '@angular/core';
// import { ETAService } from 'src/app/shared/Services/eta.service';
// import { Router, NavigationEnd } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popuplogin',
  templateUrl: './popuplogin.component.html',
  styleUrls: ['./popuplogin.component.css']
})
export class PopuploginComponent implements OnInit {

//   access_token: string;
//   errorMessage: string;


//   constructor( private ETAServ: ETAService , private router: Router , public dialogRef: MatDialogRef<PopuploginComponent>) { }

  ngOnInit(): void {
  }
  
  
//   OnLogin(clientId: string, clientSecret: string ) {
//     let EInvMode =  sessionStorage.getItem('selectedType')
//      // EInvMode = 'PROD';
//     console.log(EInvMode , "EInvMode")
//  let generatedAccessToken = this.access_token;
//    this.ETAServ.Login(clientId, clientSecret ,EInvMode , generatedAccessToken )
//      .subscribe((data: any) => {
//        console.log(data);
//        console.log(EInvMode , "EInvMode22222222222")
//        localStorage.setItem(data , "datatoken")
//        //this.access_token = data.access_token;
//        this.access_token = 'amir';
//        localStorage.setItem('etaToken', data.access_token);
//        this.errorMessage = null;
//      },
//        (err: HttpErrorResponse) => {
//          console.log('false');
//          //this.isLoginError = true;         
//          this.errorMessage = 'Error';
//          console.log(this.errorMessage);
//        });

//        this.dialogRef.close();

//  }

//  logOut() {
//    localStorage.removeItem('etaToken');
//    this.router.navigate(['/UnSubmitedInvoiceView']);
   
//  }
 }
