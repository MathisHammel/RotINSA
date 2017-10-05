import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamePage } from './game';

import { ComponentsModule }     from "../../components/components.module";

@NgModule({
  declarations: [
    GamePage,
  ],
  imports: [
    IonicPageModule.forChild(GamePage),
    ComponentsModule
  ],
})
export class GamePageModule {}
