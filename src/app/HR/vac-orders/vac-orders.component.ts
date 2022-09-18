import { Component, OnInit } from '@angular/core';
import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { VacOrdersView } from 'src/app/shared/Models/vac-orders-view';
import { VacOrderApproveComponent } from 'src/app/HR/vac-order-approve/vac-order-approve.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-vac-orders',
  templateUrl: './vac-orders.component.html',
  styleUrls: ['./vac-orders.component.css']
})
export class VacOrdersComponent implements OnInit {

  CurrentEmpId: number;
  VacOrderslist: VacOrdersView[];
  constructor(public service: VacOrdersService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
    this.CurrentEmpId = parseInt(localStorage.getItem('EmpID'));
    this.getVacOrders();
  }

  getVacOrders() {
    this.service.getVacOrders(this.CurrentEmpId).subscribe(res => this.VacOrderslist = res);
  }

  AdOrEditSalBandItem(VacOrderIndex, VacOrderId, RequestType) {

    /*
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={VacOrderIndex, VacOrderId};
    this.dialog.open(VacOrderApproveComponent,dialogConfig)
    */

    this.service.ApproveRequest(VacOrderId, RequestType, this.CurrentEmpId).subscribe(
      res => {
        this.showSuccess();
      },
      err => { console.log(err); }
    )

    this.VacOrderslist.splice(VacOrderIndex, 1);
  }

  RefuseRequest(VacOrderIndex, VacOrderId, RequestType) {
    if(confirm("هل انت متأكد من رفض هذا الطلب")) {
    this.service.RefuseRequest(VacOrderId, RequestType, this.CurrentEmpId).subscribe(
      res => {
        this.showRefused();
      },
      err => {
        console.log(err);
      }
    )

    this.VacOrderslist.splice(VacOrderIndex, 1);
    }
  }


  showSuccess() {
    this.toastr.success('تم الاعتماد', 'طلب اجازة');
  }

  showRefused() {
    this.toastr.warning('تم الرفض', 'طلب اجازة');
  }

}
