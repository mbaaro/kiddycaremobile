import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map/';
import {BasicproviderProvider} from '../../providers/basicprovider/basicprovider';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public provider:BasicproviderProvider,public http:Http) {
  	this.http=http;
  	this.url=provider.url;
  }

  ionViewDidLoad() {
   this.fetchitems();
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
  'category':this.items[i].category,
'itemdesc':this.items[i].itemdesc,
'quantity':this.items[i].quantity,
'maxdiscount':this.items[i].maxdiscount,
'buyingp':this.items[i].buyingp,
'sellingp':this.items[i].sellingp,
});
}}

}
i=0;
}

}
