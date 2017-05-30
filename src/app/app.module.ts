import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdSelectModule, MdButtonModule, MdCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { FooComponent } from './components/foo.component';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj3bf7docbo5w0147sj4e66ik'
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent,
    FooComponent
  ],
  imports: [
    BrowserModule,
    ApolloModule.forRoot(provideClient),
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
