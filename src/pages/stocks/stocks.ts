import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PostitemPage} from '../postitem/postitem';
import{BasicproviderProvider} from '../../providers/basicprovider/basicprovider';
import {Storage} from '@ionic/storage';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';


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
url:String;
isadmin:boolean;
stockdata:any;
filteredstockdata:any;
categories:any;
    id:any;
	category:any;
	description:any;
	quantity:any;
	bp:any;
	sp:any;
	discount:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public http:Http, public provider:BasicproviderProvider) {
  	this.http=http;
  	this.url=this.provider.url;
  	this.isadmin=false;
//lets get the  passed parameters


  	
  }

  ionViewDidLoad() {
    //first get the usertype to determine what user sees
this.storage.get('utype').then((val)=>{
	this.settype(val);
});
//lets fetch the categories
this.fetchcategories();
//lets fetch stock
this.fetchstock();

   
  }
fetchstock(){
	var headers=new Headers();
	headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
this.http.get(this.url+'fetchstock',{headers:headers})
.map(res=>res.json())
.subscribe(data=>{
this.stockdata=data.data;
//console.log(this.stockdata);
this.filteredstockdata=this.stockdata;
},
err=>{console.log(err)},
()=>{});}

 post(){
 	//navigate to a page  help post a new item
 	this.navCtrl.push(PostitemPage);
  	}

  settype(type){
  	//set admin boolean to determine what buttons to be shown
if(type=='Admin'||type=='admin'){
this.isadmin=true;
  }	
  else {
this.isadmin=false;
  }
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


filteritems(cat){
	this.filteredstockdata=[];
	//lets iterate through the stock datato get for selected category
var i=0;

for(i=0;i<=(this.stockdata.length-1);i++){

if(this.stockdata[i].Category==cat){
	//category matches lets create a new array
	this.filteredstockdata.push({
'Id':this.stockdata[i].Id ,
'Category':this.stockdata[i].Category ,
'ItemDesc':this.stockdata[i].ItemDesc ,
'Quantity':this.stockdata[i].Quantity ,
'Image':this.stockdata[i].Image ,
'BuyingPrice':this.stockdata[i].BuyingPrice ,
'SellingPrice':this.stockdata[i].SellingPrice ,
'MaxDiscount':this.stockdata[i].MaxDiscount ,

	});
}}
}

getclicked(id,event){
	//get the clicked item to know what to do
	
var j=0;
for(j=0;j<=(this.filteredstockdata.length);j++){
	console.log(filteredstockdata[j].Id);


	/*if(this.filteredstockdata[j].Id==id){

		// the id matches the clicked one
	this.id=this.filteredstockdata[j].Id;
	this.category=this.filteredstockdata[j].Category;
	this.description=this.filteredstockdata[j].ItemDesc;
	this.quantity=this.filteredstockdata[j].Quantity;
	this.bp=this.filteredstockdata[j].BuyingPrice;
	this.sp=this.filteredstockdata[j].SellingPrice;
	this.discount=this.filteredstockdata[j].MaxDiscount;	
	}
*/}

if(event=='delete'){
this.delete();
}
else if(event=='sell'){
this.sale();
}
else if(event=='order'){
this.order();
}else if(event=='to_order'){
this.to_order();
}

}
delete(){
console.log('delete'+this.description);
}
sale(){
	console.log('sell'+this.description);
}
order(){
	console.log('ordered'+this.description);
}
to_order(){
console.log('to order'+this.description);
}

}
