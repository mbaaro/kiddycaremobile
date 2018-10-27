import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import {LoginPage} from '../login/login';

/**
 * Generated class for the PassresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passreset',
  templateUrl: 'passreset.html',
})
export class PassresetPage {
	myform:FormGroup;
	uname:String;
	upass1:String;
	upass2:String;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {
  this.myform=formBuilder.group({
  		uname:['',Validators.required],
  		upass1:['',Validators.required],
  		upass2:['',Validators.required]
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassresetPage');
  }
  checkcredentials(){
  	this.navCtrl.push(LoginPage);
  }

}
