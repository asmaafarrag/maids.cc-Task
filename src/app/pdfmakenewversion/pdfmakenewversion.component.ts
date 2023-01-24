import { strGnuMICR } from './../GnuMICR.ttf.Base64.encoded';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Currency } from './../shared/Models/currency';
import { ServStockService } from './../shared/Services/serv-stock.service';
import { SalesSaleInv, SalesSaleInvDet } from './../shared/Models/sales-sale-inv';
import { Item } from './../shared/Models/item';
import { Customer } from './../shared/Models/customer.model';

import { SalesSaleInvService } from './../shared/Services/sales-sale-inv.service'
import { ToastrService } from 'ngx-toastr';

import { DomSanitizer } from '@angular/platform-browser';


// import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins } from 'pdfmake/interfaces';

const pdfMake = require('pdfmake/build/pdfmake.js');

import { Alignment } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { Branch } from 'src/app/shared/Models/branch';
import { BranchService } from 'src/app/shared/Services/branch.service';
import { Treasury } from 'src/app/shared/Models/treasury';
import { TreasuryService } from 'src/app/shared/Services/treasury.service';
import { Store } from 'src/app/shared/Models/Store';
import { CurrencyService } from 'src/app/shared/Services/currency.service';

@Component({
  selector: 'app-pdfmakenewversion',
  templateUrl: './pdfmakenewversion.component.html',
  styleUrls: ['./pdfmakenewversion.component.css']
})
export class PdfmakenewversionComponent implements OnInit {


  ngOnInit(){

    pdfFonts.pdfMake.vfs['GnuMICR_b64'] = strGnuMICR;
  }

  logo =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAABjCAYAAAD5Lc5bAAAACXBIWXMAAC4jAAAuIwF4pT92AAAGYmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAyLTA3VDE3OjEyOjQ1KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMi0wN1QxNzoyNDo0MiswNTozMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMi0wN1QxNzoyNDo0MiswNTozMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMWNiM2VhMS1lMDNmLWYwNGYtODgxNS1lODEwNjMzZmNkZmYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODU0MGIxMi0yODU5LWM1NDYtYmU4NS1hMDZiNTM2OTVlMzciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4ZTRmNWE3Ny0zYjk2LWQ5NDItOGZhMi05YzkyYjA3YTM1MTYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjhlNGY1YTc3LTNiOTYtZDk0Mi04ZmEyLTljOTJiMDdhMzUxNiIgc3RFdnQ6d2hlbj0iMjAyMC0wMi0wN1QxNzoxMjo0NSswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjExY2IzZWExLWUwM2YtZjA0Zi04ODE1LWU4MTA2MzNmY2RmZiIgc3RFdnQ6d2hlbj0iMjAyMC0wMi0wN1QxNzoyNDo0MiswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv+dJcQAACLkSURBVHic7Z17nB1Vle+/VXXep/PoB3k1JBAI74QEwvsRBkFxRhnudZwLjuOoqJfxMvCZB15HZ9R56DhX751Rh3HUUWfEUcBRGQRBA0oUEZRXIIgQIEAgr06TdLo7/Tjn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"



  tableLayout = {
    hLineWidth: function(i, node) {
      return i === 0 || i === node.table.body.length ? 0 : 0.5;
    },
    vLineWidth: function(i, node) {
      return i === 0 || i === node.table.widths.length ? 0 : 0;
    },
    hLineColor: function(i, node) {
      return i === 0 || i === node.table.body.length ? "#999" : "#999";
    },
    paddingLeft: function(i, node) {
      return i === 0 ? 0 : 20;
    },
    paddingRight: function(i, node) {
      return i === node.table.widths.length ? 20 : 0;
    }
  };

  docDefinition = {
    pageSize: "A4",
    content: [
      {
        columns: [
          {
            margin: [0, 0, 50, 0] as Margins,
            stack: [
              {
                image: this.logo,
                width: 150,
                style: "logo"
              },
              {
                margin: [0, 0, 0, 10],
                columns: [
                  {
                    width: 45,
                    style: "strong",
                    text: " مرجع طلب الشراء"
                  },
                  {
                    width: "auto",
                    margin: [0, 0, 5, 0],
                    text: ":"
                  },
                  {
                    width: "*",
                    text: "4.38"
                  }
                ]
              },
              {
                margin: [0, 0, 0, 10] as Margins,
                columns: [
                  {
                    width: 45,
                    style: "strong",
                    text: "وصف طلب الشراء "
                  },
                  {
                    width: "auto",
                    margin: [0, 0, 5, 0],
                    text: ":"
                  },
                  {
                    width: "*",
                    text:"4.38"
                  }
                ]
              },
              {
                margin: [0, 0, 0, 10] as Margins,
                columns: [
                  {
                    width: 45,
                    style: "strong",
                    text: " مرجع طلب المبيعات"
                  },
                  {
                    width: "auto",
                    margin: [0, 0, 5, 0] as Margins,
                    text: ":"
                  },
                  {
                    width: "*",
                    text: "4.38"
                  }
                ]
              },
              {
                columns: [
                  {
                    width: 45,
                    style: "strong",
                    text: " وصف طلب المبيعات "
                  },
                  {
                    width: "auto",
                    margin: [0, 0, 5, 0] as Margins,
                    text: ":"
                  },
                  {
                    width: "*",
                    text:"4.38"
                  }
                ]
              }
            ]
          },

          {
            width: 180,
            stack: [
              // { text: "Sales Order", style: "header" },
              {
                table: {
                  widths: ["*", "auto"],
                  heights: 30,
                  body: [
                    [
                      { text: "رقم الفاتورة", style: ["td2", "strong"] },
                      {
                        text: "4.38",
                        alignment: "right",
                        style: "td2"
                      }
                    ],
                    [
                      { text: " التاريخ", style: ["td2", "strong"] },
                      {
                        text: "4.38",
                        alignment: "right",
                        style: "td2"
                      }
                    ],
                    [
                      { text: "العميل", style: ["td2", "strong"] },
                      {
                        text: "4.38",
                        alignment: "right",
                        style: "td2"
                      }
                    ]
                  ]
                },
                layout: this.tableLayout
              }
            ]
          }
        ],
        style: "address"
      },
      // {
      //   table: {
      //     widths: ["auto", "auto", "*", "auto", "auto", "auto"],
      //     heights: 40,
      //     // body: this.body()
      //   },
      //   layout: this.tableLayout
      // },
      "\n",
      {
        columns: [
          {},
          {
            table: {
              headerRows: 0,
              widths: "*",
              body: [
                [
                  { text: "إجمالي الفاتورة", style: ["td2", "strong"] },
                  {
                    text: "4.38",
                    alignment: "right",
                    style: "td2"
                  }
                ],
                [
                  { text: "خصم", style: ["td2", "strong"] },
                  { text:"4.38", alignment: "right", style: "td2" }
                ],
                [
                  { text: "الضرائب المضافة", style: ["td2", "strong"] },
                  { text: "4.38", alignment: "right", style: "td2" }
                ],
                [
                  { text: "الضرائب المضافة", style: ["td2", "strong"] },
                  { text: "4.38", alignment: "right", style: "td2" }
                ],
                [
                  { text: " صافي الفاتورة", style: ["td2", "strong"] },
                  {
                    text: "4.38",
                    alignment: "right",
                    style: ["td2", "strong"]
                  }
                ]
              ]
            },
            layout: this.tableLayout
          }
        ]
      }
    ],
    footer: {
      text: [
        "Powered by ",
        { text: " : www.MiniCodeCo.com ", style: "strong" },
        " ",
        // { text: "Phone : ", style: "strong" },
        // "+1 650-468-290"
      ],
      alignment: "center"
    },
    styles: {
      header: {
        fontSize: 20,
        color: "#000",
        alignment: "right",
        margin: [0, 0, 0, 0] as Margins
      },
      subheader: {
        fontSize: 16,
        color: "#000",
        margin: [0, 0, 0, 5] as Margins
      },
      strong: {
        bold: true,
        color: "#333"
      },
      logo: {
        margin: [0, 0, 0, 30] as Margins
      },
      // thumb: {
      //   margin: [0, 5, 0, 0]
      // },
      th: {
        fontSize: 10,
        bold: true,
        color: "#333",
        margin: [0, 20, 0, 0] as Margins
      },
      td: {
        margin: [0, 14, 0, 0] as Margins
      },
      td2: {
        margin: [0, 9, 0, 0] as Margins
      },
      address: {
        margin: [0, 0, 0, 10] as Margins
      }
    },
    defaultStyle: {
      fontSize: 12,
      lineHeight: 1.5,
      color: "#676767"
    }
  };


  trimmer(str) {
    return str.replace(/\n/g, " ");
  }

  // body() {
  //   let body = [];

  //   this.servSaleInv.formData.saleInvItems.forEach((item, i) => {
  //     let dataRow = [];
  //     if (i > 0) {
  //       // dataRow.push({ image: this.thumb, style: "thumb", width: 30 });
  //       dataRow.push({
  //         text: this.cap((item.ItemName + "-" + item.ItemNO).toString()),
  //         style: "td"
  //       });
  //       dataRow.push({ text: 13, style: "td" });
  //       dataRow.push({ text:14, style: "td" });
  //       dataRow.push({ text: 15, style: "td" });
  //       dataRow.push({ text: 16, style: "td" });
  //       dataRow.push({ text: 17, style: "td" });
  //       dataRow.push({ text: 18, style: "td" });
  //       dataRow.push({ text: 19, style: "td", alignment: "right" });
  //       dataRow.push({ text: 20, style: "td" });

  //     } else {
  //       dataRow.push({ text: "ItemName", style: "th" });
  //       dataRow.push({ text: "UnitName", style: "th" });
  //       dataRow.push({ text: "Qty", style: "th" });
  //       dataRow.push({ text: "Price", style: "th" });
  //       dataRow.push({ text: "Tot", style: "th" });
  //       dataRow.push({ text: "DetTaxSal", style: "th" });
  //       dataRow.push({ text: "DetTaxGainCom", style: "th" });
  //       dataRow.push({ text: "DISC", style: "th" });
  //       dataRow.push({ text: "DetItemDescription", style: "th", alignment: "right" });
  //     }

  //     body.push(dataRow);
  //   });

  //   return body;
  // }

  print() {
    pdfMake.createPdf(this.docDefinition).open();
  }
  cap(str){
    return str.replace(/\b\w/g, l => l.toUpperCase())
  }




}
