import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{FormBuilder,Validators,FormGroup} from '@angular/forms';

/**
 * Generated class for the CreatecategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createcategory',
  templateUrl: 'createcategory.html',
})
export class CreatecategoryPage {
myform:FormGroup;
category:String;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {
  	this.myform=formBuilder.group({
  		category:['',Validators.required],
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatecategoryPage');
  }
  addcategory(){
  	
  }

}
