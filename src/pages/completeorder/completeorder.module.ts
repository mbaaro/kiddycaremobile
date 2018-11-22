import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteorderPage } from './completeorder';

@NgModule({
  declarations: [
    CompleteorderPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteorderPage),
  ],
})
export class CompleteorderPageModule {}
