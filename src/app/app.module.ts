import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import{HttpModule} from'@angular/http';
import {IonicStorageModule} from '@ionic/storage';
import {Toast} from '@ionic-native/toast';

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
import {StartPage} from '../pages/start/start';
import {UpdateStockPage} from '../pages/update-stock/update-stock';
import{UpdatePage} from '../pages/update/update';
import {CompletesalePage} from '../pages/completesale/completesale';
/**/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BasicproviderProvider } from '../providers/basicprovider/basicprovider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,OrdersPage,PassresetPage,PostitemPage,SellitemPage,ViewitemPage,StocksPage,CreatecategoryPage,StartPage,UpdateStockPage,UpdatePage,CompletesalePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,OrdersPage,PassresetPage,PostitemPage,SellitemPage,ViewitemPage,StocksPage,CreatecategoryPage,StartPage,UpdateStockPage,UpdatePage,CompletesalePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BasicproviderProvider,Toast
  ]
})
export class AppModule {}
