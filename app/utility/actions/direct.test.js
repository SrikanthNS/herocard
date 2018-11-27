/* eslint-disable func-names */
import _ from 'lodash';
import CommonActions from './common';
import DirectActions from './direct';

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

describe('CommonActions', () => {
  describe('openUrlLocation', () => {
    const form = createElement.form('hccf-card-action-form');
    const div = createElement.div('div1', 'hccf-form-field');
    const span = createElement.span('hccf-form-field__validation-error-dot');

    // Form Fields
    const input1 = createElement.formInput('checkBox', 'radioOptions', 'checkbox', 'val1');
    const submitButton = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
      'hccf-card-actions__item-link hccf-card-actions__item-link--primary', 'data-actionkey',
      'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');
    const submitButton1 = createElement.actionButton('__6bf64604-1393-4076-aeab-30a91276e20d',
      'hccf-card-actions__item-link--complete hccf-card-actions__item-link hccf-card-actions__item-link--primary', 'data-actionkey',
      'Add contact', 'hccf-js-input-add-section', 'hccf-card-action-form');
    span.appendChild(input1);
    div.appendChild(span);
    form.appendChild(div);
    form.appendChild(submitButton);
    form.appendChild(submitButton1);
    document.body.appendChild(form);

    beforeEach(() => {
      spyOn(CommonActions, 'encodeRoswellActionURLAndNavigate');
    });

    it('should disable action button and return true', () => {
      const retVal = DirectActions.openUrlLocation(null, submitButton);

      expect(CommonActions.encodeRoswellActionURLAndNavigate).toHaveBeenCalled();
      expect(retVal).toEqual(true);
    });

    it('should return false', () => {
      const retVal = DirectActions.openUrlLocation(null, submitButton1);

      expect(CommonActions.encodeRoswellActionURLAndNavigate).not.toHaveBeenCalled();
      expect(retVal).toEqual(false);
    });
  });
});
