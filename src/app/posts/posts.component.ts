import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PostsService } from './posts.service'
import { AppService } from '../app.service'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [
    PostsService
  ]
})

export class PostsComponent implements OnInit {
  constructor(
    public postsService: PostsService,
    public appService: AppService
  ) { }

  ngOnInit() {
    this.postsService.initializePosts()
  }
}
