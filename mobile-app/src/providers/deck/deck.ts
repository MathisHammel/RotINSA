import { Injectable } from '@angular/core';
import { RequestsProvider } from '../requests/requests';
import 'rxjs/add/operator/map';

import { Deck, Card }     from "../../models/decks";

@Injectable()
export class DeckProvider {

  public decks: Array<Deck>;
  public displaySecret: boolean = false;

  constructor(public request: RequestsProvider) {
    this.decks = [];
    this.getLocalDecks();

    this.initPlayers();
    this.initGame();
  }

  // ======= Players management =========

  public players: Array<string>;

  public initPlayers() {
    this.players = ["Jean", "Bob Lennon", "Pyro Barbare"];
  }

  public addPlayer(name: string = "") {
    this.players.push(name);
  }

  public removePlayerAt(idx: number) {
    if (idx > this.players.length) return;
    this.players.splice(idx,1);
  }

  // ======= A game =====================
  public activDeck: Deck;
  public cardsStack: Array<Card>;

  public initGame() {
    this.cardsStack = [];
  }

  public start() {
    this.activDeck.shuffle();
    this.cardsStack = this.activDeck.cards;
    var sc = Card.StartingCards;
    for (var i = sc.length-1; i >= 0; i--) {
      this.cardsStack.push(sc[i]);
    }
    this.cardsStack.unshift(Card.EndingCard);
    for(var card of this.cardsStack) {
      card.format(this.players);
    }
  }

  public pickACard() {
    this.cardsStack.pop();
  }

  public get topCard() : Card {
    if (this.cardsStack.length)
      return this.cardsStack[this.cardsStack.length-1];
    else
      return new Card();
  }

  // ======= Retrieve the decks =========

  getLocalDecks() {
    this.request.getLocal("decks/listeDecks.json")
    .subscribe(
      r => {
        for (let name of r["decks"]) {
          this.getLocalDeck(name);
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  getLocalDeck(name: string) {
    this.request.getLocal("decks/" + name + ".json")
    .subscribe(
      r => {
        let d = Deck.parseObject(r, name);
        d.shuffle();
        this.decks.push(d);
      },
      error => {
        console.error(name,error);
      }
    )
  }


}
