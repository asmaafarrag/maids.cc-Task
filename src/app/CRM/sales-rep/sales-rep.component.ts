// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Chart } from "chart.js";
// import { Emps } from 'src/app/shared/Models/emps';
// import { CRMClientsService } from 'src/app/shared/Services/crm-clients.service';
// import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';


// @Component({
//   selector: 'app-sales-rep',
//   templateUrl: './sales-rep.component.html',
//   styleUrls: ['./sales-rep.component.css']
// })
// export class SalesRepComponent implements OnInit {

//   constructor( public EmpService: VacOrdersService , public service: CRMClientsService,) { }
//   Empslist: Emps[];
//   CurrentEmpId: number;
//   EmpID:number 

//   public chart: Chart;

//   resetForm(form?: NgForm) {
//     if (form != null)
//       form.form.reset();
//     this.service.formData = {
//       ClientID: 0,
//       ClientName: '',
//       ClientMobile: '',
//       ProjectID: null,
//       ProjectName: '',
//       CreationDate: new Date(),
//       StageID: 2,
//       StageName: '',
//       ChannelName: '',
//       ChannelID: null,
//       LastComment: '',
//       EmpID: this.CurrentEmpId,
//       NextActionDate: null,
//       LastActionDate: null,
//       EmpName: '',
//       ClientPhone: '',
//       ClientAddress: '',
//       ClientCity: '',
//       ClientCityState: '',
//       ClientWebSite: '',
//       ClientWorkField:'',
//       ContactPerson: '',
//       ContactPersonJob: '',
//       ContactPersonMobile: '',
//       ContactPersonEmail:''
//     }

//   }
//   ngOnInit() {

//     this.EmpService.getEmps().subscribe(res => this.Empslist = res);

//     this.chart = new Chart("canvas", {
//       type: "bar",
      
//       data: {
//         labels: ["عدد العملاء", "تم التواصل ", "مطلوب للمتابعة", "مطلوب للزيارة", "الغاء", "Orange"],
//         datasets: [
//           {
//             label: "تقرير المندوب",
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(54, 162, 235, 0.2)",
//               "rgba(255, 206, 86, 0.2)",
//               "rgba(75, 192, 192, 0.2)",
//               "rgba(153, 102, 255, 0.2)",
//               "rgba(255, 159, 64, 0.2)"
//             ],
//             borderColor: [
//               "rgba(255, 99, 132, 1)",
//               "rgba(54, 162, 235, 1)",
//               "rgba(255, 206, 86, 1)",
//               "rgba(75, 192, 192, 1)",
//               "rgba(153, 102, 255, 1)",
//               "rgba(255, 159, 64, 1)"
//             ],
//             borderWidth: 1,
//             datalabels:{
//               color:'blue',
//               anchor:'end',
//               align:'top',
//               offset:5

//             }
//           }
//         ]
//       },
//       // Plugins:[ChartDataLabels],
//       options: {
//         responsive: true,
//         hover: {
//           animationDuration: 1
//         },
//         scales: {
//           yAxes: [
//             {
//               ticks: {
//                 beginAtZero: true,

//               }
//             }
//           ]
//         },

//         plugins: {
//           datalabels: {
//             anchor: 'end',
//             align: 'top',
//             formatter: Math.round,
//             font: {
//               weight: 'bold'
//             }
//           }
//         }
        
//       }
//     });
//   }

// }
