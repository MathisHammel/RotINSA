import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DeckProvider }   from "../../providers/deck/deck";
import { Deck }           from "../../models/decks";

@IonicPage()
@Component({
  selector: 'page-deckpicker',
  templateUrl: 'deckpicker.html',
})
export class DeckpickerPage {

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private deckPrvd: DeckProvider) {
  }


  get decks() {
    return this.deckPrvd.decks;
  }

  get tab5() {
    return [1,2,3,4,5];
  }

  startAGame(deck: Deck) {
    this.deckPrvd.activDeck = deck;
    this.deckPrvd.start();
    this.navCtrl.push("GamePage");
  }

}
