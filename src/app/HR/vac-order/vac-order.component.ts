import { Component, OnInit } from '@angular/core';
import { Emps } from 'src/app/shared/Models/emps';
import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { NgForm,FormControl, FormGroup, Validators } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { Vacs } from 'src/app/shared/Models/vacs';
import { EmpVacBal } from 'src/app/shared/Models/emp-vac-bal'

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vac-order',
  templateUrl: './vac-order.component.html',
  styleUrls: ['./vac-order.component.css']
})
export class VacOrderComponent implements OnInit {

  constructor(public service: VacOrdersService,private toastr: ToastrService) { }
  Empslist: Emps[];
  Vacslist: Vacs[];
  EmpVBal: EmpVacBal[];
  CurrentEmpId : number;

  today = new Date(); 

  ngOnInit() {
    this.CurrentEmpId = parseInt( localStorage.getItem('EmpID'));
    this.resetform();
    this.getEmps();
    this.getVacs();
  }

  getEmps() {
    this.service.getSelectedEmps(this.CurrentEmpId).subscribe(res => this.Empslist = res);
  }

  getVacs() {
    this.service.getVacs().subscribe(res => this.Vacslist = res);
  }

  resetform(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      VacOrderId: 0,
      VacOrderDate: new Date().toISOString().substring(0,10),
      VacId: null,
      EmpID:  null,
      VacDateFrom: '',
      VacDateTo: '',
      VacNotes: '',
      VacOrders_DaTim: null,
      YearTagId: 1,
      BasicOrMove: 'MOVE',
      VacOrdDateFrom: '',
      VacOrdDateTo: '',
      VacApprovedDateTo: '',
      VacApprovedDateFrom: '',
      EmpRespId: null,
      IsApproved: '0'     
    }

  }

  changeEmp(ctrl)
  {
    //this.service.formData.EmpId = this.Empslist[ctrl.selectedIndex - 1].EmpID;
    console.log(ctrl.selectedIndex);
    console.log(this.Empslist.length);
    this.service.getEmpVacBal(this.Empslist[ctrl.selectedIndex].EmpID).subscribe(res => this.EmpVBal = res);
  }

  changeVac(ctrl)
  {
    //this.service.formData.VacId = this.Vacslist[ctrl.selectedIndex - 1].VacID;
  }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    let d1 = new Date(this.service.formData.VacOrdDateFrom); let d2 = new Date();
    if (this.EmpVBal == null || this.EmpVBal.length == 0) {
      this.toastr.error('لا يوجد رصيد اجازات افتتاحى', 'خطأ');
    }
    else if (d1 <= d2 && this.service.formData.VacId != 3)
    {
      this.toastr.error('يجب تقديم الاجازة مسبقا بفترة كافية', 'خطأ');
    }
    else
    {
    this.service.postVacOrder().subscribe(
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
