import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountUser } from '../shared/Models/account-user';
import { ToastrService } from 'ngx-toastr';
import { ActivityType } from '../shared/Models/activity-type';
import { ActivityTypeService } from '../shared/Services/activity-type.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
// import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { getLocaleMonthNames } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: true}
  }]
})
export class SignupComponent implements OnInit {
  user: AccountUser;
  // ActivityTypelist:ActivityType[];
  // selectedActivity:ActivityType[];
  completed: boolean = false;
  state: string;
  // selectedItem: string[] = [];
  // step:any;
  // Data :any;
  // array=[];
  // isLinear = false;
  // // dropdownList = [];
  // dropdownListt : ActivityType[] =[];
  // // dropdownSettings:IDropdownSettings={};
  // dropdownList:[]=[];
  // dropdownSettings;
  form: FormGroup;
  isValid: boolean = true;

  hide = true;
  constructor(private formBuilder : FormBuilder ,
     private userService: UserService,
      private router: Router ,  private toastr: ToastrService,private _formBuilder: FormBuilder ,
       private activityServ:ActivityTypeService){}

  ngOnInit(){
  //  this.getActivityType();

   //  this.initForm();
    this.resetForm();

    // this.dropdownList = this.getActivityType();
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'ActivityTypeID',
    //   textField: 'ActivityTypeName',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   allowSearchFilter: true
    // };
  }



  // getConn(){
  //   this.dropdownList = this.getActivityType();
  //   this.dropdownSettings = {
  //     singleSelection: false,
  //     idField: 'ActivityTypeID',
  //     textField: 'ActivityTypeName',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All'
  //   };
  // }

  // initForm(){
  //   this.form = this.formBuilder.group({
  //     grocery : ['',[Validators.required]]
  //   })
  // }

  // handleButtonClick(){
  //   console.log('reactive form value ', this.form.value);


  //   console.log('Actual data ', this.getObjectListFromData(this.form.value.grocery.map(item => item.ActivityTypeID)));
  // }

  // onItemSelect($event){
  //   console.log('$event is ', $event);
  //   this.dropdownListt.push($event);
  //   console.log(this.dropdownListt ,"this.dropdownListt")
  // }

  // getObjectListFromData(ids){
  //   console.log(ids,"ids")
  //   if(ids ){
  //     return this.getActivityType().filter(item => item.ActivityTypeID.includes(ids))
  //   }
  // }

  // getData() : Array<any>{
  //   return [
  //     { item_id: 1, item_text: 'Apple', group : 'F' },
  //     { item_id: 2, item_text: 'Orange', group : 'F' },
  //     { item_id: 3, item_text: 'Potatoes', group : 'V' },
  //     { item_id: 4, item_text: 'Cabbage', group : 'V' },
  //     { item_id: 5, item_text: 'Cauliflower', group : 'V' }
  //   ];
  // }

  // setDefaultSelection(){
  //   let item = this.getActivityType()[0];
  //   this.form.patchValue({
  //     grocery : [{
  //       ActivityTypeID : item['ActivityTypeID'],
  //       ActivityTypeName : item['ActivityTypeName']
  //     }]
  //   })
  // }





  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // Property to check the form is dirty or not
  @ViewChild('userRegistrationForm', { static: true }) public createUserForm: NgForm;

  // constructor(private userService: UserService, private router: Router ,  private toastr: ToastrService,private _formBuilder: FormBuilder , private activityServ:ActivityTypeService) { }

  // ngOnInit() {
  //   // this.Data = false;
  //   this.resetForm();
  //    this.getActivityType();

  //    this.dropdownList = [
  //     { item_id: 1, item_text: 'Item1' },
  //     { item_id: 2, item_text: 'Item2' },
  //     { item_id: 3, item_text: 'Item3' },
  //     { item_id: 4, item_text: 'Item4' },
  //     { item_id: 5, item_text: 'Item5' }
  //   ];
  //   this.dropdownSettings = {
  //     idField: 'item_id',
  //     textField: 'item_text',
  //     allowSearchFilter: true
  //   };
  //   // this.step = 1;

  //   // this.firstFormGroup = this._formBuilder.group({
  //   //   firstCtrl: ['', Validators.required]
  //   // });
  //   // this.secondFormGroup = this._formBuilder.group({
  //   //   secondCtrl: ['', Validators.required]
  //   // });
  //   // console.log(this.dropdownList , "1")



  // }

  // currentUserInteractions = [
  //   {name: 'first', key: 'firstStep'},
  //   {name: 'second', key: 'secondStep'},
  //   {name: 'third', key: 'thirdStep'},
  //   {name: 'fourth', key: 'fourthStep'},
  // ];


  // done() {
  //   this.completed = true;
  //   this.state = 'done';
  //   // console.log(this.firstFormGroup.valid);
  //   // console.log(this.secondFormGroup.valid);
  // }

  // setSelectedItems(str) {

  //   this.selectedActivity = str;

  //   console.log(' this.selectedItem',  this.selectedActivity);


  // }

  // onItemSelect(item: any) {

  //   console.log('onItemSelect', item);

  //   // this.dropdownList =  this.dropdownList  + item;
  //   // console.log(this.dropdownList, "this.dropdownListt")
  // }

  // onSelectAll(items: any) {
  //     console.log('onSelectAll', items);
  // }

  // arraydata:FormData [] = [];
  // data(f:NgForm){
  //   console.log(f.value);
  //  //  this.arraydata.append(f.value)
  // this.arraydata.push(f.value);
  // console.log(this.arraydata)
  // }

  // getActivityType():any{

  //   this.activityServ.getActivityType().subscribe(res => this.ActivityTypelist = res);
  //   console.log(this.ActivityTypelist  ,'this.ActivityTypelist123445566 ')

  // }





  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      name:'',
      emailOrPhone:'',
      password:'',
      // EnterpriseName: '',
      // RegistrationNumber: '',
      // UserLog: '',
      // PSWRD: '',
      // EnterpriseClientIdActive :'',
      // EnterpriseClientId :'',
      // EnterpriseClientSecret :'',
      // EnterpriseClientSecretActive :'',
      // ActivityTypelist:[],
    };

  }

  // form1(){
  //   console.log("1");
  // }

  // form2(){
  //   console.log("2");
  // }

  OnSubmit(form: NgForm) {
    form.value

  let accoutuser : AccountUser;
  accoutuser = form.value


    if (this.validateForm()) {
      this.userService.registerEInvoiceUser(form.value)
        .subscribe((data: any) => {

          if (data.Success === true) {
            this.showSuccess();
            this.resetForm(form);
            console.log("doooneeeeee")
            this.router.navigate(['/userView']);
          }
          else
            this.showError();
            console.log(data.Errors[0]);
        },
          (err: HttpErrorResponse) => {
            console.log(err , 'err');
          });

    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ البيانات بنجاح', '  تم إضاقة مسوق جديد ');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ البيانات', 'خطأ في إضافة مسوق');
  }


  // Previous(){
  //   this.step = this.step - 1;
  // }

  // Next(){
  //   this.step = this.step +1;

  // }

  validateForm() {
    this.isValid = true;
    if (this.userService.formData.name == null || this.userService.formData.name == '')
      this.isValid = false;

    else if (this.userService.formData.password == null || this.userService.formData.password == '')
      this.isValid = false;

    else if (this.userService.formData.emailOrPhone == null || this.userService.formData.emailOrPhone == '')
      this.isValid = false;


    return this.isValid;
  }


}
