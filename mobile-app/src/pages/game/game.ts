import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DeckProvider }   from "../../providers/deck/deck";
/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  pan(event: any) {
  }

  pickACard(event : any) {
    this.deckPrvd.pickACard();
  }
}
