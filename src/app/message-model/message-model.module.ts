import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from 'app/shared/shared.module';
import { CategoriesMessageNavComponent } from './categories-message-nav/categories-message-nav.component';

import { ModelesMessageListComponent } from './modeles-message-list/modeles-message-list.component';
import { CategorieService } from './shared/services/categorie.service';
import { MessageModelService } from './shared/services/message-model.service';
import { UploadModelMessageComponent } from './upload-model-message/upload-model-message.component';
import { CreateFromSendMessageComponent } from './create-from-send-message/create-from-send-message.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClarityModule,
    RouterModule
  ],
  declarations: [
    CategoriesMessageNavComponent,
    ModelesMessageListComponent,
    UploadModelMessageComponent,
    CreateFromSendMessageComponent
  ],
  providers: [
    MessageModelService,
    CategorieService
  ],
  exports: [
    CategoriesMessageNavComponent,
    ModelesMessageListComponent,
    UploadModelMessageComponent,
    CreateFromSendMessageComponent
  ]
})
export class MessageModelModule {
}
