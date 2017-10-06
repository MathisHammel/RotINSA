import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeckOptionsPage } from './deck-options';

@NgModule({
  declarations: [
    DeckOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DeckOptionsPage),
  ],
})
export class DeckOptionsPageModule {}
