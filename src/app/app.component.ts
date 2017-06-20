import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { CheckoutPage } from '../pages/checkout/checkout';
import { LoginPage } from '../pages/login/login';
import { OrdersPage } from '../pages/orders/orders';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
                                                                                                                                                                                                                                                                                                                                                                        
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public angFireAuth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    //checking authentication state
    this.angFireAuth.authState.subscribe((user: firebase.User) =>{
      this.rootPage = user ? MenuPage : LoginPage;
    });
  }
  
}

