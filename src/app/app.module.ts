import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import{HttpModule} from'@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {OrdersPage} from '../pages/orders/orders';
import {PassresetPage} from '../pages/passreset/passreset';
import {PostitemPage} from '../pages/postitem/postitem';
import {SellitemPage} from '../pages/sellitem/sellitem';
import {StocksPage} from '../pages/stocks/stocks';
import {ViewitemPage} from '../pages/viewitem/viewitem';
import {CreatecategoryPage}from '../pages/createcategory/createcategory';
/**/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,OrdersPage,PassresetPage,PostitemPage,SellitemPage,ViewitemPage,StocksPage,CreatecategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,OrdersPage,PassresetPage,PostitemPage,SellitemPage,ViewitemPage,StocksPage,CreatecategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
