import { Component, VERSION ,ViewChild ,ElementRef , OnInit} from '@angular/core';
import jspdf from 'jspdf';

/*
https://www.eduforbetterment.com/
*/

export class CsvData {
  public id: any;
  public min: any;
  public max: any;
  public score: any;
}

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {



  name = 'Angular ' + VERSION.major;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  @ViewChild('htmlData', {static: false}) htmlData:ElementRef;
  jsondatadisplay:any;

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
//csvRecordsArray.length
    for (let i = 1; i < 30; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.min = curruntRecord[1].trim();
        csvRecord.max = curruntRecord[2].trim();
        csvRecord.score = curruntRecord[3].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }


  ngOnInit(){}
//check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.jsondatadisplay = '';
  }

  getJsonData(){
    this.jsondatadisplay = JSON.stringify(this.records);
  }

  openPDF(){
    let DATA = this.htmlData.nativeElement;
    let doc = new jspdf('p','pt', 'a4');
   
   // doc.output('dataurlnewwindow');
   doc.setProperties({
       title: "new Report"
  });
   doc.fromHTML(DATA.innerHTML,30 ,30);
  //doc.output('dataurlnewwindow');
   window.open(URL.createObjectURL(doc.output("blob")))

  }

  downloadPDF(){
    let DATA = this.htmlData.nativeElement;
    let doc = new jspdf('p','pt', 'a4');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('csvpdf.pdf');
  }


}