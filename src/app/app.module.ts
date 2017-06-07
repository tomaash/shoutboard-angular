import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdInputModule, MdSelectModule, MdButtonModule, MdCardModule, MdIconModule } from '@angular/material'
import { AppComponent } from './app.component'
import { AppService } from './app.service'
import { HomeComponent } from './home/home.component'
import { PostsComponent } from './posts/posts.component'
import { FormComponent } from './form/form.component'

import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { ApolloModule } from 'apollo-angular'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj3bf7docbo5w0147sj4e66ik'
  }),
})

export function provideClient(): ApolloClient {
  return client
}

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'form', component: FormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ApolloModule.forRoot(provideClient),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdInputModule, MdSelectModule, MdButtonModule, MdCardModule, MdIconModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
