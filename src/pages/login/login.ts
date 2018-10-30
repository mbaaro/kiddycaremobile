import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
//import {HomePage} from '../home/home';
import {StocksPage} from '../stocks/stocks';
import {PassresetPage} from '../passreset/passreset';
import {Http,Headers}from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	myform:FormGroup;
	uname:String;
	upass:String;
	isaccset:Boolean;
	url:String;
	response:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public http:Http) {
  	this.http=http;
  	this.url='http://localhost/api/kiddycare/kiddycare.php?id=';
  	this.myform=formBuilder.group({
  		uname:['',Validators.required],
  		upass:['',Validators.required]
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }
  checkcredentials(){
  	//check if the credentials exist in the given combination
 var headers= new Headers();
headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8' );
this.http.get(this.url+'credcheck',{headers:headers})
.map(res=>res.json())
.subscribe(data=>{
this.allcrops=data.data;
//this.filterdata=this.allcrops;
  }, 
  err=>{
  	console.log(err);
  },
  ()=>{
});

 

  }
  login(uname,upass,count){
this.navCtrl.push(StocksPage);
  }
  passreset1(){
  	this.navCtrl.push(PassresetPage);
  }

}
