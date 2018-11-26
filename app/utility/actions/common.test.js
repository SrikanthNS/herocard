/* eslint-disable func-names */
import _ from 'lodash';
import CommonActions from './common';
// import HeroCardUtility from '../utility';
import HeroCardEventEmitter from '../event-emitter';
import HeroCardActions from '.';

HeroCardEventEmitter().initEventEmitter();
const EventEmitter = HeroCardEventEmitter().EventEmitter();

const createElement = (function () {
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
    if (attr) {
      element.setAttribute([attr], 'dfdfsg');
    }
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
  function actionButton(id, className, attr, innerHTML, buttonClass, formClass) {
    const element = document.createElement('a');
    element.name = name;
    element.setAttribute('id', id);
    element.setAttribute('class', className);
    if (attr) {
      element.setAttribute([attr], 'USER_INPUT');
    }
    if (innerHTML) {
      element.setAttribute('innerHTML', innerHTML);
    }
    const btnEle = this.button(buttonClass);
    const formEle = this.form(formClass);
    formEle.appendChild(element);
    formEle.appendChild(btnEle);
    const divEle = this.div('div',
      'hccf-card-actions__item');

    divEle.appendChild(formEle);
    const devEleFormSibling = this.div('.hccf-card-actions__item-link--hidden');
    document.body.appendChild(devEleFormSibling);
    document.body.appendChild(divEle);
    return element;
  }
  function cancelButton(id, className, attr, innerHTML, div1Class, div2Class, formClass) {
    const element = document.createElement('a');
    element.name = name;
    element.setAttribute('id', id);
    element.setAttribute('class', className);
    if (attr) {
      element.setAttribute([attr], 'USER_INPUT');
    }
    if (innerHTML) {
      element.setAttribute('innerHTML', innerHTML);
    }
    const div1 = this.div('div1', div1Class);
    div1.appendChild(element);
    const devEleFormSibling = this.div('.hccf-card-actions__item-link--hidden');
    const div2 = this.div('div2', div2Class);
    div2.appendChild(div1);
    const formEle = this.form(formClass);
    formEle.appendChild(div2);
    formEle.appendChild(devEleFormSibling);

    const divEle = this.div('divEle', 'hccf-card-actions__item');

    divEle.appendChild(formEle);
    document.body.appendChild(divEle);
    return element;
  }
  function button(ccsClass) {
    const element = document.createElement('a');
    element.setAttribute('class', ccsClass);
    element.setAttribute('style', 'display: none;');
    return element;
  }
  function formInput(name, id, type, val, checked, attr, className, dataValidation) {
    const element = document.createElement('input');
    element.name = name;
    element.id = id;
    element.type = type;
    element.value = val;
    if (checked) {
      element.checked = true;
    }
    if (className) {
      element.setAttribute('class', className);
    }
    if (attr) {
      element.setAttribute([attr], 'dfdfsg');
    }
    if (dataValidation) {
      element.setAttribute('data-validation', dataValidation);
    }
    return element;
  }
  function form(formClass, action, dataActionStr) {
    const formEle = document.createElement('FORM');
    formEle.setAttribute('id', 'myForm');
    formEle.setAttribute('class', formClass);
    if (action) {
      formEle.setAttribute('action', action);
    }
    if (dataActionStr) {
      formEle.setAttribute('data-action-string', dataActionStr);
    }
    return formEle;
  }
  function card(className, id, dataCardId, dataCardConnector) {
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', className);
    cardDiv.setAttribute('id', id);
    cardDiv.setAttribute('data-card-id', dataCardId);
    cardDiv.setAttribute('data-card-connector', dataCardConnector);
    return cardDiv;
  }
  function textArea(name, id, dataValidation, val = null) {
    const textAreaEle = document.createElement('textarea');
    if (name) {
      textAreaEle.setAttribute('name', name);
    }
    if (id) {
      textAreaEle.setAttribute('id', id);
    }
    if (dataValidation) {
      textAreaEle.setAttribute('data-validation', dataValidation);
    }
    if (val) {
      textAreaEle.value = val;
    }
    return textAreaEle;
  }

  function span(className, innerHTML) {
    const spanEle = document.createElement('span');
    if (className) {
      spanEle.setAttribute('class', className);
    }
    if (innerHTML) {
      spanEle.setAttribute('innerHTML', innerHTML);
      spanEle.innerHTML = innerHTML;
    }
    return spanEle;
  }

  return {
    input,
    div,
    form,
    actionButton,
    button,
    cancelButton,
    formInput,
    card,
    textArea,
    span,
  };
}());

const fakeFunc = () => {
  // eslint-disable-next-line no-console
  console.log('This is a fake function to be attached to some HTML nodes');
};

describe('CommonActions', () => {
  describe('showActionForm', () => {
    let actionButton = null;
    beforeEach(() => {
      actionButton = null;
      spyOn(EventEmitter, 'emit');
    });

    it('it should Emit CARDRESIZE Event and return true', () => {
      actionButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
        '', 'data-actionkey',
        'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');
      CommonActions.showActionForm(actionButton, '.hccf-js-input-add-section');

      expect(EventEmitter.emit).toHaveBeenCalledWith('CARDRESIZED');
    });

    it('it should return false if actionButton has completed class name', () => {
      actionButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
        'hccf-card-actions__item-link hccf-card-actions__item-link--complete', 'data-actionkey', 'Add contact'
        , 'hccf-js-input-add-section', 'hccf-card-action-form');
      const returnVal = CommonActions.showActionForm(actionButton, '.hccf-js-input-add-section');

      expect(returnVal).toEqual(false);
    });
  });

  describe('hideActionForm', () => {
    let actionButton = null;
    beforeEach(() => {
      actionButton = null;
      spyOn(EventEmitter, 'emit');
    });

    it('it should Emit CARDRESIZE Event and return true', () => {
      actionButton = createElement.cancelButton('__6bf64604-1393-4076-aeab-30a91276e20d',
        'hccf-card-actions__item-link hccf-js-input-button-cancel', 'data-actionkey',
        'Cancel', 'hccf-card-actions__item', 'hccf-js-input-add-section', 'hccf-card-action-form');
      CommonActions.hideActionForm(actionButton, '.hccf-js-input-add-section');

      expect(EventEmitter.emit).toHaveBeenCalledWith('CARDRESIZED');
    });
  });

  describe('getFormData', () => {
    let formEle = null;
    beforeEach(() => {
      formEle = createElement.form('hccf-card-action-form');
    });

    it('it should read form element and return EMPTY string', () => {
      const input1 = createElement.formInput('name', 'name', 'hidden', 'john Smith');
      const input2 = createElement.formInput('email', 'email', 'hidden', 'johnSmith@bigdeal.com');
      formEle.appendChild(input1);
      formEle.appendChild(input2);
      document.body.appendChild(formEle);
      const retVal = CommonActions.getFormData(formEle);

      expect(retVal).toEqual('');
    });

    it('it should read form element and return radio input which is checked', () => {
      const input3 = createElement.formInput('radioBtns', 'radioOptions', 'radio', 'val1');
      const input4 = createElement.formInput('radioBtns', 'radioOptions', 'radio', 'val2', 'checked');
      const input5 = createElement.formInput('radioBtns', 'radioOptions', 'radio', 'val3');
      formEle.appendChild(input3);
      formEle.appendChild(input4);
      formEle.appendChild(input5);
      document.body.appendChild(formEle);
      const retVal = CommonActions.getFormData(formEle);

      expect(retVal).toEqual('radioBtns=val2');
    });

    it('it should read form element and return checkbox name string', () => {
      const input3 = createElement.formInput('checkBox', 'radioOptions', 'checkbox', 'val1');
      const input4 = createElement.formInput('checkBox', 'radioOptions', 'checkbox', 'val2', 'checked');
      const input5 = createElement.formInput('checkBox', 'radioOptions', 'checkbox', 'val3');
      formEle.appendChild(input3);
      formEle.appendChild(input4);
      formEle.appendChild(input5);
      document.body.appendChild(formEle);
      const retVal = CommonActions.getFormData(formEle);

      expect(retVal).toEqual('checkBox=val2');
    });
  });

  describe('validateFormFields', () => {
    let form = null;
    let textArea = null;
    let submitButton = null;
    let div = null;
    beforeEach(() => {
      form = null;
      textArea = null;
      submitButton = null;
      div = null;
    });

    it('it should return true if form elements do not have any validations ', () => {
      form = createElement.form('hccf-card-action-form');
      textArea = createElement.textArea('textarea', 'textareaID', '');
      form.appendChild(textArea);
      submitButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
        '', 'data-actionkey',
        'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');
      const retVal = CommonActions.validateFormFields(form, submitButton);

      expect(retVal).toEqual(true);
    });

    it('it should return false if form required element is not filled', () => {
      spyOn(CommonActions, 'validateFieldRules').and.returnValue(false);
      form = createElement.form('hccf-card-action-form');
      div = createElement.div('div1', 'hccf-form-field');
      textArea = createElement.textArea('textarea', 'textareaID', 'required');
      div.appendChild(textArea);
      form.appendChild(div);
      submitButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
        '', 'data-actionkey',
        'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');
      const retVal = CommonActions.validateFormFields(form, submitButton);

      expect(retVal).toEqual(false);
    });
  });

  describe('disableActionButton', () => {
    it('it should disable the action button text and change it to label passed as parameter', () => {
      const submitButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
        '', 'data-actionkey',
        'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');

      CommonActions.disableActionButton(submitButton, 'New Label Text');

      expect(submitButton.innerHTML).toEqual('New Label Text');
    });

    it('it should disable the action button text', () => {
      const submitButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
        '', 'data-actionkey',
        'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');

      CommonActions.disableActionButton(submitButton, 'New Label Text');

      expect(submitButton.className).toContain('hccf-card-actions__item-link--complete');
      expect(submitButton.className).toContain('hccf-card-actions__item-link--disabled');
    });
  });

  describe('enableActionButton', () => {
    it('it should enable action button', () => {
      const actionButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
        'hccf-card-actions__item-link--disabled hccf-card-actions__item-link--complete', 'data-actionkey',
        'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');

      CommonActions.enableActionButton(actionButton, 'Add comment', 'click', fakeFunc);

      expect(actionButton.className).not.toContain('hccf-card-actions__item-link--disabled');
      expect(actionButton.className).not.toContain('hccf-card-actions__item-link--complete');
    });
  });

  describe('validateFieldRules', () => {
    const form = createElement.form('hccf-card-action-form');
    const div = createElement.div('div1', 'hccf-form-field');
    const span = createElement.span('hccf-form-field__validation-error-dot');

    // Form Fields
    const input1 = createElement.formInput('checkBox', 'radioOptions', 'checkbox', 'val1');
    const input2 = createElement.formInput('checkBox', 'radioOptions',
      'checkbox', 'val2', 'checked', null, null, 'required');
    const input3 = createElement.formInput('checkBox', 'radioOptions', 'checkbox', 'val3');
    const textArea = createElement.textArea('textarea', 'textareaID', 'required');
    const textArea2 = createElement.textArea('textarea', 'textareaID', 'required', 'value');
    const phoneField = createElement.formInput('phone', 'phone-field', 'number', '9922992292',
      null, null, null, 'phone');
    const phoneField1 = createElement.formInput('phone', 'phone-field', 'number', '12121',
      null, null, null, 'phone');
    const numfield = createElement.formInput('number', 'number-field', 'number', '1221',
      null, null, null, 'numeric');
    const numfield1 = createElement.formInput('number', 'number-field', 'number', '992qwqwq2',
      null, null, null, 'numeric');
    const numfield2 = createElement.formInput('number', 'number-field', 'number', '1',
      null, null, null, 'numeric');
    numfield2.setAttribute('min', 10);
    numfield2.setAttribute('max', 100);
    const numfield3 = createElement.formInput('number', 'number-field', 'number', '122',
      null, null, null, 'numeric');
    numfield3.setAttribute('min', 10);
    numfield3.setAttribute('max', 100);
    const emailField = createElement.formInput('email', 'email-field', 'email', 'sriki@gmail.com',
      null, null, null, 'email');
    const emailField1 = createElement.formInput('email', 'email-field', 'email', 'srikigmail.com',
      null, null, null, 'email');
    const dateField = createElement.formInput('date', 'date-field', 'date', Date(),
      null, null, null, 'date');
    const dateField1 = createElement.formInput('date', 'date-field', 'date', `${Date()}_invalid_date`,
      null, null, null, 'date');
    const div1 = createElement.div('innerDiv', 'hccf-form-field__validation-message');
    const span1 = createElement.span(null, 'Comment is required');
    // Fileds
    span.appendChild(input1);
    span.appendChild(input2);
    span.appendChild(input3);
    div1.appendChild(span1);
    span.appendChild(textArea);
    span.appendChild(textArea2);
    span.appendChild(phoneField);
    span.appendChild(phoneField1);
    span.appendChild(numfield);
    span.appendChild(numfield1);
    span.appendChild(numfield2);
    span.appendChild(numfield3);
    span.appendChild(emailField);
    span.appendChild(emailField1);
    span.appendChild(dateField);
    span.appendChild(dateField1);
    div.appendChild(span);
    div.appendChild(div1);
    form.appendChild(div);
    const submitButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
      '', 'data-actionkey',
      'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');
    form.appendChild(submitButton);
    document.body.appendChild(form);

    it('it should validate required field', () => {
      const retVal = CommonActions.validateFieldRules(null, textArea, true);

      expect(retVal).toEqual(false);
    });

    it('it should validate required field with true if value is present', () => {
      const retVal = CommonActions.validateFieldRules(null, textArea2, true);

      expect(retVal).toEqual(true);
    });

    it('validate form phone fields', () => {
      const retVal = CommonActions.validateFieldRules(null, phoneField, true);

      expect(retVal).toEqual(true);
    });

    it('validate form phone field with invalid Value', () => {
      const retVal = CommonActions.validateFieldRules(null, phoneField1, true);

      expect(retVal).toEqual(false);
    });

    it('validate form number field', () => {
      const retVal = CommonActions.validateFieldRules(null, numfield, true);

      expect(retVal).toEqual(true);
    });

    it('validate form number field with invalid Value', () => {
      const retVal = CommonActions.validateFieldRules(null, numfield1, true);

      expect(retVal).toEqual(false);
    });

    it('validate form number field with invalid min Value', () => {
      const retVal = CommonActions.validateFieldRules(null, numfield2, true);

      expect(retVal).toEqual(false);
    });

    it('validate form number field with invalid max Value', () => {
      const retVal = CommonActions.validateFieldRules(null, numfield3, true);

      expect(retVal).toEqual(false);
    });

    it('validate email field with valid email', () => {
      const retVal = CommonActions.validateFieldRules(null, emailField, true);

      expect(retVal).toEqual(true);
    });

    it('validate email field with invalid email', () => {
      const retVal = CommonActions.validateFieldRules(null, emailField1, true);

      expect(retVal).toEqual(false);
    });

    it('validate email field with valid email', () => {
      const retVal = CommonActions.validateFieldRules(null, emailField, true);

      expect(retVal).toEqual(true);
    });

    it('validate email field with invalid email', () => {
      const retVal = CommonActions.validateFieldRules(null, emailField1, true);

      expect(retVal).toEqual(false);
    });

    it('validate Date field with valid date', () => {
      const retVal = CommonActions.validateFieldRules(null, dateField, true);

      expect(retVal).toEqual(false);
    });

    it('validate Date field with invalid date', () => {
      const retVal = CommonActions.validateFieldRules(null, dateField1, true);

      expect(retVal).toEqual(false);
    });

    it('validate form checkbox fields', () => {
      const retVal = CommonActions.validateFieldRules(null, input2, true);

      expect(retVal).toEqual(true);
    });
  });

  describe('clearActionForm', () => {
    it('it should clear the actions', () => {
      const form = createElement.form('hccf-card-action-form');
      const div = createElement.div('div1', 'hccf-form-field');
      const span = createElement.span('hccf-form-field__validation-error-dot');
      const input1 = createElement.formInput('checkBox', 'radioOptions', 'checkbox', 'val1');
      const input2 = createElement.formInput('checkBox', 'radioOptions',
        'checkbox', 'val2', 'checked', null, null, 'required');
      const input3 = createElement.formInput('checkBox', 'radioOptions', 'checkbox', 'val3');
      const div1 = createElement.div('innerDiv', 'hccf-form-field__validation-message');
      const span1 = createElement.span(null, 'Comment is required');
      div1.appendChild(span1);
      span.appendChild(input1);
      span.appendChild(input2);
      span.appendChild(input3);
      div.appendChild(span);
      div.appendChild(div1);
      form.appendChild(div);
      const submitButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
        '', 'data-actionkey',
        'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');
      form.appendChild(submitButton);
      document.body.appendChild(form);

      CommonActions.clearActionForm(form);

      expect(span.className).not.toContain('hccf-form-field__validation-error-dot');
    });
  });
});

