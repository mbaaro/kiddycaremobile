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

  constructor(public navCtrl: NavController, public navParams: NavParams,public provider:BasicproviderProvider,public http:Http) {
  	this.http=http;
  	this.url=provider.url;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateStockPage');
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
console.log(this.items);
console.log(this.categories);
},
err=>{
console.log(err);
},
()=>{}
);

  }

  getcategory(){
  	//get the selected category
  }

  getitems(item){
//get the filtered items
 this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
  }

}
