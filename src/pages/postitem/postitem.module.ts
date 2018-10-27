import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostitemPage } from './postitem';

@NgModule({
  declarations: [
    PostitemPage,
  ],
  imports: [
    IonicPageModule.forChild(PostitemPage),
  ],
})
export class PostitemPageModule {}
