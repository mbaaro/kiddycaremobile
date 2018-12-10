import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MadeordersPage } from './madeorders';

@NgModule({
  declarations: [
    MadeordersPage,
  ],
  imports: [
    IonicPageModule.forChild(MadeordersPage),
  ],
})
export class MadeordersPageModule {}
