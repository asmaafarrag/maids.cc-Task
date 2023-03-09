import { ItemsExcelModels } from './../../shared/Models/items-excel-models';
import { Excel } from './../../shared/Models/excel';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from 'src/app/shared/Models/item';
import { ItemService } from 'src/app/shared/Services/item.service';
import { ExcelService } from 'src/app/shared/Services/excel/excel.service';
import { Subject } from 'rxjs/internal/Subject';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {

  term: string;

  ItemsList: Item[];
  ItemsExcelList:ItemsExcelModels[];
  ItemList:Excel[];
  currentIndex = -1;
  page: number = 0;
  count: number = 0;
  pageSize: number = 10;
  pageSizes = [10, 20, 30,40,50];
  title: string = '';
  UserID: string;
  UserType: string;
  EmpID: string;
  keys: string[];
  dataSheet = new Subject();
   @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  Loadend:boolean=false;

  constructor(private ItemServ: ItemService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute
    ,private ExcelServ: ExcelService) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EmpID = localStorage.getItem('EmpID');

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {

        this.getItems();

      }
    });
  }
  ngOnInit() {
  }


  getItems() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

      this.ItemServ.getItemsList(params).subscribe(res => {
        console.log(res.data)
        this.ItemsList = res.data;
        this.count = res.recordsTotal;
      },
        err => { console.log(err); });
  }

  openForEdit(itemId: number) {
    this.router.navigate(['/Items/edit/' + itemId]);
  }

  onOrderDelete(ItemIndex: number, ItemId: number) {
    if (confirm("هل انت متأكد من حذف هذا الصنف")) {
      this.ItemServ.deleteItem(ItemId).subscribe(
        res => {
          this.showDeleted();
          this.ItemsList.splice(ItemIndex, 1);
        },
        err => {
          console.log(err);
        }
      )
    }
  }


  showDeleted() {
    this.toastr.info('تم حذف الصنف', 'الاصناف');
  }

  SendtoAPI()
  {
    console.log(this.ItemList,'in compnent');
    if(this.Loadend == true)
    {
      this.ExcelServ.SendFile(this.ItemList).subscribe(
        res => {
          this.showSuccess();
          //this.generatePdf();
        },
        err => { console.log(err); this.showError();}
      )
    }
  }
  showSuccess() {
    this.toastr.success('تم ارسال الاكسل', 'الاكسل');
  }

  showError() {
    this.toastr.error('خطأ فى ارسال الاكسل', 'الاكسل');
  }

  onChange(evt) {
    let data, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws,{header:['#','ItemName','ItemNameE' , 'ItemBarCode' , 'ItemSalePrice', , 'UnitName' , 'GroupName']});
        this.ItemList=data;


      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.keys = Object.keys(data[0]);
        console.log(this.keys,'keys');

        this.dataSheet.next(data);
        this.Loadend=true;



      }
    } else {
      this.inputFile.nativeElement.value = '';
    }



  }



  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
     params['Key'] = searchTitle;
    }

    if (page) {
      params['PageNumber'] = page-1;
    }

    if (pageSize) {
      params['PageSize'] = pageSize;
    }

    return params;
  }


  handlePageChange(event) {
    this.page = event;
    this.getItems();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getItems();
  }

  fnExport() {
    this.ExcelServ.exportToFile('Items', 'Tbl');
  }

  fnImport() {
    this.ExcelServ.exportToFile('Items', 'Tbl');
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    var obj = {  ItemName: 'b',  ItemNameE: 'c', ItemBarCode: 'c', ItemSalePrice: 'c' , UnitId: 'c', GroupId: 'c' };
     //const header: string[] = Object.getOwnPropertyNames(new SalesSaleInv());
      const header: string[] = Object.getOwnPropertyNames(obj);
      console.log(header);

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.ExcelServ.importFromFile(bstr);



      const importedData = data.slice(1, -1);

      this.ItemsList = importedData.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return <Item>obj;
      })

    };
    reader.readAsBinaryString(target.files[0]);

  }

}
