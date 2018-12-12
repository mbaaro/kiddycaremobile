import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {BasicproviderProvider} from '../../providers/basicprovider/basicprovider';
import {Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the CompleteorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completeorder',
  templateUrl: 'completeorder.html',
})
export class CompleteorderPage {
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
   this.issale=false;
  this.isorder=false;
  this.http=http;
  this.url=this.provider.url;

   }

  ionViewDidLoad() {
  this.items=this.provider.orderitems;
this.isorder=true;
this.cartnumber=this.provider.cartnumber;
  this.cartamount=this.provider.cartamount;
 
  }

  getchangequantity(change,id){
  const prompt=this.alertCtrl.create({
    title:'Alter By',
    message:'Please enter the quantity to add / reduce',
    inputs:[{
      name:'added',placeholder:'number to add or reduce'}],
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
  	for(i=0;i<=(this.provider.orderitems.length-1);i++){
      //iterating through  the orders items 
      if(this.provider.orderitems[i].id==id){
        //change the quantity and total amount in the local array
         this.provider.orderitems[i].quantity=(Number(this.provider.orderitems[i].quantity)+Number(changedquantity));
         this.provider.orderitems[i].total= ((this.provider.orderitems[i].quantity)*(this.provider.orderitems[i].price));
         //change the total amount
         this.provider.cartamount=((changedquantity*this.provider.orderitems[i].price)+this.provider.cartamount);

//lets change on the remote 
this.http.get(this.url+'reducestock&quantity='+changedquantity+'&itemid='+id+'&uname='+this.provider.uname+'&type=order',{headers:headers})
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
    console.log( this.provider.orderitems[i].quantity);
  	//we want to reduce some item on the order
for(i=0;i<=(this.provider.orderitems.length-1);i++){
  if(this.provider.orderitems[i].id==id &&(this.provider.orderitems[i].quantity<changedquantity)){
    alert("Reduce by a number equal or less to this selection");
  }
      //iterating through  the orders items but make sure you are not subtracting more than in the array 
     else if(this.provider.orderitems[i].id==id &&(this.provider.orderitems[i].quantity==changedquantity||this.provider.orderitems[i].quantity>changedquantity)){
        //change the quantity and total amount in the local array
           this.provider.orderitems[i].quantity=(Number(this.provider.orderitems[i].quantity)-Number(changedquantity));
          this.provider.orderitems[i].total= ((this.provider.orderitems[i].quantity)*(this.provider.orderitems[i].price));
         //change the total amount
         this.provider.cartamount=(Number(this.provider.cartamount)-(changedquantity*this.provider.orderitems[i].price));

//lets change on the remote 
this.http.get(this.url+'addstock&quantity='+changedquantity+'&itemid='+id+'&uname='+this.provider.uname,{headers:headers})
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
	// we want to delete an item previously selected for order
	var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    var i=0;
  	var returnedqty=0;
  	//we want to remove some item from the ordr completely ;  	//iterate the array to get the record
  	//get sum and quantity and subtract from the total values and add the item quantity on the db;    	//remove item from array
 for(i=0;i<=(this.provider.orderitems.length-1);i++){
if(this.provider.orderitems[i].id==id){
	//we have matched the id lets get the item name and change the total amount and the quantity
this.provider.cartamount=(this.provider.cartamount-this.provider.orderitems[i].total);
this.provider.cartnumber=(this.provider.cartnumber-1);
returnedqty=this.provider.orderitems[i].quantity;
//remove record from array
//this.provider.orderitems.pop([i]);
this.provider.orderitems.splice(i,1);
//update the db
this.http.get(this.url+'addstock&quantity='+returnedqty+'&itemid='+id+'&uname='+this.provider.uname,{headers:headers})
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
completeorders(customer,notes,phone){
  //lets complete this order now
  let body=JSON.stringify({
   customer:customer,
   notes:notes,
    user:this.provider.uname,
    orderitems:this.provider.orderitems,
    phone:phone
  });
 //let us post the data
  var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    this.http.post(this.url+"completeorder",body,{headers:headers}).subscribe(data=>{
      this.provider.orderitems=[];
//clear the cart values for orders
this.clearcart();
    });
}
clearcart(){
  //reducing the cart figures without changing those for orders
  var j=0;
  for(j=0;j<=this.provider.orderitems.length-1;j++){

    this.provider.cartamount=(this.provider.cartamount-this.provider.orderitems[j].total);
this.provider.cartnumber=(this.provider.cartnumber-1);
this.provider.orderitems.pop();
  }
  this.isorder=false;
}


getcustomer(){
	// get the method of payment
	let prompt=this.alertCtrl.create({
		title:'Order Details',
		message:'Enter the details of this order',
		inputs:[
{name:'customer',placeholder:'Customer name'},
{name:'phone',placeholder:'Phone number'},
{	name:'notes',	placeholder:'Order notes to remember'}
		],
		buttons:[{
text:'OK',
handler:data=>{
this.completeorders(data.customer,data.notes,data.phone);
}	},
		{text:'Cancel',handler:data=>{}}
		]});
	prompt.present();
}

cleararray(type){
  

//if there exists items selected for order and user selects to clear them, lets do that

let confirm=this.alertCtrl.create({
	title:'Alert',
	message:'Are you sure you wish to clear all items you have selected for order?',
	buttons:[
{text:'Cancel',
handler:data=>{},
},{
	text:'Clear',
	handler:data=>{
		//lets send the array to the database for reversal
		let body=JSON.stringify({
      uname:this.provider.uname,
      type:'order',
			data:this.provider.orderitems,
			});
		var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    this.http.post(this.url+"cleararray",body,{headers:headers}).subscribe(data=>{
    this.provider.orderitems=[];
          this.orderitems=[];		
    });
	
	}
}
	]

});
confirm.present();

}
 

}
