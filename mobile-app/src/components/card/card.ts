import { Component, Input } from '@angular/core';
import { Card }     from "../../models/decks";
import { DomSanitizer } from '@angular/platform-browser';

var jitterx = 3, jittery = 3, jitterrot = 3;
@Component({
  selector: 'card',
  templateUrl: 'card.html'
})
export class CardComponent {

  @Input()
  card: Card;

  @Input()
  set stack(val: boolean) {
    this._stack = val;
    this._offsetx = Math.floor(Math.random()*jitterx*2)-jitterx;
    this._offsety = Math.floor(Math.random()*jittery*2)-jittery;
    this._offsetrotate = Math.random()*jitterrot*2-jitterrot;
  }
  get stack() : boolean { return this._stack}

  _stack: boolean = false;

  private _offsetx: number;
  private _offsety: number;
  private _offsetrotate: number;

  get top() : string { return this._offsety +"px"; }
  get left() : string { return this._offsetx +"px"; }
  get rot() : string { return "rotate(" + this._offsetrotate +"deg)"; }

  constructor(private sanitizer: DomSanitizer) {}

}
