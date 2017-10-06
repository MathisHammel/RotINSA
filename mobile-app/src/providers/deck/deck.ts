import { Injectable } from '@angular/core';
import { RequestsProvider } from '../requests/requests';
import 'rxjs/add/operator/map';

import { Storage }        from "@ionic/storage";

import { Deck, Card, createAlphabetCompare }     from "../../models/decks";

@Injectable()
export class DeckProvider {

  public decks: Array<Deck>;
  public displaySecret: boolean = false;

  constructor( public request: RequestsProvider,
    private storage: Storage) {

    this.decks = [];
    //this.getLocalDecks();
    this.getLocalDynamicDecks();
    this.getOnlineDecks();

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
  private _gameOnTheRun: boolean;

  public initGame() {
    this.cardsStack = [];
  }

  public isGameOn() : boolean {
    return this._gameOnTheRun;
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
    this._gameOnTheRun = true;
  }

  public pickACard() {
    this.cardsStack.pop();
    if(this.cardsStack.length <= 1) {
      this.stop();
    }
  }

  public get topCard() : Card {
    if (this.cardsStack.length)
      return this.cardsStack[this.cardsStack.length-1];
    else
      return new Card();
  }

  public stop() {
    this._gameOnTheRun = false;
  }

  // ======= Retrieve the decks =========

  private deckPathRoot: string = "decks/";

  getLocalDecks() {
    this.request.getLocal("decks/listeDecks.json")
    .subscribe(
      r => {
        this.decks = [];
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

  getLocalDynamicDecks() {
    this.storage.get(this.deckPathRoot + "list")
      .then( val => {
        console.log(val);
      });
  }

  getOnlineDecks() {
    this.request.getOnline(this.deckPathRoot + "listeDecks.json")
      .subscribe(
        list => {
          this.decks = [];
          for(var deckname of list["decks"]) {
            this.getOnlineDeck(deckname);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getOnlineDeck(name: string) {
    this.request.getOnline(this.deckPathRoot + name + ".json")
      .subscribe(
        deck => {
          let d = Deck.parseObject(deck, name);
          d.shuffle();
          if(d.cards.length > 5) {
            this.decks.push(d);
            this.decks.sort(createAlphabetCompare("name", true));
          }
        },
        error => {
          console.log(name,error);
        }
      )
  }


}
