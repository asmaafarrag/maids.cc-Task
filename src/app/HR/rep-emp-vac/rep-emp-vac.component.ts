import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { VacOrdersView } from 'src/app/shared/Models/vac-orders-view';
import { Emps } from 'src/app/shared/Models/emps';
import { EmpVacBal } from 'src/app/shared/Models/emp-vac-bal'

@Component({
  selector: 'app-rep-emp-vac',
  templateUrl: './rep-emp-vac.component.html',
  styleUrls: ['./rep-emp-vac.component.css']
})
export class RepEmpVacComponent implements OnInit {

  selectedEmp: Emps;
  Empslist: Emps[];
  EmpVBal: EmpVacBal[];
  CurrentEmpId: number;
  VacOrderslist: VacOrdersView[];
  isValidFormSubmitted: boolean;
  totalVacs: number;
  VacOpenBal:number;

  fromDate = new FormControl();
  toDate = new FormControl(new Date());

  RepForm = new FormGroup({
    EmployeeCtl: new FormControl('', Validators.required),
  });

  constructor(private service: VacOrdersService) { }

  ngOnInit() {
    this.totalVacs = 0;
    this.VacOpenBal = 0;
    this.CurrentEmpId = parseInt(localStorage.getItem('EmpID'));
    this.getEmps();

    var today = new Date();
    today.setDate(today.getDate() - 30);
    this.fromDate.patchValue(today);
  }
  getEmps() {
    this.service.getChildEmps(this.CurrentEmpId).subscribe(res => this.Empslist = res);
  }
  setSelectedEmp(str) {
    this.selectedEmp = str;
  }

  ViewReport(): void {
    this.isValidFormSubmitted = false;
    if (this.RepForm.invalid) {
      return;
    }
    this.totalVacs = 0;
    this.isValidFormSubmitted = true;
    this.fromDate.value.setMinutes(this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset());
    this.toDate.value.setMinutes(this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset());

    this.service.getEmpVacBal(this.selectedEmp.EmpID).subscribe(res => this.EmpVBal = res);

    this.service.getEmpVacRep(this.selectedEmp.EmpID, this.fromDate.value.toISOString().substring(0, 10), this.toDate.value.toISOString().substring(0, 10)).subscribe(res => this.VacOrderslist = res);

  }

  calculateDiff(fromDate, toDate) {
    var date1: any = new Date(fromDate);
    var date2: any = new Date(toDate);
    var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

    return diffDays + 1;
  }


  public OpenVacBal() {
    if (this.EmpVBal != null && this.EmpVBal.length > 0) {
      this.VacOpenBal = this.EmpVBal[0].VacOpenBalance;
      
    }
    else
    {
      this.VacOpenBal = 0;
    }
    return this.VacOpenBal;
  }

  public ActualVacsSum() {
    if (this.VacOrderslist != null) {
      this.totalVacs = this.VacOrderslist.map(tag => this.calculateDiff(tag.VacOrdDateFrom, tag.VacOrdDateTo)).reduce((a, b) => a + b, 0);
      return this.totalVacs;
    }
    else
      return 0;
  }

  public RemainderSum() {
    return this.VacOpenBal - this.totalVacs;
  }

}
