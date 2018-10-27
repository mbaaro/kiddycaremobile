import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import {HomePage} from '../home/home';
import {StocksPage} from '../stocks/stocks';
import {PassresetPage} from '../passreset/passreset';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {
  	this.myform=formBuilder.group({
  		uname:['',Validators.required],
  		upass:['',Validators.required]
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  checkcredentials(){
this.login();
  }
  login(){
this.navCtrl.push(StocksPage);
  }
  passreset1(){
  	this.navCtrl.push(PassresetPage);
  }

}
