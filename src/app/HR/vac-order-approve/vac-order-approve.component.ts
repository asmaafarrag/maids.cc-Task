import { Component, OnInit, Inject } from '@angular/core';
import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { NgForm,FormControl, FormGroup, Validators } from '@angular/forms';
import { VacOrders } from 'src/app/shared/Models/vac-orders';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vac-order-approve',
  templateUrl: './vac-order-approve.component.html',
  styleUrls: ['./vac-order-approve.component.css']
})
export class VacOrderApproveComponent implements OnInit {

  formData: VacOrders;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<VacOrderApproveComponent>,public service: VacOrdersService,private toastr: ToastrService) { }

  ngOnInit() {

    /*
    this.formData = {
      VacOrderId: this.data.VacOrderId,
      VacApprovedDateFrom: this.data.VacOrdDateFrom,
      VacOrdDateTo: this.data.VacOrdDateTo,
    }
    */

  }

  onSubmit(form?: NgForm)
  {

  }

}
