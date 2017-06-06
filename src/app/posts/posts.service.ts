import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const PostsQuery = gql`
  query PostsQuery {
    allPosts(orderBy: createdAt_DESC, first: 5)
    {
      id,
      name,
      title,
      message
    }
  }
`;

interface Post {
  message: string;
  name: string;
}

interface PostsQueryResult {
  allPosts: Array<Post>;
}

@Injectable()
export class PostsService {
  messages = [];
  private postQueryHandler: any;

  constructor(private apollo: Apollo) { }

  initializePosts() {
    this.postQueryHandler = this.apollo.watchQuery<PostsQueryResult>({
      query: PostsQuery,
      fetchPolicy: 'network-only'
    });

    this.postQueryHandler.subscribe(({ data }) => {
      this.messages = data.allPosts;
    });
  }

  refetchPosts() {
    this.postQueryHandler.refetch();
  }

}

