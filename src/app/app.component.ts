import { Component, Inject , LOCALE_ID} from '@angular/core';
import { interval } from 'rxjs';
import { DOCUMENT } from '@angular/common';
// import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Capital-ERP';
  classDir: string = '';
  atterDir: string = '';





  constructor(@Inject(DOCUMENT) private document: Document  , public router :Router ){
    // translate.setDefaultLang('ar');
    // translate.use('ar')
    // localStorage.setItem('lang', 'ar' )


    // setInterval(() => {
    //   this.Type = sessionStorage.getItem('selectedType')
    //   this.Check(this.Type)
    // }, 1000);





  }

  // ngAfterViewInit() {

  //   // const firstTime = localStorage.getItem('key')
  //   // if(!firstTime){
  //   // localStorage.setItem('key','loaded')
  //   // location.reload()
  //   // }
  //   // else {
  //   //   localStorage.removeItem('key')
  //   // }

  //   // this.ngOnInit()


  //   let userToken = localStorage.getItem('userToken')


  //   if(userToken != null){
  //         const firstTime = localStorage.getItem('key')
  //     if(!firstTime){
  //       localStorage.setItem('key','loaded')
  //       location.reload()
  //     }
  //     else {
  //       localStorage.removeItem('key')
  //     }

  //   }
  // }

  // ngOnInit(): void {
    // const firstTime = localStorage.getItem('key')
    // if(!firstTime){
    // localStorage.setItem('key','loaded')
    // location.reload()
    // }
    // else {
    //   localStorage.removeItem('key')
    // }


    // this.translate.setDefaultLang('ar');
    // this.translate.use('ar')
    // localStorage.setItem('lang', 'ar' )
    // this.lang = localStorage.getItem('lang');






    // interval(10000).subscribe(x => {
    //   this.Type = sessionStorage.getItem('selectedType')

    //   this.Check(this.Type);

    // });

  //   this.translate.setDefaultLang('ar');
  //   this.translate.use('ar');
  //   localStorage.setItem('lang', 'ar' )



  //   this.translate.onLangChange.subscribe((event: LangChangeEvent) =>{
  //     console.log(event.lang , "event.lang11")
  //       // this.classDir = event.lang === 'en' ? 'ltr':'';
  //       // this.atterDir = event.lang === 'en' ? 'ltr':'';

  //       const head = this.document.getElementsByTagName('head')[0];

  //       let themeLink = this.document.getElementById(
  //         'client-theme'
  //       ) as HTMLLinkElement;
  //       let clientthemeappLink = this.document.getElementById(
  //         'client-theme-app'
  //       ) as HTMLLinkElement;
  //       let verticalmenu = this.document.getElementById(
  //         'vertical-menu'
  //       ) as HTMLLinkElement;
  //       let bootstrapextended = this.document.getElementById(
  //         'bootstrap-extended'
  //       ) as HTMLLinkElement;
  //       let  verticaloverlaymenu = this.document.getElementById(
  //         ' vertical-overlay-menu'
  //       ) as HTMLLinkElement;
  //       let   palettegradient = this.document.getElementById(
  //       ' palette-gradient'
  //       ) as HTMLLinkElement;
  //       let   bootstrap = this.document.getElementById(
  //         ' bootstrap'
  //         ) as HTMLLinkElement;

  //       if (themeLink) {



  //          if (event.lang == 'ar'){
  //           this.translate.use('ar')

  //           localStorage.setItem('lang', 'ar' )


  //           themeLink.href = "././assets/app-assets/css-rtl/custom-rtl.css";
  //           clientthemeappLink.href = "././assets/app-assets/css-rtl/app.css";
  //           verticalmenu.href = "././assets/app-assets/css-rtl/core/menu/menu-types/vertical-menu.css";
  //           bootstrapextended.href ="././assets/app-assets/css-rtl/bootstrap-extended.css";
  //           verticaloverlaymenu.href="././assets/app-assets/css-rtl/core/menu/menu-types/vertical-overlay-menu.css";
  //           palettegradient.href ="././assets/app-assets/css-rtl/core/colors/palette-gradient.css";
  //           bootstrap.href = "././assets/app-assets/css-rtl/bootstrap.css";


  //         }

  //         else if(event.lang == 'en')
  //         {
  //           this.translate.use('en')

  //           localStorage.setItem('lang', 'en' )

  //         //  themeLink.href = "././assets/app-assets/css/custom.css";
  //          clientthemeappLink.href = "././assets/app-assets/css/app.css";
  //          verticalmenu.href = "././assets/app-assets/css/core/menu/menu-types/vertical-menu.css";
  //          bootstrapextended.href ="././assets/app-assets/css/bootstrap-extended.css";
  //          verticaloverlaymenu.href="././assets/app-assets/css/core/menu/menu-types/vertical-overlay-menu.css";
  //          palettegradient.href ="././assets/app-assets/css/core/colors/palette-gradient.css";
  //          bootstrap.href = "././assets/app-assets/css/bootstrap.css";

  //         }
  //         // else if (event.lang == 'ar'){
  //         //   this.translate.use('ar')

  //         //   localStorage.setItem('lang', 'ar' )


  //         //   themeLink.href = "././assets/app-assets/css-rtl/custom-rtl.css";
  //         //   clientthemeappLink.href = "././assets/app-assets/css-rtl/app.css";
  //         //   verticalmenu.href = "././assets/app-assets/css-rtl/core/menu/menu-types/vertical-menu.css";
  //         //   bootstrapextended.href ="././assets/app-assets/css-rtl/bootstrap-extended.css";
  //         //   verticaloverlaymenu.href="././assets/app-assets/css-rtl/core/menu/menu-types/vertical-overlay-menu.css";
  //         //   palettegradient.href ="././assets/app-assets/css-rtl/core/colors/palette-gradient.css";
  //         //   bootstrap.href = "././assets/app-assets/css-rtl/bootstrap.css";


  //         // }
  //       }
  //       console.log(themeLink.href)

  // });
  // }


  //  constructor(@Inject(DOCUMENT) private document: Document,
  //           @Inject(LOCALE_ID) private locale: string){
  // //   // setInterval(() => {
  // //   //   // get data from LS
  // //   //   // this.Type = sessionStorage.getItem('selectedType')
  // //   //   // this.Check(this.Type)
  // //   // }, 1000);
  // this.lang = this.locale.split('-')[0];
  // console.log(  this.lang , '  this.lang')
  // }


 ngOnInit(){

//   // if (this.lang === 'en') {
//   //   this.document.documentElement.lang = 'en';
//   //   this.document.documentElement.dir = 'ltr';

    }

//   this.currentLanguage = (localStorage.getItem('lang')) || 'en';
//   console.log( this.currentLanguage , ' this.currentLanguagAAPPP')
//   if (this.currentLanguage === 'en') {
//     require('style-loader!../assets/app-assets/css/app.css');
//   }
//   else {
//     require('style-loader!../assets/app-assets/css-rtl/app.css');
//   }


      //in 10 seconds do something
    // interval(10000).subscribe(x => {
    //   this.Type = sessionStorage.getItem('selectedType')

    //   this.Check(this.Type);
    // });



//   //  this.Type = localStorage.getItem('selectedType')
//    this.Type = sessionStorage.getItem('selectedType')
//   //  this.TypeName= '';
//   //  this.Type = '';
//   //  sessionStorage.removeItem('selectedType');
//    this.Check(this.Type)
//  }

//  Check(Type:any){



//    if(Type == 'PRE'){
//     this.TypeName = 'النظام التجريبي'
//    }

//    else if(Type == 'PROD'){
//      this.TypeName = "النظام الفعلي"
//    }

  //  else{

  //   this.Type = sessionStorage.setItem('selectedType' , 'PRE')

  //   // this.TypeName = "  النظام التجريبي (Defualt) ";

  //   // sessionStorage.removeItem('selectedType');
  //  }

//  }

}
