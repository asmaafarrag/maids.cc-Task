import { InvoiceExcelComponent } from './invoice-excel/invoice-excel.component';
import { PriceListOtherItemComponent } from './Sales/price-list-OtherItem/price-list-OtherItem.component';
import { PriceListAddOnItemComponent } from './Sales/price-list-AddOnItem/price-list-addonitem.component';
import { GetPriceListAddOnsViewModel } from './shared/Models/price-lists';
import { PriceListViewComponent } from './Sales/price-list-view/price-list-view.component';
import { PriceListItemComponent } from './Sales/price-list-item/price-list-item.component';
import { PriceListComponent } from './Sales/price-list/price-list.component';
import { ChangeItemPriceComponent } from './Sales/change-item-price/change-item-price.component';
import { WaitSubComponent } from './EI-Documents/wait-sub/wait-sub.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
// import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgPipesModule } from 'ngx-pipes';

import { RepStockComponent } from './rep-stock/rep-stock.component';

import { ServStockService } from '../app/shared/Services/serv-stock.service'
import { UserService } from './shared/Services/user.service';

import { SearchPipe } from './search.pip';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RepSellingDetComponent } from './rep-selling-det/rep-selling-det.component';
import { HChartBarComponent } from './home/h-chart-bar/h-chart-bar.component';
import { HChartPieComponent } from './home/h-chart-pie/h-chart-pie.component';
import { HChartLineComponent } from './home/h-chart-line/h-chart-line.component';
import { NavBarHeaderComponent } from './nav-bar-header/nav-bar-header.component';
import { RepIncomeStatmentComponent } from './rep-income-statment/rep-income-statment.component';
import { RepAccStatementComponent } from './rep-acc-statement/rep-acc-statement.component';
import { ItemsComponent } from './Sales/items/items.component';
import { CustomersComponent } from './Sales/customers/customers.component';
import { CustomersViewComponent } from './Sales/customers-view/customers-view.component';
import { RepItemCardViewComponent } from './rep-item-card-view/rep-item-card-view.component';
import { ItemsViewComponent } from './Sales/items-view/items-view.component';

import { ItemViewComponent } from './EI-Codes/item-view/item-view.component';
import { ItemComponent } from './EI-Codes/item/item.component';
import { CustomerViewComponent } from './EI-Codes/customer-view/customer-view.component';
import { CustomerComponent } from './EI-Codes/customer/customer.component';
import { DebitNoteViewComponent } from './EI-Documents/debit-note-view/debit-note-view.component';
import { DebitNoteComponent } from './EI-Documents/debit-note/debit-note.component';
import { DebitComponent } from './EI-Documents/debit/debit.component';
// code-mirror
// import 'codemirror/lib/codemirror';
// import 'codemirror/addon/hint/show-hint';
// import 'codemirror/addon/hint/sql-hint';
// import 'codemirror/mode/sql/sql';
// import 'codemirror/mode/vb/vb';

// import * as CodeMirror from 'codemirror';
// const codemirror = 'CodeMirror';
// window[codemirror] = CodeMirror;

import {MatStepperModule} from '@angular/material/stepper'

// import { GridAllModule } from '@syncfusion/ej2-angular-grids';
// import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
// import { TabModule } from '@syncfusion/ej2-angular-navigations';
// import { CalendarAllModule } from '@syncfusion/ej2-angular-calendars';
// import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
// import { ComboBoxAllModule } from '@syncfusion/ej2-angular-dropdowns';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs'
import {MatExpansionModule} from '@angular/material/expansion';
///////////////////// QR CODE //////////////////
// import { QRCodeModule } from 'angularx-qrcode';
import { EnterprisesComponent } from './EI-Codes/enterprises/enterprises.component';
import { EnterprisesViewComponent } from './EI-Codes/enterprises-view/enterprises-view.component';
import { AcceptedInvComponent } from './Ei-Documents/accepted-inv/accepted-inv.component';
import { RejectedInvComponent } from './Ei-Documents/rejected-inv/rejected-inv.component';

// import { PdfViewerModule, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
  // ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService } from '@syncfusion/ej2-angular-pdfviewer';
import { AllInvoiceComponent } from './EI-Documents/all-invoice/all-invoice.component';
import { NotificationComponent } from './EI-Documents/notification/notification.component';
// import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { UnsubmitteSellingsRetComponent } from './EI-Documents/unsubmitte-sellings-ret/unsubmitte-sellings-ret.component';
import { PopuploginComponent } from './EI-Documents/popuplogin/popuplogin.component';
import { TestComponent } from './test/test.component';
import { DocumentByTypeComponent } from './EI-Documents/document-by-type/document-by-type.component';
import { DocumentDetailsComponent } from './EI-Documents/document-details/document-details.component';
import { DialogComponent } from './EI-Documents/dialog/dialog.component';
import { StatusForSellingsComponent } from './EI-Documents/status-for-sellings/status-for-sellings.component';
import { ItemLineComponent } from './Sales/item-line/item-line.component';
import { ImportItemsComponent } from './sales/import-items/import-items.component';
import { I18nLangComponent } from './i18n-lang/i18n-lang.component';
// import { TranslatorModule } from '@ferhado/translator';
import { ImportCustomerComponent } from './sales/import-customer/import-customer.component';

import { PdfmakenewversionComponent } from './pdfmakenewversion/pdfmakenewversion.component';
// import {AngularPivotTableModule} from 'angular-pivot-table';
import { ContractsComponent } from './Sales/contracts/contracts.component';
import { ContractsViewComponent } from './Sales/contracts-view/contracts-view.component';
import { UserComponent } from './Sales/user/user.component';
import { UserViewComponent } from './Sales/user-view/user-view.component';
import { UserReportsComponent } from './Sales/user-reports/user-reports.component';
import { PriceListReportsComponent } from './Sales/price-list-reports/price-list-reports.component';
// import { PdfviewComponent } from './sales/pdfview/pdfview.component';
// import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
// import { ContractPdfComponent } from './sales/contract-pdf/contract-pdf.component';
// import { ItemInputComponent } from './sales/item-input/item-input.component';

@NgModule({
  declarations: [
    AppComponent,
    RepStockComponent,
    SearchPipe,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    RepSellingDetComponent,
    HChartBarComponent,
    HChartPieComponent,
    HChartLineComponent,
    NavBarHeaderComponent,
    RepIncomeStatmentComponent,
    RepAccStatementComponent,
    ItemsComponent,
    CustomersComponent,
    CustomersViewComponent,
    RepItemCardViewComponent,
    ItemsViewComponent,
    ItemViewComponent,
    ItemComponent,
    CustomerViewComponent,
    CustomerComponent,
    DebitNoteViewComponent,
    DebitNoteComponent,
    DebitComponent,
    EnterprisesComponent,
    EnterprisesViewComponent,
    AcceptedInvComponent,
    RejectedInvComponent,
    AllInvoiceComponent,
    NotificationComponent,
    UnsubmitteSellingsRetComponent,
    PopuploginComponent,
    TestComponent,
    DocumentByTypeComponent,
    DocumentDetailsComponent,
    DialogComponent,
    StatusForSellingsComponent,
    ItemLineComponent,
    ImportItemsComponent,
    I18nLangComponent,
    ImportCustomerComponent,
    WaitSubComponent,
    PdfmakenewversionComponent,
    ChangeItemPriceComponent,
    PriceListComponent,
    PriceListItemComponent,
    PriceListViewComponent,
    ContractsComponent,
    ContractsViewComponent,
    // PdfviewComponent,
    PriceListAddOnItemComponent,
    PriceListOtherItemComponent,
    // ContractPdfComponent,
    // ItemInputComponent,
    InvoiceExcelComponent,
    UserComponent,
    UserViewComponent,
    UserReportsComponent,
    PriceListReportsComponent

  ],
  imports: [
    BrowserModule, NgxPaginationModule,  NgPipesModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatNativeDateModule, MatFormFieldModule,MatAutocompleteModule,MatInputModule,MatPaginatorModule,MatDialogModule,
    Ng2SearchPipeModule ,
    ToastrModule.forRoot(), // ToastrModule added
    // QRCodeModule,
    // PdfViewerModule,
    MatStepperModule,
    // GridAllModule,
    // DialogAllModule,
    // CalendarAllModule,
    // ComboBoxAllModule,
    // TabModule,
    // NumericTextBoxAllModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    // use this if you want to use native javascript dates and INTL API if available
    // MatNativeDatetimeModule,

    // MatDatetimepickerModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    // AngularPivotTableModule,
    // PdfJsViewerModule,

    // TranslateModule.forRoot({
    //   defaultLanguage:'ar',
    //   loader:{
    //     provide: TranslateLoader,
    //     useFactory:createTran,
    //     deps:[HttpClient]
    //   }
    // }),

    // TranslatorModule.forRoot({
    //   allowedLocales: ["ar", "en"],
    //   defaultLocale: "ar"
    // }),


  ],
  // entryComponents:[SaleInvItemsComponent],
  providers: [MatDatepickerModule,MatPaginatorModule,ServStockService,UserService,DatePipe, AuthGuard ,


    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// export function createTran(http:HttpClient){
//   return new TranslateHttpLoader(http , './assets/i18n/', '.json')
// }
