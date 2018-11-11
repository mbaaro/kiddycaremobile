import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators } from '@angular/forms';

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
categories:any;
myform:FormGroup;
	category:String;
	description:any;
	quantity:Number;
	buyingP:Number;
	sellingP:Number;
	maxdiscount:Number;
	image:any;
  url:String;
  categories:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {
  
this.id=this.navParams.get("id");
  this.itemdesc=this.navParams.get("item");
  	this.items=this.navParams.get("items");
  	this.categories=this.navParams.get("categories");
// form validation rules
  	 this.myform=formBuilder.group({
  		category:['',Validators.required],
  		description:['hhdhdhh',Validators.required],
  		quantity:['',Validators.required],
  		buyingP:['',Validators.required],
  		sellingP:['',Validators.required],
  		maxdiscount:['',Validators.required]/*,
  		image:['']*/
  	});
  }

  ionViewDidLoad() {
   this.parsearray();
  }

  parsearray(){
  	//lets parse through the array passed so as to get the clicked item
  	var value=this.myform.value;
	var i=0;
	for(i=0;i<=(this.items.length-1);i++){

if(this.items[i].id=this.id){
//if we have reached the item id clicked by the user
this.category=this.items[i].category;
this.description=this.items[i].itemdesc;
this.quantity=this.items[i].quantity;
this.buyingP=this.items[i].buyingp;
this.sellingP=this.items[i].sellingp;
this.maxdiscount=this.items[i].maxdiscount;/**/
}}
 }

sendupdate(){
	

}
}
