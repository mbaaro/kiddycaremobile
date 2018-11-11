import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PostitemPage} from '../postitem/postitem';


/**
 * Generated class for the StocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html',
})
export class StocksPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
//lets get the  passed parameters
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StocksPage');
   
  }
 post(){
 	this.navCtrl.push(PostitemPage);
  	}

}
