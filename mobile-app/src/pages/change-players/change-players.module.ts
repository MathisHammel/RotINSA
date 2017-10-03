import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePlayersPage } from './change-players';

@NgModule({
  declarations: [
    ChangePlayersPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePlayersPage),
  ],
})
export class ChangePlayersPageModule {}
