import { ShoutboardAngularPage } from './app.po';

describe('ShoutboardAngular App', () => {
  let page: ShoutboardAngularPage;

  beforeEach(() => {
    page = new ShoutboardAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
