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
  this.cartnumber=this.provider.cartnumber;
  this.cartamount=this.provider.cartamount;
  this.type=this.navParams.get('type');
  this.saleitems=this.provider.saleitems;
  this.orderitems=this.provider.orderitems;
  this.issale=false;
  this.isorder=false;
  this.http=http;
  this.url=this.provider.url;

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
  if(this.type=='sale'){
     for(i=0;i<=(this.provider.saleitems.length-1);i++){
      //iterating through  the sales items 
      if(this.provider.saleitems[i].id==id){
        //change the quantity and total amount in the local array
         this.provider.saleitems[i].quantity=(this.provider.saleitems[i].quantity-changedquantity);
         this.provider.saleitems[i].total= ((this.provider.saleitems[i].quantity)*(this.provider.price));
         //change the total amount
         this.provider.cartamount=((changedquantity*this.provider.price)+this.provider.cartamount);

//lets change on the remote 
this.http.get(this.url+'reducestock&quantity'+changedquantity+'&itemid='+id,{headers:headers})
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
    else if(this.type='orders'){

    }
 

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
