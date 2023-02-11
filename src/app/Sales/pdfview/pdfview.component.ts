import { Component, OnInit } from '@angular/core';
// import { GcPdfViewer } from '@grapecity/gcpdfviewer';
import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';

@Component({
  selector: 'app-pdfview',
  templateUrl: './pdfview.component.html',
  styleUrls: ['./pdfview.component.css']
})
export class PdfviewComponent implements OnInit {

  constructor() { }

  pdfSource

  ngOnInit(): void {
  //   const viewer = new GcPdfViewer("#viewer", {
  //     workerSrc: "../../../node_modules/@grapecity/gcpdfviewer/gcpdfviewer.worker.js",
  //     restoreViewStateOnLoad: false
  //   });
  //   viewer.addDefaultPanels();
  //   viewer.open("../../assets/app-assets/images/pdf1.pdf");


  this.pdfSource = "../../assets/app-assets/images/pdf1.pdf";
  }

  testBeforePrint() {
	console.log("testBeforePrint() successfully called");
  }
  testAfterPrint() {
    console.log("testAfterPrint() successfully called");
  }
  testPagesLoaded(count: number) {
    console.log("testPagesLoaded() successfully called. Total pages # : " + count);
  }

}
