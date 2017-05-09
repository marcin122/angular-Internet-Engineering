import { Angu2Page } from './app.po';

describe('angu2 App', () => {
  let page: Angu2Page;

  beforeEach(() => {
    page = new Angu2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
