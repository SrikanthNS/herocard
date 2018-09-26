import React, { Component } from 'react';
import _ from 'lodash';
import './styles.scss';

import { InputComponent, TextAreaComponent, SelectComponent } from '../common';

export default class FormFieldsComponent extends Component {
  constructor(props) {
    super(props);
    this.getFormField = this.getFormField.bind(this);
    this.getFieldElement = this.getFieldElement.bind(this);
  }

  getFieldElement(formID, userInput) {
    const isFormatPresent = userInput.format || 'TEXT';
    const fieldType = _.toUpper(isFormatPresent);
    switch (fieldType) {
      case 'SELECT':
        return (<SelectComponent
          name={userInput.id}
          id={`${formID}__${userInput.id}`}
          options={userInput.options}
          selected={userInput.selected}
          dataFieldLabel={userInput.label}
          dataValidation={userInput.validation ? userInput.validation.join() : undefined}
          onKeyUp={HeroCard.Actions.UserInput.checkUserInput}
          onChange={HeroCard.Actions.Common.validateFieldRules}
        />);
      case 'TEXTAREA':
        return (<TextAreaComponent
          name={userInput.id}
          id={`${formID}__${userInput.id}`}
          placeholder={userInput.label}
          dataFieldLabel={userInput.label}
          dataValidation={userInput.validation ? userInput.validation.join() : undefined}
          onKeyUp={HeroCard.Actions.UserInput.checkUserInput}
        />);
      case 'TEXT':
        return (<InputComponent
          type={userInput.format}
          name={userInput.id}
          id={`${formID}__${userInput.id}`}
          dataFieldLabel={userInput.label}
          dataValidation={userInput.validation ? userInput.validation.join() : undefined}
          onBlur={HeroCard.Actions.Common.validateFieldRules}
          onKeyUp={HeroCard.Actions.UserInput.checkUserInput}
        />);
    }
  }

  getFormField({ formID, userInput }) {
    let fieldClass = `hccf-form-field hccf-form-field--${userInput.format}`;
    if (!_.isUndefined(userInput.validation)) {
      fieldClass += ' hccf-form-field--required';
    }

    return (
      <div className={fieldClass}>
        {userInput.label ?
          <label>
            {`${userInput.label}: `}
          </label> :
          ''
        }
        <span>
          {this.getFieldElement(formID, userInput)}
        </span>
        <div className="hccf-form-field__validation-message">
          <span>error message</span>
        </div>
      </div>
    );
  }

  render() {
    const { userInput } = this.props;
    return (
      <div>
        {userInput ?
          this.getFormField(this.props) :
          null
        }
      </div>
    );
  }
}
