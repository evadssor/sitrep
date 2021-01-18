import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResolveStoreComponent } from './resolve-store/resolve-store.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NewStoreComponent } from './new-store/new-store.component';
import { EditStoreComponent } from './edit-store/edit-store.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ResolveStoreComponent,
    NewStoreComponent,
    EditStoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ResolveStoreComponent, NewStoreComponent, EditStoreComponent]
})
export class AppModule { }
