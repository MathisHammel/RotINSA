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

  private _deltax: number = 0;
  private _deltay: number = 0;
  private _startx: number = 0;
  private _starty: number = 0;

  public transition: string = ".1s";
  private _opacity: number = 1;

  get top() : string { return this._offsety + this._deltay +"px"; }
  get left() : string { return this._offsetx + this._deltax +"px"; }
  get rot() : string { return "rotate(" + this._offsetrotate +"deg)"; }
  get opacity() : string { return ""+this._opacity; }

  ontouchstart(event: any) {
    this.transition = ".1s";
  }

  ontouchend(event: any) {
    if(this._deltax * this._deltax + this._deltay * this._deltay > 1000*1000) {
      this.transition = "all .3s";
      this._opacity = 0;
      setTimeout(()=>{console.log("REMOVE ME"), 300});
    } else {
        this.transition = "all .2s";
      this._deltax = 0;
      this._deltay = 0;
    }
  }

  onMove(event: any) {
    //this._deltax = event.deltaX;
    //this._deltay = event.deltaY;
    /*if(event.velocity > 0.5) {
      this.transition = "all .3s";
      this._opacity = 0;
      setTimeout(()=>{console.log("REMOVE ME"), 300});
    }*/
  }

  constructor(private sanitizer: DomSanitizer) {}

}
