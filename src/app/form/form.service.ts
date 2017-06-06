import { AppService } from '../app.service';
import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const AddPostMutation = gql`
  mutation AddPostMutation($name: String!, $title: String!, $message: String!) {
    createPost(
      name: $name,
      title: $title,
      message: $message
    ) {
      id
    }
  }
`;

@Injectable()
export class FormService {
  constructor(
    private apollo: Apollo,
    private router: Router,
    private appService: AppService
  ) { }

  addPost(value) {
    this.apollo.mutate({
      mutation: AddPostMutation,
      variables: {
        name: this.appService.username,
        title: value.title,
        message: value.message
      }
    }).subscribe(({ data }) => {
      this.router.navigate(['/posts']);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

}


