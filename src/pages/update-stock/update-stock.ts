import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map/';
import {BasicproviderProvider} from '../../providers/basicprovider/basicprovider';
import {Toast} from '@ionic-native/toast';
import {Platform } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {StocksPage} from '../stocks/stocks';
import {UpdatePage} from '../update/update';


/**
 * Generated class for the UpdateStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-stock',
  templateUrl: 'update-stock.html',
})
export class UpdateStockPage {
	url:String;
	categories:any;
	items:any;
  itemsfiltered:any;
  length:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public provider:BasicproviderProvider,public http:Http,public alertCtrl:AlertController,public toast:Toast,public platform:Platform) {
  	this.http=http;
  	this.url=provider.url;

  }

  ionViewDidLoad() {
  	//fetch items to be displayed
   this.fetchitems();
   //display message to user
   this.showtoast();

  }
  

  fetchitems(){
//lets fetch all the items
var headers=new Headers();
headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
this.http.get(this.url+'getall',{headers:headers})
.map(res=>res.json())
.subscribe(data=>{
this.categories=data.categories;
this.items=data.items;
this.length=this.items.length; 
this.itemsfiltered=this.items;
},
err=>{
console.log(err);
},
()=>{}
);

  }
   showtoast(){

   	/*this.platform.ready().then(()=>
   	//show a toast indicating how to change stock
   	this.toast.show('To Change stock, please swipe left on the subject item','5000','center').subscribe(
   		toast=>{

   		}
   	));*/
   	   	if(this.platform.is('cordova')){
   	//show a toast indicating how to change stock
   	this.toast.show('To Change stock, please swipe left on the subject item','5000','center').subscribe(
   		toast=>{

   		}
   	);
   	}
   	
   }

 

  getitems(cat){
    //first clear the array
this.itemsfiltered=[];
//we will get the current array and filter with the selected category
this.length=this.items.length;
var i=0;

var length1=this.length;
for(i=0;i<=length1;i++){
  if(i<length1){//avoiding the last index which is a null
if(cat==this.items[i].category){//check if the category for each item is that clicked
 this.itemsfiltered.push({
 	'id':this.items[i].id,
  'category':this.items[i].category,
'itemdesc':this.items[i].itemdesc,
'quantity':this.items[i].quantity,
'maxdiscount':this.items[i].maxdiscount,
'buyingp':this.items[i].buyingp,
'sellingp':this.items[i].sellingp,
});
}}

}
//console.log(this.itemsfiltered);
i=0;

}

deletestock(id,item){
//lets confirm that we want to delete this item
const confirm=this.alertCtrl.create({
  title:'Confirm Deletion',
  message:' Are you sure you want to delete stock for '+item +' ?',
  buttons:[{
    text:'Proceed',
    handler:()=>{
//lets send the delete request
var headers=new Headers();
headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
this.http.get(this.url+'deletestock&&stockid='+id,{headers:headers}).map(
  res=>res.json())
.subscribe(data=>{
  //lets refresh the list displayed now
this.fetchitems();
  },
err=>{
  console.log(err)
}
  );

    }
  },
  {
    text:'Abort',
    handler:()=>{
      
    }
  }
  ]
});
confirm.present();
}
updatestock(id,item){
//console.log(id);
//lets pass parameters to 
this.navCtrl.push(UpdatePage,{id:id,items:this.itemsfiltered,item:item}); /*id:id,items:itemsfiltered,item:item*/

}

}
