import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeckpickerPage } from './deckpicker';

@NgModule({
  declarations: [
    DeckpickerPage,
  ],
  imports: [
    IonicPageModule.forChild(DeckpickerPage),
  ],
})
export class DeckpickerPageModule {}
