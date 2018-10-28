import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatecategoryPage } from './createcategory';

@NgModule({
  declarations: [
    CreatecategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatecategoryPage),
  ],
})
export class CreatecategoryPageModule {}
