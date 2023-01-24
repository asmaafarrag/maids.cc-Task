import { Component, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-i18n-lang',
  templateUrl: './i18n-lang.component.html',
  styleUrls: ['./i18n-lang.component.css']
})
export class I18nLangComponent implements OnInit {

  // Lang = 'ar';
  // constructor(public translate: TranslateService) {
  //   translate.addLangs(['en', 'ar']);
  //   translate.setDefaultLang('ar');

  //   const browserLang = translate.getBrowserLang();
  //   translate.use(browserLang.match(/en|ar/) ? browserLang : 'ar');
  // }

  ngOnInit(){}
//   changeLang(lang) {
//     this.translate.use(lang);
//     this.Lang = lang;
//   }

//   useLanguage(language) {
//     this.translate.use(language).toPromise()
//  }

}
