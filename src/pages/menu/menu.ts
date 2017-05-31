import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  menuItems: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.menuItems = [
  		{name: "Pizza", details: "Cheese", price: "100"},
  		{name: "Pasta", details: "Red Sauce", price: "105"},
  		{name: "Ice Cream", details: "Vanilla", price: "50"}
  	]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
