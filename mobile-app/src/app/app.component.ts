import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage }     from '../pages/home/home';
import { DeckProvider }   from "../providers/deck/deck";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private deckPrvd: DeckProvider,
    private toastCtrl: ToastController ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  clickCount = 0;

  doSomething() {
    this.clickCount++;
    if(this.clickCount == 5) {
      let at = this.toastCtrl.create({
        message: "Hum !! Something is comming !!",
        duration: 2500,
        position: "top"
      });
      at.present();
    }
    if(this.clickCount == 10) {
      let at = this.toastCtrl.create({
        message: "Je sens que ça viennnt !",
        duration: 2500,
        position: "top"
      });
      at.present();
    }
    if(this.clickCount == 15) {
      this.deckPrvd.displaySecret = true;
      let at = this.toastCtrl.create({
        message: "Oh ça y est, je l'ai !!!!!",
        duration: 2500,
        position: "top"
      });
      at.present();
    }
  }

  goToChangePlayers() {
    this.nav.push("ChangePlayersPage");
  }
}
