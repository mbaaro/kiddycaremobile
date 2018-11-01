import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import{LoginPage} from '../login/login';
import {BasicproviderProvider} from '../../providers/basicprovider/basicprovider';
import {LoginPage} from '../login/login';
import{StocksPage} from'../stocks/stocks';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

uname:any;
upass:any;
lname:any;
utype:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public provider:BasicproviderProvider,public alertCtrl:AlertController) {

  }
ionViewDidLoad() {
   //get the locally stored values and pass them for redefination
  this.storage.get('uname').then((val)=>{this.storagevalues('uname',val) });
  this.storage.get('upass').then((val)=>{this.storagevalues('pass',val)});
  this.storage.get('utype').then((val)=>{this.storagevalues('utype',val)});
   this.storage.get('Lname').then((val)=>{this.storagevalues('lname',val)});
  }


storagevalues(key,value){
	//get values passed from local and also assign the values to variables in the provider
	if(key=='uname'){this.uname=value;
		this.provider.uname=value;}
	else if(key=='upass'){this.upass=value;
		this.provider.upass=value;}
	else if (key=='utype'){this.utype=value;
		this.provider.utype=value}
		else if (key=='lname'){
		this.provider.lname=value}
}


  proceed(){
if(this.uname=="" || this.uname==null){
	this.navCtrl.push(LoginPage);

  }
  else{
  	//confirm if the user wants to  continue with current account
  	const confirm = this.alertCtrl.create({
      title: 'Welcome back  '+this.provider.lname,
      message: 'Do you wish to proceed with this account?',
      buttons: [
        {
          text: 'No Logout',
          handler: () => {
           this.navCtrl.push(LoginPage);
          }
        },
        {
          text: 'Proceed',
          handler: () => {
          this.navCtrl.push(StocksPage);
          }
        }
      ]
    });
    confirm.present();
  }


  }


}
