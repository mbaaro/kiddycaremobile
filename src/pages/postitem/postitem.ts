import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';

/**
 * Generated class for the PostitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postitem',
  templateUrl: 'postitem.html',
})
export class PostitemPage {
	myform:FormGroup;
	category:String;
	description:any;
	quantity:Number;
	buyingP:Number;
	sellingP:Number;
	maxdiscount:Number;
	image:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {
  	this.myform=formBuilder.group({
  		category:['',Validators.required],
  		description:['',Validators.required],
  		quantity:['',Validators.required],
  		buyingP:['',Validators.required],
  		sellingP:['',Validators.required],
  		maxdiscount:['',Validators.required]/*,
  		image:['']*/
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostitemPage');
  }

}
