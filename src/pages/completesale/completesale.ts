import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BasicproviderProvider} from '../../providers/basicprovider/basicprovider';

/**
 * Generated class for the CompletesalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completesale',
  templateUrl: 'completesale.html',
})
export class CompletesalePage {
	cartamount:any;
	cartnumber:any;
	saleitems:any;
	orderitems:any;
	type:any;
	issale:boolean;
	isorder:boolean;
	items:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public provider:BasicproviderProvider) {
  this.cartnumber=this.navParams.get('cartnumber');
  this.cartamount=this.navParams.get('cartamount');
  this.type=this.navParams.get('type');
  this.saleitems=this.provider.saleitems;
  this.orderitems=this.provider.orderitems;
  this.issale=false;
  this.isorder=false;
  }

  ionViewDidLoad() {
this.determinetype();

  }

  determinetype(){

  	//determining if we are going to display the order list or the sales list  depending on what the user has selected
if(this.type='sale'){
this.items=this.saleitems;
this.issale=true;
  }
  else if(this.type='order'){
this.items=this.orderitems;
this.isorder=true;
  }

}

add(){
	console.log("add");
}
reduce(){
console.log("reduce");
}
remove(){
console.log("remove");
}
getpaymentmethod(){
	// get the method of payment
}



}
/*
remove item from list
add item quantity
reduce item quantity

remove/add from local array
remove/add to remote db


*/
