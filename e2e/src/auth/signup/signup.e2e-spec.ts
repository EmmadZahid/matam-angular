import { SignupPage } from './signup.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Signup Page', () => {
  let page: SignupPage;

  beforeEach(() => {
    page = new SignupPage();
  });

  it('should display info message', () => {
    // browser.waitForAngularEnabled(false);
    page.navigateTo();
    browser.wait(protractor.ExpectedConditions.urlIs('/account/signup'),1000);
    expect(page.getSubTitleText()).toEqual('Create your account and enjoy the world of resturants.');
  });

  it('should signup successfully', () => {
    // browser.waitForAngularEnabled(false);
    page.navigateTo();
    page.getFullNameField().sendKeys('Emmad Zahid')
    browser.sleep(1000)
    page.getEmailField().sendKeys('test@test.com')
    browser.sleep(1000)
    page.getPasswordField().sendKeys('123123123')
    browser.sleep(1000)
    page.getSignupButton().click()
    browser.wait(protractor.ExpectedConditions.urlIs('/account/login'),1000);
    expect(browser.driver.getCurrentUrl()).toContain('/account/login')
  });
});
