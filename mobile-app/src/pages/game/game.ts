import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { DeckProvider }   from "../../providers/deck/deck";

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private deckPrvd: DeckProvider) {
  }

  get cards() {
    return this.deckPrvd.cardsStack;
  }

  get topCard() {
    return this.deckPrvd.topCard;
  }

  pan(event: any) {}

  pickACard(event : any) {
    this.deckPrvd.pickACard();
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
