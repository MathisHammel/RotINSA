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

  public changeRandom: any;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private deckPrvd: DeckProvider) {
  }

  startARandomGame() {
    if(this.deckPrvd.decks.length > 1) {
      let randomDeck;
      if(!this.deckPrvd.displaySecret) {
        while(!randomDeck || randomDeck.secret) {
          randomDeck = this.deckPrvd.decks[Math.floor(Math.random()*this.deckPrvd.decks.length)];
        }
      }
      this.startAGame(randomDeck);
    }
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

  resumeGame() {
    this.navCtrl.push("GamePage");
  }

  isGameOn() {
    return this.deckPrvd.isGameOn();
  }

  goToDeckOptions() {
    this.navCtrl.push("DeckOptionsPage");
  }

}
