import React, { Component } from 'react';
import _ from 'lodash';
import { InputComponent, TextAreaComponent, SelectComponent } from '../common';

const FIELD_TYPES = {
  SELECT: 'SELECT',
  TEXTAREA: 'TEXTAREA',
  TEXT: 'TEXT',
};

export default class FieldElelmentComponent extends Component {
  render() {
    const { userInput, formID } = this.props;
    const isFormatPresent = userInput.format || FIELD_TYPES.TEXT;
    const fieldType = _.toUpper(isFormatPresent);
    switch (fieldType) {
      case FIELD_TYPES.SELECT:
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
      case FIELD_TYPES.TEXTAREA:
        return (<TextAreaComponent
          name={userInput.id}
          id={`${formID}__${userInput.id}`}
          placeholder={userInput.label}
          dataFieldLabel={userInput.label}
          dataValidation={userInput.validation ? userInput.validation.join() : undefined}
          onKeyUp={HeroCard.Actions.UserInput.checkUserInput}
        />);
      case FIELD_TYPES.TEXT:
        return (<InputComponent
          type={userInput.format}
          name={userInput.id}
          id={`${formID}__${userInput.id}`}
          dataFieldLabel={userInput.label}
          dataValidation={userInput.validation ? userInput.validation.join() : undefined}
          onBlur={HeroCard.Actions.Common.validateFieldRules}
          onKeyUp={HeroCard.Actions.UserInput.checkUserInput}
        />);
      default: return null;
    }
  }
}
