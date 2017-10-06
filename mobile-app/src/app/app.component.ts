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
  rootPage:any = "HomePage";

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
    var msg = null;
    switch(this.clickCount) {
      case 5:
        msg = "Hum !! Something is comming !!";
        break;
      case 10:
        msg = "Je sens que ça viennnt !";
        break;
      case 17:
        msg = "Ohhh... OH!!!!";
        break;
      case 20:
        msg = "Oh ça y est, je l'ai !!!!!";
        this.deckPrvd.displaySecret = true;
        break;
      case 35:
        msg = "Bin c'est bon t'as eu ton cadeau, qu'est-ce que tu fais encore là ?";
        break;
      case 50:
        msg = "T'es un peu roti déjà non ?";
        break;
      case 65:
        msg = "Oh je te cause !";
        break;
      case 80:
        msg = "C'est pas possible d'être aussi borné...";
        break;
      case 100:
        msg = "100 clics...wouhou...bien joué...";
        break;
      case 200:
        msg = "T'as pas mieux à faire ?";
        break;
    }

    if(msg) {
      let at = this.toastCtrl.create({
        message: msg,
        duration: 2500,
        position: "top"
      });
      at.present();
    }
  }

  goToHome() {
    this.nav.setRoot("HomePage");
  }

  goToChangePlayers() {
    this.nav.push("ChangePlayersPage");
  }

  goToDeckOptions() {
    this.nav.push("DeckOptionsPage");
  }

  goToAbout() {
    this.nav.push("AboutPage");
  }
}
