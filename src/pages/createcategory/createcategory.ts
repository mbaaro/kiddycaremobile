import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{FormBuilder,Validators,FormGroup} from '@angular/forms';
import{BasicproviderProvider} from '../../providers/basicprovider/basicprovider';
import{Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

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
url:String;
descriptinon:String;
categorydata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public http:Http,public provider:BasicproviderProvider) {
  	this.http=http;
    this.url=this.provider.url;
    this.myform=formBuilder.group({
  		category:['',Validators.required],
      description:['',Validators.required]
  	});
  }

  ionViewDidLoad() {
    //load the fetched categories
    this.getcategory();
  }
  getcategory(){
    //fetching the existing categories
    var headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8' );
    this.http.get(this.url+"getcategories",{headers:headers})
    .map(res=>res.json())
    .subscribe(data=>{
this.categorydata=data.data;
console.log(this.categorydata);
    },
err=>{console.log(err)},
()=>{}
    );

  }
  addcategory(){
    var value=this.myform.value;
    var headers=new Headers();
    let body=JSON.stringify({
      'category':value.category,
      'description':value.description,
    });
 headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
this.http.post(this.url+'postcategory',body,{headers:headers})
.subscribe(
err=>{console.log(err)},
()=>{}

  );
}
 	
  
deletecategory(id){
//send a request to mark a category as deleted
var headers=new Headers();
headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
this.http.get(this.url+"deletecategory&catid="+id,{headers:headers})
.map(res=>res.json())
.subscribe(data=>{
},
err=>{
console.log(err);
},
()=>{}
);
//lets refresh the categories 
this.getcategory();

}
}
