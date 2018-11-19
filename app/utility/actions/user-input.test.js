/* eslint-disable func-names */
import _ from 'lodash';
import CommonActions from './common';
import UserInputActions from './user-input';
import HeroCardUtility from '../utility';

const UiFramework = (function () {
  function input(name, isAutoFocused, attr, className) {
    const element = document.createElement('input');
    element.name = name;
    element.autofocus = isAutoFocused;
    element.setAttribute('class', className);
    if (attr) {
      element.setAttribute([attr], 'dfdfsg');
    }
    return element;
  }
  function div(id, cssClass, innerHTMLText, attr) {
    const element = document.createElement('div');
    element.id = id;
    element.setAttribute([attr], 'dfdfsg');
    const classes = _.split(cssClass, ' ');
    if (classes.length) {
      _.map(classes, (eachClass) => {
        if (eachClass) {
          element.classList.add(eachClass);
        }
      });
    }
    if (innerHTMLText) {
      element.innerHTML = innerHTMLText;
    }
    // element.style.margin = '100px';
    // element.style.height = '100px';
    document.body.appendChild(element);
    return element;
  }

  function form(formClass) {
    const formEle = document.createElement('FORM');
    formEle.setAttribute('id', 'myForm');
    formEle.setAttribute('class', formClass);
    document.body.appendChild(formEle);
    return formEle;
  }

  return {
    input,
    div,
    form,
  };
}());

describe('UserInputActions', () => {
  describe('showInputForm', () => {
    let div = null;
    beforeEach(() => {
      div = null;
      spyOn(CommonActions, 'showActionForm');
    });

    it('it should call CommonActions showActionForm', () => {
      div = UiFramework.div('div1', '', '', 'data-actionkey');
      const e = {};
      UserInputActions.showInputForm(e, div);

      expect(CommonActions.showActionForm).toHaveBeenCalledWith(div, '.hccf-js-input-add-section', 'dfdfsg');
    });
  });

  describe('hideInputForm', () => {
    let div = null;
    beforeEach(() => {
      div = null;
      spyOn(CommonActions, 'hideActionForm');
    });

    it('it should call CommonActions hideActionForm', () => {
      div = UiFramework.div('div1', '', '', 'data-actionkey');
      const e = {};
      UserInputActions.hideInputForm(e, div);

      expect(CommonActions.hideActionForm).toHaveBeenCalledWith(div, '.hccf-js-input-add-section');
    });
  });

  describe('checkUserInput', () => {
    let formEle = null;
    let inputEle = null;
    beforeEach(() => {
      formEle = UiFramework.form('hccf-card-action-form', 'hccf-js-input-button-submit');
      inputEle = UiFramework.input('input', true, '', 'hccf-js-input-button-submit');
      formEle.appendChild(inputEle);
      spyOn(HeroCardUtility, 'getClosest').and.returnValue(formEle);
      spyOn(CommonActions, 'validateFormFields');
    });

    it('it should call CommonActions checkUserInput', () => {
      const e = {};
      UserInputActions.checkUserInput(e, inputEle);

      expect(CommonActions.validateFormFields).toHaveBeenCalledWith(formEle, inputEle);
    });
  });

  describe('submitInput', () => {
    let formEle = null;
    let inputEle = null;
    beforeEach(() => {
      formEle = UiFramework.form('hccf-card-action-form', 'hccf-js-input-button-submit');
      inputEle = UiFramework.input('input', true, '', 'hccf-js-input-button-submit');
      formEle.appendChild(inputEle);
      spyOn(HeroCardUtility, 'getClosest').and.returnValue(formEle);
      spyOn(CommonActions, 'getFormData').and.returnValue({});
      spyOn(CommonActions, 'encodeRoswellActionURLAndNavigate');
      spyOn(CommonActions, 'disableActionButton');
    });

    it('it should call CommonActions submitInput', () => {
      spyOn(CommonActions, 'validateFormFields').and.returnValue(true);
      const e = {};
      const returnVal = UserInputActions.submitInput(e, inputEle);

      expect(CommonActions.validateFormFields).toHaveBeenCalledWith(formEle, inputEle);
      expect(CommonActions.encodeRoswellActionURLAndNavigate)
        .toHaveBeenCalledWith(formEle, formEle, {}, 'HeroCard.UserInputActions.addInputCallback');

      expect(CommonActions.disableActionButton).toHaveBeenCalledWith(inputEle, 'In progress...');
      expect(returnVal).toEqual(true);
    });

    it('it should call CommonActions submitInput', () => {
      spyOn(CommonActions, 'validateFormFields').and.returnValue(false);
      const e = {};
      const returnVal = UserInputActions.submitInput(e, inputEle);

      expect(returnVal).toEqual(false);
    });
  });
});
