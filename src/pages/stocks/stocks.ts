import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {PostitemPage} from '../postitem/postitem';
import {CompletesalePage} from '../completesale/completesale';
import {CompleteorderPage} from '../completeorder/completeorder';
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
	quantity_to_sell:any;
	price_to_sell:any;
	cartamount:any
	cartnumber:any;
	iscart:boolean;
	isorder:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public http:Http, public provider:BasicproviderProvider,public alertCtr:AlertController) {
  	this.http=http;
  	this.url=this.provider.url;
  	this.isadmin=false;
  	this.cartamount=0;
  	this.cartnumber=0;
  	this.iscart=false;
  	this.isorder=false;
   }

  ionViewDidLoad() {
    //first get the usertype to determine what user sees
this.storage.get('utype').then((val)=>{
	this.settype(val);
});
this.cartnumber=this.provider.cartnumber;
this.cartamount=this.provider.cartamount;
//lets fetch the categories
this.fetchcategories();
//lets fetch stock
this.fetchstock();
//first check if there is a pending/ incomplete sale/order
this.checkcurrentsales();


   
  }
						fetchstock(){
							var headers=new Headers();
							headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
						this.http.get(this.url+'fetchstock',{headers:headers})
						.map(res=>res.json())
						.subscribe(data=>{
						this.stockdata=data.data;
						//console.log(this.stockdata);
						this.provider.filteredstockdata=this.stockdata;
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
							this.provider.filteredstockdata=[];
							//lets iterate through the stock datato get for selected category
						var i=0;

						for(i=0;i<=(this.stockdata.length-1);i++){

						if(this.stockdata[i].Category==cat){
							//category matches lets create a new array
							this.provider.filteredstockdata.push({
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
for(j=0;j<=(this.provider.filteredstockdata.length-1);j++){
	if(this.provider.filteredstockdata[j].Id==id){
		// the id matches the clicked one
	this.id=this.provider.filteredstockdata[j].Id;
	this.category=this.provider.filteredstockdata[j].Category;
	this.description=this.provider.filteredstockdata[j].ItemDesc;
	this.quantity=this.provider.filteredstockdata[j].Quantity;
	this.bp=this.provider.filteredstockdata[j].BuyingPrice;
	this.sp=this.provider.filteredstockdata[j].SellingPrice;
	this.discount=this.provider.filteredstockdata[j].MaxDiscount;	
	}
}

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
	//get the quantity to sell and the price
	const prompt=this.alertCtr.create({
title:'Quantity and price',
message: 'Enter Quantity to sell and unit price for one',
inputs:[
{name:'quantity_to_sell',placeholder:'Quantity'},
{name:'Unit_price', placeholder:'unit price'},
],
buttons:[
{
          text: 'Cancel ',
          handler: data => {
           // console.log('Cancel clicked');
          }
        },
        {
          text: 'Done',
          handler: data => {
          	this.process_sale(data.quantity_to_sell,data.Unit_price,'sale');

             }
        },
],

	});

	prompt.present();
}

								order(){
									//if a customer has made an order for some item

								//get the quantity to sell and the price
									const prompt=this.alertCtr.create({
								title:'Quantity and price',
								message: 'Order Details',
								inputs:[

								{name:'quantity_to_sell',placeholder:'Quantity'},
								{name:'Unit_price', placeholder:'unit price'},
																],
								buttons:[
								{
								          text: 'Cancel ',
								          handler: data => {
								           // console.log('Cancel clicked');
								          }
								        },
								        {
								          text: 'Done',
								          handler: data => {
								          	this.process_sale(data.quantity_to_sell,data.Unit_price,'order');
								             }
								        },
								],

									});

									prompt.present();
								}
process_sale(quantity1,unit_price,type){
	
	//sales logic after getting all the data we need
if(unit_price<(this.sp-this.discount)){
	//trying to sell below minium discount
	alert("sorry, You can not give more than the allowed discount for  "+this.description);
}
		else if(quantity1>this.quantity){
			//trying to sell more than is in stock
			alert("You can not sell more than is  in stock");
		}
else if(quantity1<=(this.quantity)){
//lets proceed with the sale
//calculate the total amount
var remaining=0;
var total=(quantity1*unit_price);
	var headers=new Headers();
//push into the sales araay in the provider

//insert into sales
//show the fab buttons to complete sale/order
		if(type=='sale'){
		this.iscart=true;
		this.provider.saleitems.push({
			'id':this.id,
			'item':this.description,
			'quantity':quantity1,
			'price':unit_price,
			'total':total,
			'seller':this.provider.uname,

		});
		//update cart
		this.cartnumber=(this.cartnumber+1);
		this.cartamount=(this.cartamount+total);
		//reduce stock //local quantity

this.provider.cartamount=this.cartamount;
this.provider.cartnumber=this.cartnumber;
//lets change the quantity in the filtered list in the provider
		var j=0;
		for(j=0;j<=(this.provider.filteredstockdata.length-1);j++){
			if(this.provider.filteredstockdata[j].Id==this.id){
		this.provider.filteredstockdata[j].Quantity=(this.provider.filteredstockdata[j].Quantity-quantity1);
		remaining=this.provider.filteredstockdata[j].Quantity;

			}}
		//reduce stock  on remote db
	
			headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
		this.http.get(this.url+'reducestock&itemid='+this.id+'&quantity='+quantity1+'&uname='+this.provider.uname+'&type=sale',{headers:headers})
		.map(res=>res.json())
		.subscribe(data=>{
		alert(data);
		},
		err=>{console.log(err)},
		()=>{});

		}
else if(type=='order'){
	this.isorder=true;
		this.provider.orderitems.push({
			'id':this.id,
			'item':this.description,
			'quantity':quantity1,
			'price':unit_price,
			'total':total,
			'seller':this.provider.uname,

		});
		//update cart
		this.cartnumber=(this.cartnumber+1);
		this.cartamount=(this.cartamount+total);
		//reduce stock //local quantity

this.provider.cartamount=this.cartamount;
this.provider.cartnumber=this.cartnumber;
//lets change the quantity in the filtered list in the provider
		var j=0;
		for(j=0;j<=(this.provider.filteredstockdata.length-1);j++){
			if(this.provider.filteredstockdata[j].Id==this.id){
		this.provider.filteredstockdata[j].Quantity=(this.provider.filteredstockdata[j].Quantity-quantity1);
		remaining=this.provider.filteredstockdata[j].Quantity;

			}}
		//reduce stock  on remote db
	
			headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
		this.http.get(this.url+'reducestock&itemid='+this.id+'&quantity='+quantity1+'&uname='+this.provider.uname+'&type=order',{headers:headers})
		.map(res=>res.json())
		.subscribe(data=>{
		alert(data);
		},
		err=>{console.log(err)},
		()=>{});
}

}

}
									completesale(){
										//go to page to complete sale or complete order
										this.navCtrl.push(CompletesalePage,
											{cartnumber:this.cartnumber,cartamount:this.cartamount});
									}
completeorder(){
	//go to page to complete sale or complete order
	this.navCtrl.push(CompleteorderPage,
		{cartnumber:this.cartnumber,cartamount:this.cartamount});
}

									to_order(){
									console.log('to order'+this.description);
									}

checkcurrentsales(){
	//lets first check if there are existing sales or orders
	//if exist but its a new customer, they should b cleared at the complete sales page.
	if(this.provider.saleitems.length>0){
this.iscart=true;

	}
	else if(this.provider.orderitems.length>0){
this.isorder=true;
	}
	else{
	this.iscart=false;
	this.isorder=false;	
	}
}									

}


/* create a table tempstock  `id``itemid``quantity`
on sale insert items into tempstock ,
on sale complete truncate tble, empty local variable
on sale cancel, remove from temp table to stock
on app log on check if this local variable is populated
*/
