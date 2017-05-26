import { GrapangularPage } from './app.po';

describe('grapangular App', () => {
  let page: GrapangularPage;

  beforeEach(() => {
    page = new GrapangularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
