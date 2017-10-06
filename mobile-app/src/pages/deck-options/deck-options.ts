import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DeckProvider }         from "../../providers/deck/deck";

@IonicPage()
@Component({
  selector: 'page-deck-options',
  templateUrl: 'deck-options.html',
})
export class DeckOptionsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private deckPrvd: DeckProvider) {

  }

  get decks() {
    return this.deckPrvd.decks;
  }

  downloadDecks() {
    this.deckPrvd.getOnlineDecks();
  }

  restoreDefaultDecks() {
    this.deckPrvd.getLocalDecks();
  }
}
