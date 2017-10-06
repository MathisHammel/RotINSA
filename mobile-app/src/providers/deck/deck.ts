import { Injectable } from '@angular/core';
import { ToastController}      from "ionic-angular";
import { RequestsProvider } from '../requests/requests';
import 'rxjs/add/operator/map';

import { Storage }        from "@ionic/storage";

import { Deck, Card, createAlphabetCompare }     from "../../models/decks";

@Injectable()
export class DeckProvider {

  public decks: Array<Deck>;
  public displaySecret: boolean = false;
  public defaultDecks: boolean;
  private _localDynamicDecksAvailable: boolean = false;
  public get localDynamicDecksAvailable() : boolean { return this._localDynamicDecksAvailable;  };

  constructor( public request: RequestsProvider,
    private storage: Storage,
    private toastCtrl: ToastController) {

    this.decks = [];
    this.getLocalDynamicDecks();
    this.initPlayers();
    this.initGame();
  }

  // ======= Players management =========

  public players: Array<string>;

  public initPlayers() {
    this.players = ["Jean", "Bob Lennon", "Pyro Barbare"];
    this.restorePlayers();
  }

  public addPlayer(name: string = "") {
    this.players.push(name);
  }

  public removePlayerAt(idx: number) {
    if (idx > this.players.length) return;
    this.players.splice(idx,1);
  }

  public storePlayers() {
    this.storage.set("players", {players: this.players });
  }

  public restorePlayers() {
    this.storage.get("players")
      .then(
        players => {
          if(players && players["players"]) {
            this.players = [];
            for(let pname of players["players"]) {
              this.addPlayer(pname);
            }
          } else {
            console.log("No player stored");
          }
        }
      )
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

  /**
  * Sets the deck to the factory decks
  */
  getLocalDecks() {
    this.defaultDecks = true;
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

  /**
  * Sets the deck to the last downloaded decks
  */
  getLocalDynamicDecks() {
    this.defaultDecks = false;
    this.storage.get(this.deckPathRoot + "list")
      .then( list => {
        if(!list) {
          let toast = this.toastCtrl.create({
            message: "Deck pré-installés utilisés. Tu peux en télécharger des plus récent sur la page des paramètres de decks !",
            duration: 3000,
            position: "top"
          });
          toast.present();
          this.getLocalDecks();
          this._localDynamicDecksAvailable = false;
          return;
        }
        this._localDynamicDecksAvailable = true;
        this.decks = [];
        for(var deckname of list["decks"]) {
          this.getLocalDynamicDeck(deckname);
        }
      });
  }

  getLocalDynamicDeck(name: string) {
    this.storage.get(this.deckPathRoot + name + ".json")
      .then( deck => {
        if(deck) {
          let d = Deck.parseObject(deck, name);
          d.shuffle();
          this.decks.push(d);
        }
      });
  }

  private isLocalDynamicDecksStored() {
    this.storage.get(this.deckPathRoot + "list")
      .then(list => { if(list) { this._localDynamicDecksAvailable = true;}}, err => { this._localDynamicDecksAvailable = false; });
  }

  /**
  * Download all the decks
  */
  getOnlineDecks() {
    this.defaultDecks = false;
    this.request.getOnline(this.deckPathRoot + "listeDecks.json")
      .subscribe(
        list => {
          if(list) {
            this.decks = [];
            for(var deckname of list["decks"]) {
              this.getOnlineDeck(deckname);
            }

            this.storage.set(this.deckPathRoot + "list", list);
            this._localDynamicDecksAvailable = true;
          } else {
            console.error("La liste de decks est vide");
          }
        },
        error => {
          console.error(error);
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
            this.storage.set(this.deckPathRoot + name + ".json", d.toObject());
            this.decks.sort(createAlphabetCompare("name", true));
          }
        },
        error => {
          console.log(name,error);
        }
      )
  }

  clearLocalDeckDatas() {
    this.storage.get(this.deckPathRoot + "list")
      .then( list => {
        if(!list) {
          let toast = this.toastCtrl.create({
            message: "Il n'y a aucun deck d'enregistré",
            duration: 2500,
            position: "top"
          });
          toast.present();
          return;
        }
        for (let deckname of list["decks"]) {
            this.storage.remove(deckname);
        }
        this.storage.remove(this.deckPathRoot + "list");
      })
  }


}
