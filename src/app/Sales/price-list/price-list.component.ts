import { CustomerComponent } from './../../EI-Codes/customer/customer.component';
import { PriceListOtherItemComponent } from './../price-list-OtherItem/price-list-OtherItem.component';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { PriceListAddOnItemComponent } from './../price-list-AddOnItem/price-list-addonitem.component';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { NgForm,FormControl, FormGroup, Validators } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/shared/Models/customer.model';
import { environment } from './../../../environments/environment';
import { DatePipe } from '@angular/common'
import { Observable, concat } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { PriceLists } from 'src/app/shared/Models/price-lists';
import { PriceListsService } from 'src/app/shared/Services/price-lists.service';
import { CustomerService } from 'src/app/shared/Services/customer.service';
import { PriceListItemComponent } from '../price-list-item/price-list-item.component';
// import { CustSlidesService } from 'src/app/shared/Services/cust-slides.service';
// import { CustSlides } from 'src/app/shared/Models/cust-slides';
import { Item } from 'src/app/shared/Models/item';
@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {


  // CustSlideslist:CustSlides[];
  CurrentEmpId : number;
  selectedSalBand: PriceLists;
  isEnabled: boolean = true;
  itemslist: Item[];
  isValid: boolean = true;


  selectedItem: Item;
  customerslist:Customer[];
  selectedCustomer: Customer;
  UserID: string;
  UserType: string;
  EmpID: string;
  CusName:Customer;
  print:boolean=false;
  today: Date = new Date();
  ItemsCount: number = 0;
  DiscRatioval:number = 0;
  priceListItemsTotal:number=0;
  priceListAddOnsTotal:number=0;
  priceListOtherItemsTotal:number=0;
  h:string = '';
  imageName:string;
  fileToUpload: File = null;
  imageUrl:string = 'https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg';
  imageUrl2:string = 'https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg';
  filesToUpload : File[];
  url = 'http://pergola-api.minicodeco.com/api/PriceLists/print-pricelist/'

  CustomerName = "";
  stateCtrl = new FormControl();
  filteredStates: Observable<Customer[]>;

  constructor(public PriceListsServ: PriceListsService, public CustomerServ:CustomerService,private http: HttpClient
    ,public servStockService:ServStockService,private dialog: MatDialog, public datepipe: DatePipe,
     private vOrderServ : VacOrdersService ,private toastr: ToastrService ,
     public currentRoute: ActivatedRoute, private router: Router) {

  this.EmpID = localStorage.getItem('EmpID');

  }

  ngOnInit() {

    this.CurrentEmpId = parseInt( localStorage.getItem('EmpID'));

    this.resetform();


    this.servStockService.getCustomers().subscribe(res => this.customerslist = res);


    let Id = this.currentRoute.snapshot.paramMap.get('id')

    if (Id != null)
      this.populateForm(parseInt(Id));
  }


  GetCustomers(){
    this.servStockService.getCustomers().subscribe(res => this.customerslist = res);
  }



  resetform(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.PriceListsServ.formData = {
      priceList_ID:-1,
      customer_ID:null,
      priceList_Customer :'',
      priceList_Representative :'',
        priceList_Date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        priceList_Validity :'',
        priceList_Total :0,
        supplying_Duration:null,
        payment_First_Percent :null,
        payment_First_Value :null,
        payment_Second_Percent :null,
        payment_Second_Value :null,
        payment_Third_Percent :null,
        payment_Third_Value :null,
        attachment_1_File:'',
        attachment_2_File:'',
        attachment_1_URL:'',
        attachment_2_URL:'',
        exchangeRate:null,
        has_Contract:false,
        priceListItems:[],
        priceListOtherItems:[],
        priceListAddOns:[],
        entryUser :'',
        entrydate :this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        priceList_DiscountRate :0,
    }
    this.PriceListsServ.formData.priceListItems = [];
    this.PriceListsServ.formData.priceListOtherItems = [];
    this.PriceListsServ.formData.priceListAddOns = [];

  }



  populateForm(Id: number) {
    this.PriceListsServ.getPriceListsById(Id).subscribe(res => {
      this.PriceListsServ.formData = res;

      this.imageUrl =  this.PriceListsServ.formData.attachment_1_URL;
      this.imageUrl2 =  this.PriceListsServ.formData.attachment_2_URL;
      this.print = true;

      console.log(this.PriceListsServ.formData)

      // this.selectedCustomer = new Customer();
      // this.selectedCustomer.CustomerID = this.PriceListsServ.formData.CustomerId;
      // this.selectedCustomer.CustomerName = this.PriceListsServ.formData.custnam;

      //this.addServ.formData.addDets = res.addDets
    });
  }


  showSuccess() {
    this.toastr.success('تم حفظ عرض السعر', 'عرض السعر');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ عرض السعر', 'عرض السعر');
  }

  validateForm() {
    this.isValid = true;

    if (this.PriceListsServ.formData.priceList_Date == null || this.PriceListsServ.formData.priceList_Date == '')
    this.isValid = false;


  //   else if (this.PriceListsServ.formData.custnam == null || this.PriceListsServ.formData.custnam == '')
  //   this.isValid = false;

  //  else if (this.PriceListsServ.formData.CustomerId == null || this.PriceListsServ.formData.CustomerId == '')
  //   this.isValid = false;

   else if(this.PriceListsServ.formData.priceListItems.length == 0)
    this.isValid = false;


    return this.isValid;
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
          this.PriceListsServ.formData.attachment_1_File  =  this.imageUrl.split(",", 11)[1];
          console.log(  newURL , 'newURL')
          console.log( this.PriceListsServ.formData.attachment_1_File  , " this.PriceListsServ.formData.item_ImageFile ")
        }

        reader.readAsDataURL(file);

        // reader.onload =this._handleReaderLoaded.bind(this);

        // reader.readAsBinaryString(file);
    }
 }


 handleFileSelect2(evt){
  var files = evt.target.files;
  var file = files[0];

  if (files && file) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.imageUrl2 = event.target.result;
        console.log(  this.imageUrl2 , 'this.imageUrl')

        // let newURL = this.imageUrl.split("data:image/jpeg;base64,")[1]
        let newURL2 = this.imageUrl2.split(",", 11)[1];
        this.PriceListsServ.formData.attachment_2_File  =  this.imageUrl2.split(",", 11)[1];
        console.log(  newURL2 , 'newURL2')
        console.log( this.PriceListsServ.formData.attachment_2_File  , " this.PriceListsServ.formData.item_ImageFile ")
      }

      reader.readAsDataURL(file);

      // reader.onload =this._handleReaderLoaded.bind(this);

      // reader.readAsBinaryString(file);
  }
}


  // _handleReaderLoaded(readerEvt) {
  //  var binaryString = readerEvt.target.result;
  //         this.base64textString= btoa(binaryString);
  //         this.PriceListsServ.formData.item_ImageFile = btoa(binaryString)
  //         console.log(btoa(binaryString));
  // }

  getCustomers() {
    this.servStockService.getCustomers().subscribe((data: any) => {
      this.customerslist = data;
      this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.CustomerName),
          map(state => state ? this._filterStates(state) : this.customerslist.slice())
        );
    },
      (err: HttpErrorResponse) => {
      });
  }

  private _filterStates(value: string): Customer[] {
    console.log(value , 'v')
    const filterValue = value.toLowerCase();

    return this.customerslist.filter(state => state.customer_Name.toLowerCase().indexOf(filterValue) >= 0);

  }

  displayFn(Item?: Customer): string | undefined {


    console.log(Item , 'ittt')

      return Item ? Item.customer_Name : undefined;
  }


  openForEdit(Id: number) {
    this.router.navigate(['/PriceList/edit/' + Id]);
  }

  validateForPopUp() {
    this.isValid = true;

    if (this.PriceListsServ.formData.exchangeRate == null || this.PriceListsServ.formData.exchangeRate == 0){
      this.toastr.error( ' الرجاء إدخال قيمة معامل التحويل ');
      this.isValid = false;
    }


  //   else if (this.PriceListsServ.formData.custnam == null || this.PriceListsServ.formData.custnam == '')
  //   this.isValid = false;

  //  else if (this.PriceListsServ.formData.CustomerId == null || this.PriceListsServ.formData.CustomerId == '')
  //   this.isValid = false;




    return this.isValid;
  }



  printPdf(id:number){
    window.open(this.url + id , '_blank');
  }

  // setSelectedCustomer(str) {
  //   console.log(str)
  //   this.selectedCustomer = str;
  // }

  setSelectedCustomer(cust) {
    console.log(cust ,"cust")
    this.selectedCustomer = this.customerslist.find(x => x.customer_ID == cust);
    this.PriceListsServ.formData.priceList_Customer =  this.selectedCustomer.customer_Name;
    console.log( this.selectedCustomer ," this.selectedCustomer")

  }

  onSubmit(form: NgForm) {

    if (this.validateForm()) {
      this.isEnabled = false;

      if (this.PriceListsServ.formData.priceList_ID == -1) {
        console.log(this.PriceListsServ.formData);
        this.PriceListsServ.formData.attachment_1_File  =  this.imageUrl.split(",", 11)[1]
        this.PriceListsServ.formData.attachment_2_File  =  this.imageUrl2.split(",", 11)[1]

        this.PriceListsServ.postPriceLists().subscribe(
          res => {
            this.showSuccess();
            // this.print = true;
            // this.printPdf(this.PriceListsServ.formData.priceList_ID);
            // this.resetform();
            this.router.navigate(['/priceListView']);

            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
        console.log('w');
        this.PriceListsServ.formData.attachment_1_File  =  this.imageUrl.split(",", 11)[1]
        this.PriceListsServ.formData.attachment_2_File  =  this.imageUrl2.split(",", 11)[1]

        console.log(this.PriceListsServ.formData);

        this.PriceListsServ.putPriceLists().subscribe(
          res => {
            this.showSuccess();

            // this.router.navigate(['/priceListView']);
            this.isEnabled = true;

          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
    }

  }

  AddOrEditSalInvItems(orderItemIndex, priceList_ID) {
    console.log(priceList_ID , "SellingId")
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      //  var StoreId = this.PriceListsServ.formData.StoreId;
      dialogConfig.data = { orderItemIndex,priceList_ID };
      console.log( dialogConfig.data , " dialogConfig.data")

      this.dialog.open(PriceListItemComponent, dialogConfig).afterClosed().subscribe(res => {this.calcGrandTotal();});
    }
  }


  AddOrEditSalInvOItems(orderItemIndex, SellingId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      //  var StoreId = this.PriceListsServ.formData.StoreId;
      dialogConfig.data = { orderItemIndex,SellingId };
      this.dialog.open(PriceListOtherItemComponent, dialogConfig).afterClosed().subscribe(res => {this.calcGrandTotal();});
    }
  }

  AddOrEditSalInvAddOnItems(orderItemIndex, SellingId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
      //  var StoreId = this.PriceListsServ.formData.StoreId;
      dialogConfig.data = { orderItemIndex,SellingId };
      this.dialog.open(PriceListAddOnItemComponent, dialogConfig).afterClosed().subscribe(res => {this.calcGrandTotal();});
    }
  }

  onDeleteSalInvItems(SerNo: number, i: number) {
    this.PriceListsServ.formData.priceListItems.splice(i, 1);
    this.calcGrandTotal();
    // this.calcItemsQty();
  }

  onDeleteSalInvOItems(SerNo: number, i: number) {
    this.PriceListsServ.formData.priceListOtherItems.splice(i, 1);
    this.calcGrandTotal();
    // this.calcItemsQty();
  }

   onDeleteSalInvADDOItems(SerNo: number, i: number) {
    this.PriceListsServ.formData.priceListOtherItems.splice(i, 1);
    this.calcGrandTotal();
    // this.calcItemsQty();
  }

  // calcItemsQty() {
  //   let sum: number = 0;
  //   this.PriceListsServ.formData.PriceListDets.forEach(a => sum += parseInt(a.Qty.toString()));
  //   this.ItemsCount = sum;
  // }


  calcGrandTotal() {
    // this.PriceListsServ.formData.PriceListVal = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr.tot }, 0);
    // this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.PriceListVal).toFixed(2));


    // this.PriceListsServ.formData.Net = parseFloat((this.PriceListsServ.formData.PriceListVal - this.PriceListsServ.formData.ListDisc).toFixed(2));

    this.priceListItemsTotal = this.PriceListsServ.formData.priceListItems.reduce((prev, curr) => { return prev + curr.item_SubTotal }, 0);
    // this.priceListItemsTotal = parseFloat(( this.priceListItemsTotal).toFixed(2));

    this.priceListAddOnsTotal = this.PriceListsServ.formData.priceListAddOns.reduce((prev, curr) => { return prev + curr.addOn_SubTotal }, 0);
    // this.priceListAddOnsTotal = parseFloat(( this.priceListAddOnsTotal).toFixed(2));
    // let ownedCars = this.PriceListsServ.formData.priceListItems.map(x => x.item_Total_Area );
    // console.log(ownedCars[0] ,"ownedCars")
    this.priceListOtherItemsTotal = this.PriceListsServ.formData.priceListOtherItems.reduce((prev, curr) => { return prev + curr.otherItem_SubTotal }, 0);
    // this.priceListOtherItemsTotal = parseFloat(( this.priceListOtherItemsTotal).toFixed(2));

    this.PriceListsServ.formData.priceList_Total =  +this.priceListOtherItemsTotal +  +this.priceListAddOnsTotal +  +this.priceListItemsTotal;
    this.PriceListsServ.formData.priceList_Total  = parseFloat(( this.PriceListsServ.formData.priceList_Total ).toFixed(2));
    console.log( this.PriceListsServ.formData.priceList_Total ," this.PriceListsServ.formData.priceList_Total")
  }




  // calcItemsQty8() {
  //   let sum2: number = 0;
  //   this.PriceListsServ.formData.saleInvItems.forEach(a => sum2 += parseInt(a.DiscRatio.toString()));
  //    this.DiscRatioval = sum2;

  //    this.PriceListsServ.formData.SellingDiscRatio= sum2;
  // }

  // calcDiscValue() {
  //   this.PriceListsServ.formData.SellingDisc = parseFloat((this.PriceListsServ.formData.SellingTot * this.PriceListsServ.formData.SellingDiscRatio / 100).toFixed(2));


  //   this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.SellingTot - this.PriceListsServ.formData.SellingDisc + this.PriceListsServ.formData.SaleTax).toFixed(2));
  // }

  calcDiscRatio() {

    this.PriceListsServ.formData.payment_First_Value = parseFloat(((this.PriceListsServ.formData.payment_First_Percent / 100 ) * this.PriceListsServ.formData.priceList_Total).toFixed(2));
    this.PriceListsServ.formData.payment_Second_Value = parseFloat(((this.PriceListsServ.formData.payment_Second_Percent / 100 ) * this.PriceListsServ.formData.priceList_Total).toFixed(2));
    this.PriceListsServ.formData.payment_Third_Value = parseFloat(((this.PriceListsServ.formData.payment_Third_Percent / 100 ) * this.PriceListsServ.formData.priceList_Total).toFixed(2));

  }

  // calcGrandTotal() {
  //   this.PriceListsServ.formData. = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr.tot }, 0);
  //   this.PriceListsServ.formData.SellingTot = parseFloat((this.PriceListsServ.formData.SellingTot).toFixed(2));  //total

  //   this.PriceListsServ.formData.SellingDisc = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr. }, 0);
  //   // this.PriceListsServ.formData.SellingDisc = parseFloat((this.PriceListsServ.formData.SellingDisc).toFixed(2));  //total
  //   this.PriceListsServ.formData.SellingDiscRatio = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr.DiscRatio }, 0);

  //   console.log( this.PriceListsServ.formData.SellingDisc ,' this.PriceListsServ.formData.SellingDisc')
  //   // this.PriceListsServ.formData.SaleTax = this.PriceListsServ.formData.saleInvItems.reduce((prev, curr) => { return prev + curr.ItmSaleTax }, 0);
  //   // this.PriceListsServ.formData.SaleTax = parseFloat((this.PriceListsServ.formData.SaleTax).toFixed(2));



  //   this.PriceListsServ.formData.SaleTax = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr.DetTaxSal }, 0);
  //   this.PriceListsServ.formData.SaleTax = parseFloat((this.PriceListsServ.formData.SaleTax).toFixed(2));


  //   //الضرائب
  //   // this.PriceListsServ.formData.SaleTax = this.PriceListsServ.formData.saleInvItems.reduce((prev, curr) => { return prev + curr.DetTaxSal }, 0);
  //   // this.PriceListsServ.formData.SaleTax = parseFloat((this.PriceListsServ.formData.SaleTax).toFixed(2));




  //   // الnet
  //   this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.PriceListVal  - this.PriceListsServ.formData.SellingDisc   + this.PriceListsServ.formData.SaleTax  ).toFixed(2));
  //   this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.SellingTot  + this.PriceListsServ.formData.SaleTax -  this.PriceListsServ.formData.SellingDisc ).toFixed(2));

  //   // this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.PriceListVal - this.PriceListsServ.formData.SellingDisc).toFixed(2));
  //   // console.log(this.PriceListsServ.formData.SaleTax);
  // }



  AddOrEditSalInvItemss() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "100%";
    // var StoreId = this.servSellingRet.formData.StoreId;
    // dialogConfig.data = { orderItemIndex };
    this.dialog.open(CustomerComponent, dialogConfig).afterClosed().subscribe(res => {  this.GetCustomers();

    });

}


}
