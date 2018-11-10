import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

items:any;
id:any;
itemdesc:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
this.id=this.navParams.get("id");
  this.itemdesc=this.navParams.get("item");
  	this.items=this.navParams.get("items");
  }

  ionViewDidLoad() {
   
  console.log(this.items);

  console.log(this.itemdesc);
  }

}
