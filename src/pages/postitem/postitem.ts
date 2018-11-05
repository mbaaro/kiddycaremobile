import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import {CreatecategoryPage } from '../createcategory/createcategory';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {BasicproviderProvider} from '../../providers/basicprovider/basicprovider';

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
  url:String;
  categories:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public provider:BasicproviderProvider,public http:Http) {
  	this.http=http;
    this.url=provider.url;
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
   this.fetchcategories();
  }
 postnew(){
  //we post a new stock item
  var value=this.myform.value
  var headers=new Headers();
  let body=JSON.stringify({
    category:value.category,
    description:value.description,
    quantity:value.quantity,
    buyingp:value.buyingP,
    sellingp:value.sellingP,
    maxdiscount:value.maxdiscount
 });
  this.http.post(this.url+'newstock',body,{headers:headers})
  .subscribe( 
    err=>{},
    ()=>{});


 }
 fetchcategories(){
var headers=new Headers();
  headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8' );
  //fetch the categories saved
this.http.get(this.url+'fetchcategories',{headers:headers})
.map(res=>res.json())
  .subscribe(data=>{
this.categories=data.data;

  },
  err=>{
//console.log(err);
  },
 ()=>{} ); }

  newcategory(){
this.navCtrl.push(CreatecategoryPage);
  }


}