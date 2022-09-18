import { Component, OnInit } from '@angular/core';
import { EmpPermitsService } from 'src/app/shared/Services/emp-permits.service';
import { EmpPermits } from 'src/app/shared/Models/emp-permits';

import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-permits',
  templateUrl: './emp-permits.component.html',
  styleUrls: ['./emp-permits.component.css']
})
export class EmpPermitsComponent implements OnInit {

  CurrentEmpId: number;
  EmpPermitslist: EmpPermits[];
  constructor(public service: EmpPermitsService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
    this.CurrentEmpId = parseInt(localStorage.getItem('EmpID'));
    this.getEmpPermits();
  }

  getEmpPermits() {
    this.service.getEmpPermits(this.CurrentEmpId).subscribe(res => this.EmpPermitslist = res);
  }

  AdOrEditSalBandItem(VacOrderIndex, VacOrderId) {


    this.service.ApproveEmpPermit(VacOrderId,this.CurrentEmpId).subscribe(
      res => {
        this.showSuccess();
      },
      err => { console.log(err); }
    )

    this.EmpPermitslist.splice(VacOrderIndex, 1);
  }

  RefuseRequest(VacOrderIndex, VacOrderId) {
    this.service.RefuseEmpPermit(VacOrderId,this.CurrentEmpId).subscribe(
      res => {
        this.showRefused();
      },
      err => { console.log(err); }
    )

    this.EmpPermitslist.splice(VacOrderIndex, 1);
  }


  showSuccess() {
    this.toastr.success('تم الاعتماد', 'طلب تصريح');
  }

  showRefused() {
    this.toastr.success('تم الرفض', 'طلب تصريح');
  }

}
