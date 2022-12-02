import { ImgurAppPage } from './app.po';

describe('imgur-app App', () => {
  let page: ImgurAppPage;

  beforeEach(() => {
    page = new ImgurAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
