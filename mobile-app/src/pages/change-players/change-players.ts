import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DeckProvider }   from "../../providers/deck/deck";

/**
 * Generated class for the ChangePlayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-players',
  templateUrl: 'change-players.html',
})
export class ChangePlayersPage {

  public _players: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private deckPrvd: DeckProvider) {}

  ionViewWillLeave() {
      this.deckPrvd.storePlayers();
  }

  public get players() {
    return this.deckPrvd.players;
  }

  addPlayer() {
    this.deckPrvd.addPlayer();
  }

  removePlayerAt(idx: number) {
    this.deckPrvd.removePlayerAt(idx);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
