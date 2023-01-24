import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../shared/Services/user.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

import { DOCUMENT } from '@angular/common';
declare const require;
@Component({
  selector: 'app-nav-bar-header',
  templateUrl: './nav-bar-header.component.html',
  styleUrls: ['./nav-bar-header.component.css']
})
export class NavBarHeaderComponent implements OnInit {


  //
  constructor(private router: Router, public userService: UserService ,
    @Inject(DOCUMENT) private document: Document) { }

  // Type: any = '';
  // TypeName:any = '';
  // currentLanguage:any =''
  User:any = '';
  // languages = ["en", "ar"];
  // selectedLang = this.languages[0];
  RegistrationNumber:string='';

 ngOnInit(){


  // this.currentLanguage = (localStorage.getItem('lang')) || 'en';
  // this.translate.use(this.currentLanguage);
  // console.log(this.currentLanguage  , ' this.currentLanguag1111111111')
  // if (this.currentLanguage === 'en') {
  // require('style-loader!../../assets/app-assets/css/app.css');
  // } else {
  // require('style-loader!../../assets/app-assets/css-rtl/app.css');
  // }
  //  this.Type = localStorage.getItem('selectedType')

  // this.setLanguage(this.tr.locale);

  interval(10000).subscribe(x => {
    this.User = localStorage.getItem('userName')
    this.RegistrationNumber = localStorage.getItem('RegistrationNumber')

  });
  //  this.Type = sessionStorage.getItem('selectedType')
   this.User = localStorage.getItem('userName')
   this.RegistrationNumber = localStorage.getItem('RegistrationNumber')

   console.log( this.User , " this.User")

  // //  this.TypeName= '';
  // //  this.Type = '';
  // //  sessionStorage.removeItem('selectedType');
  //  this.Check(this.Type)
 }

//  setLanguage(lang) {
//   let translation = require(`../../assets/i18n/${lang}.json`);
//   console.log(translation , 'translation')
//   this.tr.setTranslationObject(translation);

//   this.tr.setLanguage(lang);
//   }


//   useLanguage1() {

//     let ar :any = this.translate.use('ar')

//     localStorage.setItem('lang', 'ar' )



//     this.translate.onLangChange.subscribe((event: LangChangeEvent) =>{
//       console.log(event.lang , "event.lang")
//         // this.classDir = event.lang === 'en' ? 'ltr':'';
//         // this.atterDir = event.lang === 'en' ? 'ltr':'';

//         const head = this.document.getElementsByTagName('head')[0];

//         let themeLink = this.document.getElementById(
//           'client-theme'
//         ) as HTMLLinkElement;
//         let clientthemeappLink = this.document.getElementById(
//           'client-theme-app'
//         ) as HTMLLinkElement;
//         let verticalmenu = this.document.getElementById(
//           'vertical-menu'
//         ) as HTMLLinkElement;
//         let bootstrapextended = this.document.getElementById(
//           'bootstrap-extended'
//         ) as HTMLLinkElement;
//         let  verticaloverlaymenu = this.document.getElementById(
//           ' vertical-overlay-menu'
//         ) as HTMLLinkElement;
//         let   palettegradient = this.document.getElementById(
//         ' palette-gradient'
//         ) as HTMLLinkElement;
//         let   bootstrap = this.document.getElementById(
//           ' bootstrap'
//           ) as HTMLLinkElement;

//         if (themeLink) {

//           if (event.lang == 'ar'){

//             themeLink.href = "././assets/app-assets/css-rtl/custom-rtl.css";
//             clientthemeappLink.href = "././assets/app-assets/css-rtl/app.css";
//             verticalmenu.href = "././assets/app-assets/css-rtl/core/menu/menu-types/vertical-menu.css";
//             bootstrapextended.href ="././assets/app-assets/css-rtl/bootstrap-extended.css";
//             verticaloverlaymenu.href="././assets/app-assets/css-rtl/core/menu/menu-types/vertical-overlay-menu.css";
//             palettegradient.href ="././assets/app-assets/css-rtl/core/colors/palette-gradient.css";
//             bootstrap.href = "././assets/app-assets/css-rtl/bootstrap.css";

//           }

//           else if(event.lang == 'en')
//           {
//           // themeLink.href = "././assets/app-assets/css/custom.css";
//           clientthemeappLink.href = "././assets/app-assets/css/app.css";
//           verticalmenu.href = "././assets/app-assets/css/core/menu/menu-types/vertical-menu.css";
//           bootstrapextended.href ="././assets/app-assets/css/bootstrap-extended.css";
//           verticaloverlaymenu.href="././assets/app-assets/css/core/menu/menu-types/vertical-overlay-menu.css";
//           palettegradient.href ="././assets/app-assets/css/core/colors/palette-gradient.css";
//           bootstrap.href = "././assets/app-assets/css/bootstrap.css";

//           }
//         }
//         console.log(bootstrap.href)

//   });


// }




// useLanguage() {

//  let en :any = this.translate.use('en')

//  localStorage.setItem('lang', 'en' )
//   // console.log(en ,"en")

//   // localStorage.setItem('lang', 'en' )

//   this.translate.onLangChange.subscribe((event: LangChangeEvent) =>{
//     console.log(event.lang , "event.lang")
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
//         if(event.lang === 'en')
//         {
//          themeLink.href = "././assets/app-assets/css/custom.css";
//          clientthemeappLink.href = "././assets/app-assets/css/app.css";
//          verticalmenu.href = "././assets/app-assets/css/core/menu/menu-types/vertical-menu.css";
//          bootstrapextended.href ="././assets/app-assets/css/bootstrap-extended.css";
//          verticaloverlaymenu.href="././assets/app-assets/css/core/menu/menu-types/vertical-overlay-menu.css";
//          palettegradient.href ="././assets/app-assets/css/core/colors/palette-gradient.css";
//          bootstrap.href = "././assets/app-assets/css/bootstrap.css";

//         }
//         else if (event.lang === 'ar'){
//           themeLink.href = "././assets/app-assets/css-rtl/custom-rtl.css";
//           clientthemeappLink.href = "././assets/app-assets/css-rtl/app.css";
//           verticalmenu.href = "././assets/app-assets/css-rtl/core/menu/menu-types/vertical-menu.css";
//           bootstrapextended.href ="././assets/app-assets/css-rtl/bootstrap-extended.css";
//           verticaloverlaymenu.href="././assets/app-assets/css-rtl/core/menu/menu-types/vertical-overlay-menu.css";
//           palettegradient.href ="././assets/app-assets/css-rtl/core/colors/palette-gradient.css";
//           bootstrap.href = "././assets/app-assets/css-rtl/bootstrap.css";


//         }
//       }
//       console.log(bootstrap.href)

// });

//   this.translate.use(language).toPromise()
//   this.currentLanguage = language;
//   console.log( this.currentLanguage , ' this.currentLanguag')
//     if (this.currentLanguage === 'en') {
//       require('style-loader!../../assets/app-assets/css/app.css');
//     }
//     else {
//       require('style-loader!../../assets/app-assets/css/app.css');
//     }
//  }




//  Check(Type:any){
//    if(Type == 'PRE'){
//     this.TypeName = 'التجريبي'
//    }

//    else if(Type == 'PROD'){
//      this.TypeName = "الفعلي"
//    }

//    else{
//     this.TypeName = " الرجاءإختيار النظام  "
//     sessionStorage.removeItem('selectedType');
//    }

//  }

  logOut() {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('selectedType');
    localStorage.removeItem('selectedType')
    localStorage.removeItem('userName');
    localStorage.removeItem('lang');
    this.router.navigate(['/Login']);

  }

}
