import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from "./author/author.component";
import { BookComponent } from "./book/book.component";
import { GuiComponent } from './gui.component';
import {RouterModule, Routes} from "@angular/router";
import {MdButtonModule, MdTooltipModule,
  MdCardModule, MdListModule,
  MdInputModule, MdTabsModule,
  MdToolbarModule, MdSelectModule,
  MdAutocompleteModule, MdSnackBarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserComponent } from './browser/browser.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./auth.service";
import {AuthorService} from "./author.service";
import {AuthGuardService} from "./auth-guard.service";

const appRoutes: Routes = [
  {
    path: 'store',
    component: GuiComponent,
    children: [
      {
        path: 'author', component: AuthorComponent, canActivate: [AuthGuardService]
      },
      {
        path: 'book', component: BookComponent, canActivate: [AuthGuardService]
      },
      {
        path: 'browser', component: BrowserComponent, canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    MdButtonModule,
    MdTooltipModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdTabsModule,
    MdToolbarModule,
    MdSelectModule,
    MdAutocompleteModule,
    MdSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [AuthorComponent, BookComponent, GuiComponent, BrowserComponent, LoginComponent],
  providers: [AuthService, AuthorService, AuthGuardService]
})
export class GuiModule { }
