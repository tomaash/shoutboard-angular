import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const PostsQuery = gql`
  query PostsQuery {
    allPosts(orderBy: createdAt_DESC)
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

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.createForm();
  }

  ngOnInit() {
    this.initializePosts();
  }

  initializePosts() {
    console.log('will reload posts!');
    this.postQueryHandler = this.apollo.watchQuery<PostsQueryResult>({
      query: PostsQuery
    });

    this.postQueryHandler.subscribe(({ data }) => {
      this.messages = data.allPosts;
    });
  }

  onSubmit({ value, valid }): void {
    // this.messages.push(value);
    this.apollo.mutate({
      mutation: AddPostMutation,
      variables: {
        name: value.name,
        message: value.message
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      console.log(this.postQueryHandler);
      this.postQueryHandler.refetch();
      this.heroForm.patchValue({ name: '', message: '' });
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
