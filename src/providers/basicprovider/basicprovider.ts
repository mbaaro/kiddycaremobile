
import { Injectable } from '@angular/core';

//import {Storage} from '@ionic/storage';


/*
  Generated class for the BasicproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BasicproviderProvider {
	public url:String;
	public uname:String;
	public upass:string;
	public utype:string;
	public lname:String;
  public catdata:any;
  public saleitems:any;
  public orderitems:any;
  public filteredstockdata:any;
  public cartamount:any;
  public cartnumber:any;


  constructor() {
  	this.url='http://localhost/api/kiddycare/kiddycare.php?id=';
   this.saleitems=[];
   this.orderitems=[];
   this.cartamount=0;
   this.cartnumber=0;
  }

  getlocalcreds(){
  	//getting the local credentials stored
  	//var uname1="ben";
  }
  getcategories(){
    //fetching the saved categories
  }

}
