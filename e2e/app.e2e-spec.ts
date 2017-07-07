import { IeAngularMaterialPage } from './app.po';

describe('ie-angular-material App', () => {
  let page: IeAngularMaterialPage;

  beforeEach(() => {
    page = new IeAngularMaterialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
