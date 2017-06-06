import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import Auth0Lock from 'auth0-lock';
import gql from 'graphql-tag';

const PostsQuery = gql`
  query PostsQuery {
    allPosts(orderBy: createdAt_DESC, first: 5)
    {
      id,
      name,
      message
    }
  }
`;

const AddPostMutation = gql`
  mutation AddPostMutation($name: String!, $message: String!) {
    createPost(
      name: $name,
      message: $message
    ) {
      id
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  heroForm: FormGroup;
  lock: any;
  messages = [];
  postQueryHandler: any;
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    'message': {
      'required': 'Message cannot be blank.',
      'minlength': 'Message is too short, minimum is 50 characters',
      'maxlength': 'Message is too long, maximum is 1000 characters'
    }

  };

  @ViewChild('f') heroFormTag;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.createForm();
    this.initializeLock();
  }

  ngOnInit() {
    this.initializePosts();
  }

  initializePosts() {
    this.postQueryHandler = this.apollo.watchQuery<PostsQueryResult>({
      query: PostsQuery
    });

    this.postQueryHandler.subscribe(({ data }) => {
      this.messages = data.allPosts;
    });
  }

  initializeLock() {
    this.lock = new Auth0Lock(
      'RuvQEGEPQaiBzRczgaSQsCb4D0ZbeC1r',
      'tomaash.eu.auth0.com'
    );
    // Listening for the authenticated event
    this.lock.on('authenticated', (authResult) => {
      console.log(authResult)
      // Use the token in authResult to getUserInfo() and save it to localStorage
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          console.log(error);
          // Handle error
          return;
        }

        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });
  }

  onReset() {
    this.heroFormTag.resetForm();
  }

  onLoginClick(): void {
    this.lock.show();
  }

  onSubmit({ value, valid }): void {
    this.apollo.mutate({
      mutation: AddPostMutation,
      variables: {
        name: value.name,
        message: value.message
      }
    }).subscribe(({ data }) => {
      this.postQueryHandler.refetch();
      this.heroFormTag.resetForm();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  onPatch() {
    this.heroForm.patchValue({ name: 'foo' });
  }

  get validationErrors() {
    const errors = {};
    // const controlKeys
    Object.keys(this.heroForm.controls).forEach(key => {
      errors[key] = '';
      const control = this.heroForm.controls[key];
      if (control && !control.valid) {
        const messages = this.validationMessages[key];
        Object.keys(control.errors).forEach(error => {
          errors[key] += messages[error] + ' ';
        });
      }
    });
    return errors;
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['',
        [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)]
      ],
      message: ['',
        [Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1000)]
      ],
    });
  }

  // title = 'app works!';
  // model = {
  //   name: 'foo',
  //   alterEgo: 'bar',
  //   power: 'Super Hot'
  // };
  // powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  // onSubmit() {
  //   console.log(this.model);
  // }
}
