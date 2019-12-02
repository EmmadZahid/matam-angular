import { browser, by, element } from 'protractor';

export class SignupPage {
  navigateTo() {
    return browser.get('/account/signup') as Promise<any>;
  }

  getSubTitleText() {
    return element(by.className('info-text')).getText() as Promise<string>;
  }

  getEmailField(){
    return element(by.name('email'));
  }

  getFullNameField(){
    return element(by.name('fullname'));
  }
  getPasswordField(){
    return element(by.name('password'));
  }
  getSignupButton(){
    return element(by.id('signup-button'));
  }
}
