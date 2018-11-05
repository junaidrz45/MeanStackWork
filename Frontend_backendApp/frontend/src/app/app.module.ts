import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule , Routes} from '@angular/router';

import {MatToolbarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import {resolveDirective} from '@angular/core/src/render3/instructions';
import {promise} from 'selenium-webdriver';
import fullyResolved = promise.fullyResolved;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const routes: Routes = [
  {path: 'create' , component: CreateComponent},
  {path: 'edit/:id' , component: EditComponent},
  {path: 'list', component: ListComponent},
  {path: '' , redirectTo: 'list' , pathMatch: 'full'}
  ];




@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
