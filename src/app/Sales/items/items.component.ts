import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

import { Item } from '../../shared/Models/item';
import { DatePipe } from '@angular/common'

import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ServStockService } from '../../shared/Services/serv-stock.service'
import { SalesUnits } from 'src/app/shared/Models/sales-units';
import { ItemService } from 'src/app/shared/Services/item.service';
import { GroupsService } from 'src/app/shared/Services/groups.service';
import { Groups } from 'src/app/shared/Models/groups';
import { TaxTypeService } from 'src/app/shared/Services/tax-type.service';
import { TaxType } from 'src/app/shared/Models/tax-type';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ItemLineComponent } from '../item-line/item-line.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  openingList= [];
  range
  UserID : string;
  UserType: string;

  isValid: boolean = true;
  isEnabled: boolean = true;
  Unitslist: SalesUnits[];
  Groupslist: Groups[];
  h:string = '';
  TaxTypeslist: TaxType[];
  imageName:string;
  fileToUpload: File = null;
  imageUrl:string = 'https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg';
  filesToUpload : File[]
  title = 'materialApp';
  base64textString:string="";

  constructor(public servItem: ItemService, private servStock: ServStockService, private groupsServ:GroupsService
    , private toastr: ToastrService , private TaxTypeServ:TaxTypeService, private dialog: MatDialog, private http: HttpClient,
     public currentRoute: ActivatedRoute, private router: Router , public datepipe: DatePipe ) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
  }

  ngOnInit() {
    let InvId = this.currentRoute.snapshot.paramMap.get('id')
    // this.getUnits();
    // this.getGroups();
    // this.getTaxTypes();
    this.resetForm();




    if (InvId != null)
    this.populateForm(parseInt(InvId));
  }

  populateForm(InvId: number) {


    this.servItem.getItemWPriceById(InvId).subscribe(res =>
      {
        this.servItem.formData = res;

        this.imageUrl =  this.servItem.formData.item_ImageURL;

        console.log(res,"res")

        this.range = new Array(Math.floor(res.columns_Count)).fill(0).map((i,x) => (x * res.opening_Step) + res.opening_StartValue);
        console.log(this.range,'r');

        // this.imageUrl = this.servItem.formData.ComplainImage;

      } );



  }

  // handleFileInput(file:FileList)
  // {
  //   this.fileToUpload=file.item(0);
  //   this.imageName = file.item(0).name;
  //   console.log(this.imageName, "imageName");
  //   console.log(this.fileToUpload, "fileToUpload");

  //   var reader=new FileReader();
  //   reader.onload = (event:any) => {
  //     this.imageUrl = event.target.result;
  //     console.log(  this.imageUrl , 'this.imageUrl')
  //   }
  //   reader.readAsDataURL(this.fileToUpload);
  //   this.uploadFile(file);
  // }



  // uploadFile = (files:any) => {

  //   this.filesToUpload = files;
  //   const formData = new FormData();

  //   Array.from(this.filesToUpload).map((file, index) => {
  //     this.h = file.name;
  //     console.log(this.h , index, file , 'this.h ')
  //     return formData.append('file'+ index, file, file.name);
  //   });
  //   const uploadReq = new HttpRequest('POST', environment.ApiUrl + '/Upload', formData, {
  //     reportProgress: true,
  //   });
  //   console.log(uploadReq , "upload668")

  //  this.http.request(uploadReq).subscribe(res => { console.log("done") });
  // }

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.imageUrl = event.target.result;
          console.log(  this.imageUrl , 'this.imageUrl')

          // let newURL = this.imageUrl.split("data:image/jpeg;base64,")[1]
          let newURL = this.imageUrl.split(",", 11)[1];
          this.servItem.formData.item_ImageFile  =  this.imageUrl.split(",", 11)[1];
          console.log(  newURL , 'newURL')
          console.log( this.servItem.formData.item_ImageFile  , " this.servItem.formData.item_ImageFile ")
        }

        reader.readAsDataURL(file);

        // reader.onload =this._handleReaderLoaded.bind(this);

        // reader.readAsBinaryString(file);
    }
 }



  _handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          this.servItem.formData.item_ImageFile = btoa(binaryString)
          console.log(btoa(binaryString));
  }

  // calcGrandTotal() {
  //   this.servItem.formData. = this.servItem.formData.saleInvItems.reduce((prev, curr) => { return prev + curr.Tot }, 0);
  //   this.servItem.formData.SellingTot = parseFloat((this.servItem.formData.SellingTot).toFixed(2));  //total
  // }

  // getUnits() {
  //   this.servStock.getUnits().subscribe(res => this.Unitslist = res);
  // }

  // getGroups() {
  //   this.groupsServ.getGroups().subscribe(res => this.Groupslist = res);
  // }

  // getTaxTypes() {
  //   this.TaxTypeServ.getTaxTypes().subscribe(res => this.TaxTypeslist = res);
  // }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.servItem.formData = {
      // ItemID: -1,
      // ItemNO: null,
      // ItemName: '',
      // ItemNameE:'',
      // ItemSalePrice: null,
      // UnitId: null,
      // UnitName: '',
      // ItemNote1: '',
      // ItemNote2: '',
      // CompanyName: '',
      // AvailableQty: null,
      // GroupID:null,
      // GroupName:'',
      //     ItmTaxRatio:null,
      // // DiscV:0,
      // TaxTypeID:null,
      // ItemBarCode:'',
      // GS1Code :'',
      // EGSCode :'',
      // RequestId :'',
      // parentCode:'',
      // activeFrom:'',
      // activeTo:'',
      // codeType:'',
      // isSelected:false,
      // ItemPrices:[],


      item_ID :-1,
      item_Name :'',
      item_Description  :'',
      item_ImageURL  :'',
      item_ImageFile:'',
      item_Enabled :true,
      rows_Count :null,
      columns_Count :null,
      opening_StartValue :null,
      opening_Step :null,
      itemPrices:[],
        // entryUser :'',
      // entrydate :this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      isSelected:false,




    }
    this.servItem.formData.itemPrices = [];
    // this.servItem.GetMaxItemNo().subscribe(res =>
    //  {
    //    this.servItem.formData.ItemNO = res ;
    //  }
    //  );
  }


  AddOrEditSalInvItems(orderItemIndex, SellingId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      // var StoreId = this.servItem.formData.StoreId;
      dialogConfig.data = { orderItemIndex, SellingId};
      this.dialog.open(ItemLineComponent, dialogConfig).afterClosed().subscribe(res => { });
    }
  }

  onDeleteSalInvItems(SerNo: number, i: number) {
    this.servItem.formData.itemPrices.splice(i, 1);
    // this.calcGrandTotal();
    // this.calcItemsQty();
  }



  validateForPopUp() {
    this.isValid = true;
    // if (this.servItem.formData.UnitId == null || this.servItem.formData.UnitId == 0)
    //   this.isValid = false;
    //   if (this.servItem.formData.GroupID == null || this.servItem.formData.GroupID == 0)
    //   this.isValid = false;
     if (this.servItem.formData.item_Name == null)
      this.isValid = false;
    //   else if (this.servItem.formData.ItemBarCode == null)
    //   this.isValid = false;
    // else if (this.servItem.formData.ItemSalePrice == null || this.servItem.formData.ItemSalePrice == 0)
    //   this.isValid = false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {

    // this.servItem.formData.ComplainImage = this.imageName;
    // console.log(this.servItem.formData.ComplainImage ,'this.AdsServ.formData.offerImageUrl ');

    if (this.validateForm()) {
      this.isEnabled = false;
      if (this.servItem.formData.item_ID == -1) {
        this.servItem.formData.item_ImageFile  =  this.imageUrl.split(",", 11)[1]
        console.log(this.servItem.formData , "this.servItem.formData")
        this.servItem.postItems().subscribe(
          res => {
            this.showSuccess();
            // this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
        this.servItem.formData.item_ImageFile  =  this.imageUrl.split(",", 11)[1]
        console.log(this.servItem.formData , "this.servItem.formData")
        this.servItem.putItem().subscribe(
          res => {
            this.showSuccess();
            // this.resetForm();
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
    // if (this.servItem.formData.UnitId == null || this.servItem.formData.UnitId == 0)
    //   this.isValid = false;
      // if (this.servItem.formData.GroupID == null || this.servItem.formData.GroupID == 0)
      // this.isValid = false;
     if (this.servItem.formData.item_Name == null || this.servItem.formData.item_Name == '')
      this.isValid = false;

    else if (this.servItem.formData.rows_Count == null || this.servItem.formData.rows_Count == 0)
      this.isValid = false;

    else if (this.servItem.formData.columns_Count == null || this.servItem.formData.columns_Count == 0)
    this.isValid = false;

    else if (this.servItem.formData.opening_StartValue == null )
    this.isValid = false;

    else if (this.servItem.formData.opening_Step == null || this.servItem.formData.opening_Step == 0)
    this.isValid = false;


    //   else if (this.servItem.formData.ItemBarCode == null)
    //   this.isValid = false;
    // else if (this.servItem.formData.ItemSalePrice == null || this.servItem.formData.ItemSalePrice == 0)
    //   this.isValid = false;
    return this.isValid;
  }

  createRange(number) {
   return new Array(number - 0).fill(0).map((d, i) => i + 0);

  }
  submitted = false;


  IncreaseValue(){

    // let r = new Array(this.servItem.formData.columns_Count - 0).fill(0).map((d,i) => i + this.servItem.formData.opening_StartValue);
    // console.log(r,'r');

    // console.log(Array.from({ length: this.servItem.formData.columns_Count }).reduce((x, y, i, a) => (a.fill(i, i, i + 1), a), []))


    let start = 0;
    let end = 100;
    let step = 10;
    let arrayLength = Math.floor(((end - this.servItem.formData.opening_StartValue) / this.servItem.formData.opening_Step)) + 1;
    // console.log(arrayLength)
    // let range = new Array(arrayLength).map(x => (x * step) + start);

    this.range = new Array(Math.floor(this.servItem.formData.columns_Count)).fill(0).map((i,x) => (x * this.servItem.formData.opening_Step) + this.servItem.formData.opening_StartValue);
    console.log(this.range,'r');

  }



}




