import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'; 
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  displayName: any;
  placedOrders: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private angFireDB: AngularFireDatabase,
  				public authService: AuthServiceProvider) {
  	this.displayName = this.authService.displayName();
  	console.log(this.displayName);
  	this.placedOrders = this.angFireDB.list('/Orders', {
  		'query': {
  			'orderByChild': 'userName',
  			'equalTo': this.displayName
  		}
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage', this.displayName);
  }
  
}

