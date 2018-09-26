import React, { Component } from 'react';
import './styles.scss';

export default class FormFieldsComponent extends Component {
  constructor(props) {
    super(props);
    this.createFormField = this.createFormField.bind(this);
  }

   //create form field
  createFormField() {
    const { formID, userInput, fieldOptions } = this.props;
    if (!userInput) { return; }

    // console.log(userInput);
    const fieldLabel = userInput.label ? (`<label>${userInput.label}: </label>`) : '';
    const isFormatPresent = userInput.format || 'TEXT';
    const fieldType = isFormatPresent.toUpperCase();
    let fieldClass = `hccf-form-field hccf-form-field--${userInput.format}`;
    let control = '';
    const controlName = userInput.id;
    let controlAttrStr = ` data-field-label="${userInput.label}"`;
    let handlers = {};

    const validationHandler = 'HeroCard.Actions.Common.validateFieldRules(event, element)';

    if (fieldOptions) {
      handlers = JSON.parse(fieldOptions);
    }

    if (userInput.validation !== undefined) {
      controlAttrStr += `${' ' + 'data-validation="'}${userInput.validation.join()}" `;
      fieldClass += ' hccf-form-field--required';

      switch (fieldType) {
        case 'SELECT':
          handlers.change = validationHandler;
          break;

        case 'RADIO':
        case 'CHECKBOX':
          handlers.click = validationHandler;
          break;
        case 'TEXTAREA':
          controlAttrStr += `${' ' + 'placeholder="'}${userInput.label}" `;
          break;
        case 'DATE':
        case 'EMAIL':
        case 'TEL':
        case 'NUMBER':
        case 'TEXT':
          handlers.blur = validationHandler;
      }
    }

    control = HeroCard.Utility.createFormField(userInput.format, userInput, controlAttrStr, handlers, formID);

    const validationMessage = '<div class="hccf-form-field__validation-message">'
      + '<span>error message</span>'
      + '</div>';

    const retStr = `<div class="${fieldClass}"> ${
      fieldLabel
      }<span>${control}</span>${
      validationMessage
      }</div>`;
    return retStr;
  }

  render() {
    const htmlStr = this.createFormField();
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlStr }} />
    );
  }
}
