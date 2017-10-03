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

  createDecks() {
    let deckNames = [
      "bizuth",
      "fap",
      "hardcore",
      "if",
      "jenaijamais",
      "repliques",
      "ringoffire",
      "rotistandard"
    ];
    for (let name of deckNames) {
      var deck = new Deck(name);
      this.decks.push( deck );
    }
  }

  startAGame(deck: Deck) {
    this.deckPrvd.activDeck = deck;
    this.deckPrvd.start();
    this.navCtrl.push("GamePage");
  }

}
