// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// // pages
// import { ContactListComponent } from 'app/admin/contact-list/contact-list.component';
// import { ContactFormComponent } from 'app/admin/contact-form/contact-form.component';
// import { AuthGuard } from 'app/auth-guard.service';
// import { SchoolInfoComponent } from 'app/admin/profile/school-info/school-info.component';
// import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
// import { PasswordChangeComponent } from 'app/admin/profile/password-change/password-change.component';
// import { LayoutComponent } from 'app/admin/layout/layout.component';

// const routes: Routes = [
//   {
//     path: 'profile',
//     component: LayoutComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: '', redirectTo: 'ecole', pathMatch: 'full' },
//       { path: 'ecole', component: SchoolInfoComponent },
//       { path: 'password-change', component: PasswordChangeComponent},
//       { path: '**', component: PageNotFoundComponent },
//     ]
//   }
// ];
 
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class ProfileRoutingModule { }
