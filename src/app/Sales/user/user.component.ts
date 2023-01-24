import { AccountUser } from './../../shared/Models/account-user';
import { UserService } from './../../shared/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { Enterpriseservice } from 'src/app/shared/Services/enterprises.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { BranchUserService } from 'src/app/shared/Services/branch-user.service';
import { UserType } from 'src/app/shared/Models/user-type';
import { UserTypeService } from 'src/app/shared/Services/user-type.service';
import { BranchUser } from 'src/app/shared/Models/branch-user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isValid: boolean = true;
  isEnabled: boolean = true;
  UserTypelist:UserType[];
  UserID: string;
  selectedUser:BranchUser;
  hide = true;
  id:number;
  edit:boolean=false;

  constructor(public userServ: BranchUserService , public usertypeServ:UserTypeService , public UserServices:UserService
    , private dialog: MatDialog, private toastr: ToastrService, public currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    let Id = this.currentRoute.snapshot.paramMap.get('id')
    console.log(Id)
    this.resetForm();
    this.ResetForm();



    // this.usertypeServ.getUserType().subscribe(res => this.UserTypelist = res);


    if (Id != null)
      this.populateForm(Id);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.UserServices.formData = {
      // id:'-1',
      // name:'',
      // userName:'',
      // isActive:false,

      name:'',
      emailOrPhone:'',
      password:'',

    }
  }

  ResetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.userServ.formData = {
      id:'-1',
      name:'',
      userName:'',
      isActive:true,

      // name:'',
      // emailOrPhone:'',
      // password:'',

    }
  }

  changeState(){
    this.userServ.formData.isActive = ! this.userServ.formData.isActive;
    console.log( this.userServ.formData.isActive)
  }

  // setSelectedBranch(str){
  //   this.selectedUser = str;
  //   console.log(str,'str')
  // }

  populateForm(Id: any) {
    console.log(Id)
    this.edit = true;
    this.userServ.getBranchUserById(Id).subscribe(res => {
      this.userServ.formData = res;
      console.log( this.userServ.formData)
      //this.addServ.formData.addDets = res.addDets
    });
  }

  onSubmit(form: NgForm) {
    console.log('aa');

    form.value

    let accoutuser : AccountUser;
    accoutuser = form.value


    if (this.validateForm()) {
      this.isEnabled = false;
      if (this.userServ.formData.id == '-1') {

        this.UserServices.registerEInvoiceUser(form.value)
        .subscribe((data: any) => {

          this.showSuccess();
          this.router.navigate(['/userView']);
          this.isEnabled = true;

          // if (data.Success === true) {
          //   this.showSuccess();
          //   this.resetForm(form);
          //   console.log("doooneeeeee")
          //   this.router.navigate(['/userView']);
          // }
          // else
          //   this.showError();
          //   console.log(data.Errors);
        },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )

        // this.userServ.postBranchUser().subscribe(
        //   res => {
        //     this.showSuccess();
        //     this.router.navigate(['/userView']);
        //     //this.generatePdf();
        //     this.resetForm();
        //     this.isEnabled = true;
        //   },
        //   err => { console.log(err); this.showError(); this.isEnabled = true; }
        // )
      }
      else {
        console.log('w');

        console.log(this.userServ.formData,"put")
        this.userServ.putBranchUser().subscribe(
          res => {
            this.showSuccess();
            this.router.navigate(['/userView']);
            //this.resetForm();

          },
          err => { console.log(err);  this.showError(); this.isEnabled = true; }
        )
      }
    }

  }


  // showSuccess() {
  //   this.toastr.success('تم حفظ المستخدم', 'المستخدم');
  // }

  // showError() {
  //   this.toastr.error('خطأ فى حفظ المستخدم', 'المستخدم');
  // }



  // validateForm() {
  //   this.isValid = true;
  //   if (this.userServ.formData.name == null || this.userServ.formData.name == '')
  //     this.isValid = false;

  //   else if (this.userServ.formData.userName == null || this.userServ.formData.userName == '')
  //     this.isValid = false;

  //   // else if (this.userServ.formData.UserType == null || this.userServ.formData.UserType == '')
  //   //   this.isValid = false;


  //   return this.isValid;
  // }
  // OnSubmit(form: NgForm) {
  //   form.value

  // let accoutuser : AccountUser;
  // accoutuser = form.value


  //   if (this.validateForm()) {
  //     this.UserServices.registerEInvoiceUser(form.value)
  //       .subscribe((data: any) => {

  //         if (data.Success === true) {
  //           this.showSuccess();
  //           this.resetForm(form);
  //           console.log("doooneeeeee")
  //           this.router.navigate(['/userView']);
  //         }
  //         else
  //           this.showError();
  //           console.log(data.Errors);
  //       },
  //         (err: HttpErrorResponse) => {
  //           console.log(err , 'err');
  //         });

  //   }
  // }

  // OnSubmit(form: NgForm) {
  //   form.value

  // let accoutuser : AccountUser;
  // accoutuser = form.value

  //   console.log(form.value)
  //   if (this.validateForm()) {
  //     console.log('d5l')


  //     this.UserServices.registerEInvoiceUser(form.value).subscribe(
  //       res => {
  //         console.log(res)
  //         this.showSuccess();
  //         this.resetForm(form);
  //         console.log("doooneeeeee")
  //         this.router.navigate(['/userView']);
  //       },
  //       err => { console.log(err); this.showError(); }
  //     )



  //     // this.UserServices.registerEInvoiceUser(form.value).subscribe((data: any) => {

  //     //     if (data.Success === true) {
  //     //       this.showSuccess();
  //     //       this.resetForm(form);
  //     //       console.log("doooneeeeee")
  //     //       this.router.navigate(['/userView']);
  //     //     }
  //     //     else
  //     //       this.showError();
  //     //       console.log(data.Errors[0]);
  //     //   },
  //     //     (err: HttpErrorResponse) => {
  //     //       console.log(err , 'err');
  //     //     });

  //   }
  // }


  showSuccess() {
    this.toastr.success('تم حفظ البيانات بنجاح');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ البيانات');
  }


  // Previous(){
  //   this.step = this.step - 1;
  // }

  // Next(){
  //   this.step = this.step +1;

  // }

  validateForm() {
    this.isValid = true;

    console.log(this.edit , "this.edit")
    if(this.edit == false){


      if (this.UserServices.formData.name == null || this.UserServices.formData.name == '')
      this.isValid = false;

      else if (this.UserServices.formData.password == null || this.UserServices.formData.password == '')
        this.isValid = false;

      else if (this.UserServices.formData.emailOrPhone == null || this.UserServices.formData.emailOrPhone == '')
        this.isValid = false;
    }

    else{

      if ( this.userServ.formData.name == null ||  this.userServ.formData.name == '')
      this.isValid = false;

      else if ( this.userServ.formData.userName == null ||  this.userServ.formData.userName == '')
        this.isValid = false;

    }



    return this.isValid;
  }


}
