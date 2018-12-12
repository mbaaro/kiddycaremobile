import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {Storage} from '@ionic/storage';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import{BasicproviderProvider} from '../../providers/basicprovider/basicprovider';
/**
 * Generated class for the MadeordersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-madeorders',
  templateUrl: 'madeorders.html',
})
export class MadeordersPage {
url:any;
mydata:any;
customers:any;
orders:any;
ordernos:any;
filtereddata:any;
filteredordernos:any;
isorderno:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public provider:BasicproviderProvider) {
  this.http=http;
  this.url=this.provider.url;
  this.isorderno=false;
  }

  ionViewDidLoad() {
    this.getorders();
  }
  getorders(){
  	//lets fetch all the uncollected orders
  	var headers=new Headers();
  	headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
  	this.http.get(this.url+'fetchorders')
  	.map(res=>res.json())
  	.subscribe(data=>{
  		this.ordernos=data.orderno;
        this.customers=data.customer;
  		this.mydata=data.data;
  		this.filtereddata=this.mydata;
  		this.filteredordernos=this.ordernos; /// will be shown when a custmer is selected
  		/*console.log(this.filteredordernos);
  		console.log(this.filtereddata);
  		console.log(this.customers);
  		*/
  	},
err=>{console.log(err)},
()=>{}
  		)

  }
  customerfilter(event){
  	var customer=event;
console.log(customer);
//set filtered number
  }
 numberfilter(event){


 	//is order boolean
 	//set
 	var number=event;
console.log(number);
 }




}