import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  cart: any = [];
  menuItems: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  	this.menuItems = [
  		{name: "Pizza", details: "Cheese", price: "100", image: "../../assets/pictures/pizza-slice.png"},
  		{name: "Pasta", details: "Red Sauce", price: "105", image: "../../assets/pictures/pasta.jpeg"},
  		{name: "Ice Cream", details: "Vanilla", price: "50", image: "../../assets/pictures/icecream.png"}
  	]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  showConfirm(item){
  	let confirm = this.alertCtrl.create({
  		title: "Place Order?",
  		message: "Do you want to order " + item.name + " for Rs. " + item.price + "?",
  		buttons: [
  			{
  				text: "Confirm",
  				handler: () =>{
  					console.log("Order Confirmed!");
  					this.cart.push(item);
  				}  	
  			},
  			{
  				text: "Cancel",
  				handler: () => {
  					console.log("Order Cancelled!");
  				}
  			}
  		]

  	});
  	confirm.present();	
  }

  whenClicked(item){
  	console.log(item.price);
  	this.showConfirm(item);
	console.log(this.cart);
  }

}
