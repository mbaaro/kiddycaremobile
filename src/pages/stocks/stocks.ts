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
console.log(this.stockdata);
},
err=>{console.log(err)},
()=>{});}

 post(){
 	//navigate to a page  help post a new item
 	this.navCtrl.push(PostitemPage);
  	}

  settype(type){
if(type=='Admin'){
this.isadmin=true;
  }	
  else {
this.isadmin=false;
  }
}

}
