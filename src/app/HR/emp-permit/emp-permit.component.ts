import { Component, OnInit } from '@angular/core';
import { Emps } from 'src/app/shared/Models/emps';
import { EmpPermitsService } from 'src/app/shared/Services/emp-permits.service';
import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { NgForm,FormControl, FormGroup, Validators } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { PermitType } from 'src/app/shared/Models/permit-type';


import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-permit',
  templateUrl: './emp-permit.component.html',
  styleUrls: ['./emp-permit.component.css']
})
export class EmpPermitComponent implements OnInit {

  constructor(public service: EmpPermitsService,private vOrderServ : VacOrdersService ,private toastr: ToastrService) { }

  Empslist: Emps[];
  PermitTypeslist: PermitType[];
  CurrentEmpId : number;

  today = new Date(); 

  ngOnInit() {
    this.CurrentEmpId = parseInt( localStorage.getItem('EmpID'));
    this.resetform();
    this.getEmps();
    this.getPermitTypes();
  }

  getEmps() {
    this.vOrderServ.getSelectedEmps(this.CurrentEmpId).subscribe(res => this.Empslist = res);
  }

  getPermitTypes() {
    this.service.getPermitTypes().subscribe(res => this.PermitTypeslist = res);
  }

  resetform(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      EmpPermitId: 0,
      EmpId: null,
      EmpName: '',
      PermitDate: '',
      PermitType: null,
      PermitTypeName: '',
      YearTagId: 1,
      BasicOrMove: 'MOVE',
      EmpPermits_DaTim: '',
      EmpPermitNotes: '',
      EmpRespId: null,
      IsApproved: '0',
      EmpMain: null
    }

  }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
  let d1 = new Date(this.service.formData.PermitDate); let d2 = new Date();
  d2.setHours(0, 0, 0, 0);
  if (d1 < d2)
  {
    this.toastr.error('يجب تقديم الطلب مسبقا بفترة كافية', 'خطأ');
  }
  else
  {
  this.service.postEmpPermit().subscribe(
    res => {
      this.resetform(form);
      this.showSuccess();
    },
    err => { console.log(err); }
  )
  }
}

  

  showSuccess() {
    this.toastr.success('تم الحفظ بنجاح', 'طلب اجازة');
  }

}
