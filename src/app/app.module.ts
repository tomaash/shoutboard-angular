import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdSelectModule, MdButtonModule, MdCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { FooComponent } from './components/foo.component';

@NgModule({
  declarations: [
    AppComponent,
    FooComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdInputModule, MdSelectModule, MdButtonModule, MdCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
