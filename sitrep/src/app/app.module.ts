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

@NgModule({
  declarations: [
    AppComponent,
    ResolveStoreComponent,
    NewStoreComponent
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
  entryComponents: [ResolveStoreComponent, NewStoreComponent]
})
export class AppModule { }
