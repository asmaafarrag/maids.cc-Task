import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

import { Item } from '../../shared/Models/item';


import { ToastrService } from 'ngx-toastr';

import { ServStockService } from '../../shared/Services/serv-stock.service'
import { SalesUnits } from 'src/app/shared/Models/sales-units';
import { ItemService } from 'src/app/shared/Services/item.service';
import { GroupsService } from 'src/app/shared/Services/groups.service';
import { Groups } from 'src/app/shared/Models/groups';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  UserID : string;
  UserType: string;

  isValid: boolean = true;
  isEnabled: boolean = true;
  Unitslist: SalesUnits[];
  Groupslist: Groups[];

  constructor(public servItem: ItemService, private servStock: ServStockService, private groupsServ:GroupsService
    , private toastr: ToastrService
    , public currentRoute: ActivatedRoute, private router: Router) { 
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
  }

  ngOnInit() {
let InvId = this.currentRoute.snapshot.paramMap.get('id')
    this.getUnits();
    this.getGroups();
    this.resetForm();

    if (InvId != null)
    this.populateForm(parseInt(InvId));
  }

  populateForm(InvId: number) {
    this.servItem.getItemById(InvId).subscribe(res =>  
      {
        this.servItem.formData = res;
      } );
  }

  getUnits() {
    this.servStock.getUnits().subscribe(res => this.Unitslist = res);
  }

  getGroups() {
    this.groupsServ.getGroups().subscribe(res => this.Groupslist = res);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.servItem.formData = {
      ItemID: -1,
      ItemNO: null,
      ItemName: '',
      ItemSalePrice: null,
      UnitId: null,
      UnitName: '',
      ItemNote1: '',
      ItemNote2: '',
      CompanyName: '',
      AvailableQty: null,
      GroupID:null,
      ItmTaxRatio:null,
      TaxTypeID:null,
      GS1Code :'',
      EGSCode :'',
      RequestId :'', 
      codeType:'',
      parentCode:'',
      activeFrom:'',
      activeTo:'',
      UpdatePriceDate:'',
      itemupdateRatioprice:0,
      itemupdateprice:0,
      ItemTaxTypes:[],
      DollarPrice:null,
    // isSelected :false,

    }

    this.servItem.GetMaxItemNo().subscribe(res => 
     {
       this.servItem.formData.ItemNO = res ;       
     }
     );
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      if (this.servItem.formData.ItemID == -1) {
        this.servItem.postItem().subscribe(
          res => {
            this.showSuccess();
            this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
        this.servItem.putItem().subscribe(
          res => {
            this.showSuccess();
            //this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
     
    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ الصنف', 'الاصناف');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ الصنف', 'الاصناف');
  }

  validateForm() {
    this.isValid = true;
    if (this.servItem.formData.UnitId == null || this.servItem.formData.UnitId == 0)
      this.isValid = false;
      if (this.servItem.formData.GroupID == null || this.servItem.formData.GroupID == 0)
      this.isValid = false;
    else if (this.servItem.formData.ItemName == null)
      this.isValid = false;
    else if (this.servItem.formData.ItemSalePrice == null)
      this.isValid = false;
    return this.isValid;
  }



}
