import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
//import {HomePage} from '../home/home';
import {StocksPage} from '../stocks/stocks';
import {PassresetPage} from '../passreset/passreset';
import {BasicproviderProvider} from '../../providers/basicprovider/basicprovider';
import {Storage} from '@ionic/storage';
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
	utype:any;
	isaccset:Boolean;
	url:String;
	response:any;
	count:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public http:Http,public basicprovider:BasicproviderProvider,public storage:Storage) {
  	this.http=http;
  	this.count=0;
  	this.uname="";this.upass="",this.utype=""
  //this.url='http://localhost/api/kiddycare/kiddycare.php?id=';
  this.url=this.basicprovider.url;

  	this.myform=formBuilder.group({
  		uname:['',Validators.required],
  		upass:['',Validators.required]
  	});
  }

  ionViewDidLoad() {
    //lets clear the local db values
  this.storage.remove('uname');
  this.storage.remove('upass');
  this.storage.remove('Lname');
  this.storage.remove('utype');
  }

  checkcredentials(){
//get the formvalues
var formvalues=this.myform.value;

  	//check if the credentials exist in the given combination
 var headers= new Headers();
headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8' );
this.http.get(this.url+'credcheck&&uname='+formvalues.uname+'&&upass='+formvalues.upass,{headers:headers})
.map(res=>res.json())
.subscribe(data=>{
	this.getpromisedata(data);
 }, 
  err=>{
  	console.log(err);
  },
  ()=>{
});
}
getpromisedata(data){
	var formvalues=this.myform.value;
	this.count=data.count;
	this.response=data.data
 if(this.count==0){
 	alert("Please Check your username or password and retry");
 }
  	else if(this.count==1){
//lets set these to  the local database
this.storage.set('uname',formvalues.uname);
this.storage.set('upass',formvalues.upass);
this.storage.set('utype',this.response.Utype);
this.storage.set('Lname',this.response.Lastname);

//naviigate to the stocks page
this.navCtrl.push(StocksPage);

 	}
 	else{
alert("Account locked");
 }
}

  
  passreset1(){
  	this.navCtrl.push(PassresetPage);
  }

}
