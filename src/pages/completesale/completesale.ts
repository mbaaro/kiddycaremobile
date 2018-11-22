import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {BasicproviderProvider} from '../../providers/basicprovider/basicprovider';
import {Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';


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
  url:any;
  unitprice:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public provider:BasicproviderProvider,public http:Http,public alertCtrl:AlertController) {
  
  //this.type=this.navParams.get('type');
  
  this.issale=false;
  this.isorder=false;
  this.http=http;
  this.url=this.provider.url;

  }

  ionViewDidLoad() {
this.items=this.provider.saleitems;
this.issale=true;
this.cartnumber=this.provider.cartnumber;
  this.cartamount=this.provider.cartamount;
 
}

 /* determinetype(){

  	//determining if we are going to display the order list or the sales list  depending on what the user has selected
if(this.type='sale'){

  }
  else if(this.type='order'){
this.items=this.provider.orderitems;
this.isorder=true;
  }

}*/

getchangequantity(change,id){
  const prompt=this.alertCtrl.create({
    title:'Add By',
    message:'Please enter the quantity to add',
    inputs:[{
      name:'added',placeholder:'number to add'}],
    buttons:[{
      text:'cancel',
      handler:data=>{}
    },
    {text:'Add',
handler:data=>{
 this.effectchange(data.added,id,change);
}
  }],

  });
  prompt.present();
}

effectchange(changedquantity,id,change){
  var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
  //take what has been entered and make right decisions on amounts
  //iterate through the sold items array
  var i=0;
 
  	//if its an aadition to the order
  	if(change=='add'){
  	for(i=0;i<=(this.provider.saleitems.length-1);i++){
      //iterating through  the sales items 
      if(this.provider.saleitems[i].id==id){
        //change the quantity and total amount in the local array
         this.provider.saleitems[i].quantity=(this.provider.saleitems[i].quantity-changedquantity);
         this.provider.saleitems[i].total= ((this.provider.saleitems[i].quantity)*(this.provider.saleitems[i].price));
         //change the total amount
         this.provider.cartamount=((changedquantity*this.provider.saleitems[i].price)+this.provider.cartamount);

//lets change on the remote 
this.http.get(this.url+'reducestock&quantity='+changedquantity+'&itemid='+id,{headers:headers})
.map(res=>res.json())
.subscribe(data=>{
  console.log(data);
},
err=>{
  console.log(err);
});
      }  } 	
  	}
  else if(change=='reduce'){
  	//we want to reduce some item on the order
for(i=0;i<=(this.provider.saleitems.length-1);i++){
      //iterating through  the sales items 
      if(this.provider.saleitems[i].id==id){
        //change the quantity and total amount in the local array
         this.provider.saleitems[i].quantity=(this.provider.saleitems[i].quantity+changedquantity);
         this.provider.saleitems[i].total= ((this.provider.saleitems[i].quantity)*(this.provider.saleitems[i].price));
         //change the total amount
         this.provider.cartamount=((changedquantity*this.provider.saleitems[i].price)-this.provider.cartamount);

//lets change on the remote 
this.http.get(this.url+'addstock&quantity='+changedquantity+'&itemid='+id,{headers:headers})
.map(res=>res.json())
.subscribe(data=>{
  console.log(data);
},
err=>{
  console.log(err);
});
      }  } 	
  }	
     
   
}
deleteitem(id){
	// we want to delete an item previously selected for sale
	var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    var i=0;
  	var returnedqty=0;
  	//we want to remove some item from the ordr completely ;  	//iterate the array to get the record
  	//get sum and quantity and subtract from the total values and add the item quantity on the db;    	//remove item from array
 for(i=0;i<=(this.provider.saleitems.length-1);i++){
if(this.provider.saleitems[i].id==id){
	//we have matched the id lets get the item name and change the total amount and the quantity
this.provider.cartamount=(this.provider.cartamount-this.provider.saleitems[i].total);
this.provider.cartnumber=(this.provider.cartnumber-1);
returnedqty=this.provider.saleitems[i].quantity;
//remove record from array
//this.provider.saleitems.pop([i]);
this.provider.saleitems.slice(i);
//update the db
this.http.get(this.url+'addstock&quantity='+returnedqty+'&itemid='+id,{headers:headers})
.map(res=>res.json())
.subscribe(data=>{
  console.log(data);
},
err=>{
  console.log(err);
});

}
 

  }
   
}



getpaymentmethod(){
	// get the method of payment
}

cleararray(type){
  

//if there exists items selected for sale and user selects to clear them, lets do that

let confirm=this.alertCtrl.create({
	title:'Alert',
	message:'Are you sure you wish to clear all items you have selected for sale?',
	buttons:[
{text:'Cancel',
handler:data=>{},
},{
	text:'Clear',
	handler:data=>{
	this.provider.saleitems=[];
          this.saleitems=[];	
	}
}
	]

});
confirm.present();

}
 





}
/*
check if existing list of sales or orders if exists, have option to clear or continue

*/
