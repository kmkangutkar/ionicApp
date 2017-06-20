import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { OrdersPage } from '../orders/orders';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  cart: any = [];
  placedOrdersDB: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public viewCtrl: ViewController, private angFireDB: AngularFireDatabase,
              public alertCtrl: AlertController,
              public authService: AuthServiceProvider) {
      this.placedOrdersDB = this.angFireDB.list('/Orders');
   }

  ionViewDidLoad() {
  	console.log("CheckoutPage loaded Helo");
  	this.cart = this.navParams.get('cart');
  	console.log(this.cart);
  	this.logCart();
  }

  closeModal(){
  	this.viewCtrl.dismiss();
  }

  logCart(){
  	for(let i = 0; i < this.cart.length; i++){
  		console.log(this.cart[i].name);
  	}
  }

  get cartTotal(){
  	let sum = 0;
  	if(this.cart.length == 0){
  		return 0;
  	}
  	for(let i = 0; i < this.cart.length; i++){
		  sum = sum + parseInt(this.cart[i].price);	
	  }
  	console.log(sum);
  	return sum;
  }
  removeFromCart(item){
  	for(let i = 0; i < this.cart.length; i++){
  		if(this.cart[i].name == item.name){
  			this.cart.splice(i, 1);
  			return;
  		}
  	}
  }

 viewOrders(){
   this.navCtrl.push(OrdersPage);
 }

 showAlertOrderPlaced(){ 
    let alert = this.alertCtrl.create({
        "title": "Order Placed",
        buttons: [{
            "text": "OK",
            "handler": () => {
                this.navCtrl.push(OrdersPage);
            }
        }]
    });
    alert.present();
  }


  get userName(){
    return this.authService.displayName();
  }

 placeOrder(){
   let currTime: any = new Date();
   let timeString = "" + currTime.getDate() + "/" 
                 + currTime.getMonth() + '/' 
                 + currTime.getFullYear() + " -- "
                 + currTime.getHours() + ":"
  let temp = currTime.getMinutes();
  if (temp < 10){
    timeString += "0";
  } 
  timeString += temp + ":"
  temp = currTime.getSeconds();
  if(temp < 10){
    timeString += "0";
  }
  timeString += temp;
                

   let newOrder = this.cart.slice();
   this.placedOrdersDB.push({
     "data": newOrder,
     "total": this.cartTotal,
     "time": timeString,
     "userName": this.userName 
   });
   console.log("order placed");
   this.showAlertOrderPlaced();
   //console.log(JSON.stringify(this.orders));
   while(this.cart.length !== 0){
      this.cart.pop();
   }

 }
}
