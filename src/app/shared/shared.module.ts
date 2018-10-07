import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from 'app/core/core.module';
import { AlertService } from 'app/shared/services/alert.service';
import { RestService } from 'app/shared/services/rest.service';
import { ToastService } from 'app/shared/services/toast.service';
import { NgDatepickerModule } from 'ng2-datepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastyModule } from 'ng2-toasty';
import { NgxEditorModule } from 'ngx-editor';
import { TreeviewModule } from 'ngx-treeview';
import { LazyLoadedElevesComponent } from './components/lazy-loaded-eleves.component';
import { ImagePreviewDirective} from './directives/image-preview.directive';
import { CapitalizefirstPipe } from './pipes/capitalizefirst.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ClarityModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    CoreModule,
    NgDatepickerModule,
    BrowserAnimationsModule,
    NgxEditorModule,
    TreeviewModule.forRoot(),
    FileUploadModule,
  ],
  declarations: [
    LazyLoadedElevesComponent,
    CapitalizefirstPipe,
    ImagePreviewDirective
  ],
  providers: [
    AlertService,
    ToastService,
    RestService
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule,
    NgDatepickerModule,
    BrowserAnimationsModule,
    NgxEditorModule,
    ClarityModule,
    LazyLoadedElevesComponent,
    CapitalizefirstPipe,
    FileUploadModule,
    ImagePreviewDirective
  ]
})
export class SharedModule {
}
