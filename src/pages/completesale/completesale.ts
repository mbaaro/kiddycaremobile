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

getchangequantity(change,id){
  const prompt=this.alertCtrl.create({
    title:'Add By',
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
  	for(i=0;i<=(this.provider.saleitems.length-1);i++){
      //iterating through  the sales items 
      if(this.provider.saleitems[i].id==id){
        //change the quantity and total amount in the local array
         this.provider.saleitems[i].quantity=(Number(this.provider.saleitems[i].quantity)+Number(changedquantity));
         this.provider.saleitems[i].total= ((this.provider.saleitems[i].quantity)*(this.provider.saleitems[i].price));
         //change the total amount
         this.provider.cartamount=((changedquantity*this.provider.saleitems[i].price)+this.provider.cartamount);

//lets change on the remote 
this.http.get(this.url+'reducestock&quantity='+changedquantity+'&itemid='+id+'&uname='+this.provider.uname,{headers:headers})
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
    console.log( this.provider.saleitems[i].quantity);
  	//we want to reduce some item on the order
for(i=0;i<=(this.provider.saleitems.length-1);i++){
  if(this.provider.saleitems[i].id==id &&(this.provider.saleitems[i].quantity<changedquantity)){
    alert("Reduce by a number equal or less to this selection");
  }
      //iterating through  the sales items but make sure you are not subtracting more than in the array 
     else if(this.provider.saleitems[i].id==id &&(this.provider.saleitems[i].quantity==changedquantity||this.provider.saleitems[i].quantity>changedquantity)){
        //change the quantity and total amount in the local array
           this.provider.saleitems[i].quantity=(Number(this.provider.saleitems[i].quantity)-Number(changedquantity));
          this.provider.saleitems[i].total= ((this.provider.saleitems[i].quantity)*(this.provider.saleitems[i].price));
         //change the total amount
         this.provider.cartamount=(Number(this.provider.cartamount)-(changedquantity*this.provider.saleitems[i].price));

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
	// we want to delete an item previously selected for sale
	var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    var i=0;
     	//iterate the array to get the record
  	//get sum and quantity and subtract from the total values and add the item quantity on the db;    	//remove item from array
 for(i=0;i<=(this.provider.saleitems.length-1);i++){
if(this.provider.saleitems[i].id==id){
	//we have matched the id lets get the item name and change the total amount and the quantity
this.provider.cartamount=(this.provider.cartamount-this.provider.saleitems[i].total);
this.provider.cartnumber=(this.provider.cartnumber-1);
returnedqty=this.provider.saleitems[i].quantity;
//remove record from array
//this.provider.saleitems.pop([i]);
this.provider.saleitems.splice(i,1);
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


getpaymentmethod(){
	// get the method of payment used
 let alert=this.alertCtrl.create();
 alert.setTitle("Select Payment method");
 alert.addInput({
  type:'radio',
  label:'Cash',
  value:'Cash',
  checked: false
 });
 alert.addInput({
  type:'radio',
  label:'Mpesa',
  value:'Mpesa',
  checked: false
 });
 alert.addInput({
  type:'radio',
  label:'Cheque',
  value:'Cheque',
  checked: false
 });
 alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.completesale(data);
      }
    });
    alert.present();
}
completesale(data){
  //lets complete this sale now
  let body=JSON.stringify({
    method:data,
    user:this.provider.uname,
    saleitems:this.provider.saleitems
  });
 //let us post the data
  var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    this.http.post(this.url+"completesale",body,{headers:headers}).subscribe(data=>{
      this.provider.saleitems=[];
//clear the cart values for sales
this.clearcart();
    });
}
clearcart(){
  //reducing the cart figures without changing those for orders
  var j=0;
  for(j=0;j<=this.provider.saleitems.length-1;j++){

    this.provider.cartamount=(this.provider.cartamount-this.provider.saleitems[i].total);
this.provider.cartnumber=(this.provider.cartnumber-1);
this.provider.saleitems.pop();
  }
  this.issale=false;
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
		//lets send the array to the database for reversal
		let body=JSON.stringify({
			data:this.provider.saleitems,
			});
		var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    this.http.post(this.url+"cleararray",body,{headers:headers}).subscribe(data=>{
    this.provider.saleitems=[];
          this.saleitems=[];		
    });
	
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
