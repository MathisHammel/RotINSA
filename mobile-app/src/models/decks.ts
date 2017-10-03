function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

export class Deck {

  public name: string;
  public fullName: string;
  public imgname: string;
  public lvl: number;
  public deckFilename: string;
  public description: string;
  public id: string;
  public secret: boolean = false;

  private _cards: Array<Card>;

  public constructor(deckFilename: string);
  public constructor(deckFilename: string, name: string = "", lvl: number = 1) {
    this.name = name;
    this.deckFilename = deckFilename;
    this.lvl = lvl;
    this._cards = [];
  }

  public addCard(card: Card) {
    this._cards.push(card);
  }

  public get cards() {
    let cards = [];

    for(let c of this._cards) {
      cards.push(c.copy());
    }

    return cards;
  }

  public shuffle() {
    shuffle(this._cards);
  }

  static parseObject(obj: any, filename: string) : Deck {
    let deck = new Deck(filename);

    let infos = obj["info"];
    let cards = obj["cards"];

    deck.name           = infos["nom"];
    deck.fullName       = infos["nomEtendu"];
    deck.lvl            = infos["stars"];
    deck.id             = infos["idDeck"];
    deck.description    = infos["description"];
    deck.imgname        = infos["nomImage"].split(".")[0];
    
    if(infos["secret"]) deck.secret = true;

    for(let c of cards) {
      let card = new Card();
      card.content  = c["content"];
      card.type     = c["type"];
      deck.addCard(card);
    }

    return deck;
  }

}

export class Card {
  public type: string;
  private _content: string;
  private _formattedcontent: string;

  constructor() {}

  set content(val: string) {
    this._content = val;
  }

  get content() : string {
    return this._content;
  }

  isFormatted() {
    return !!this._formattedcontent;
  }

  format(players: Array<string> = []) {
    var txt = this._content;

    // Replace the beers
    txt = txt.replace(/{b}/g, "<span class='beer'>"+String.fromCharCode(0xf0fc)+"</span>");

    var matchs = txt.match(/{b\d+-\d+}/g);
    if(matchs) {
      for( var beers of matchs ) {
        let n = beers.match(/(\d+)/g);
        let b1 = parseInt(n[0]), b2 = parseInt(n[1]);
        let nbBeers = Math.floor(Math.random() * (b2 - b1 + 1)+ b1);

        var beerTxt = "";
        if(nbBeers <= 5) {
          // Moins de 5 bieres, on affiche toutes les icones
          beerTxt = "<span class='beer'>";
          for (var i = 0; i < nbBeers; i++) {
            beerTxt += String.fromCharCode(0xf0fc);
          }
          beerTxt += "</span>";
        } else {
          // Au dessus on affiche le nombre
          beerTxt = "<b>" + nbBeers + "</b>&nbsp;<span class='beer'>"+String.fromCharCode(0xf0fc)+"</span>";
        }
        txt = txt.replace(beers,beerTxt);
      }
    }

    // Replace multiple choice
    var result = txt.match(/{[^}]*\|[^}]*}/g);
    if (result) {
      for (let choice of result) {
        var options = choice.match(/[^{\|}]+/g)
        let idx = Math.floor((Math.random() * (options.length)));
        txt = txt.replace(choice,options[idx]);
      }
    }

    //Replace the players
    let playerscopy = players.slice();
    shuffle(playerscopy);
    let p = playerscopy.slice(0, 3);
    if (p.length > 0) txt = txt.replace(/{j1}/g, p[0]); else txt = txt.replace(/{j1}/g, "un random péon");
    if (p.length > 1) txt = txt.replace(/{j2}/g, p[1]); else txt = txt.replace(/{j2}/g, "un joueur");
    if (p.length > 2) txt = txt.replace(/{j3}/g, p[2]); else txt = txt.replace(/{j3}/g, "quelqu'un");

    this._formattedcontent = txt;
  }

  get html() : string {
    return this._formattedcontent;
  }

  copy() : Card {
    var card = new Card();
    card.type = this.type;
    card._content = this._content;
    return card;
  }
}
