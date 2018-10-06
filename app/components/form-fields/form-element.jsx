import React, { Component } from 'react';
import _ from 'lodash';
import { InputComponent, TextAreaComponent, SelectComponent } from '../form-controls';
import HeroCardActions from '../../utility/actions';

const FIELD_TYPES = {
  SELECT: 'SELECT',
  TEXTAREA: 'TEXTAREA',
  TEXT: 'TEXT',
};

/**
 * Doc
 */
export default class FieldElementComponent extends Component {
  render() {
    const { userInput, formID } = this.props;
    const isFormatPresent = userInput.format || FIELD_TYPES.TEXT;
    const fieldType = _.toUpper(isFormatPresent);
    let element = null;
    
    switch (fieldType) {
      case FIELD_TYPES.SELECT:
        element = (<SelectComponent
          name={userInput.id}
          id={`${formID}__${userInput.id}`}
          options={userInput.options}
          selected={userInput.selected}
          dataFieldLabel={userInput.label}
          dataValidation={userInput.validation ? userInput.validation.join() : undefined}
          onKeyUp={HeroCardActions.UserInput.checkUserInput}
          onChange={HeroCardActions.Common.validateFieldRules}
        />);
        break;

      case FIELD_TYPES.TEXTAREA:
        element = (<TextAreaComponent
          name={userInput.id}
          id={`${formID}__${userInput.id}`}
          placeholder={userInput.label}
          dataFieldLabel={userInput.label}
          dataValidation={userInput.validation ? userInput.validation.join() : undefined}
          onKeyUp={HeroCardActions.UserInput.checkUserInput}
        />);
        break;

      case FIELD_TYPES.TEXT:
        element =  (<InputComponent
          type={userInput.format}
          name={userInput.id}
          id={`${formID}__${userInput.id}`}
          dataFieldLabel={userInput.label}
          dataValidation={userInput.validation ? userInput.validation.join() : undefined}
          onBlur={HeroCardActions.Common.validateFieldRules}
          onKeyUp={HeroCardActions.UserInput.checkUserInput}
        />);
        break;
    }

    return (
      <span>{element}</span>  
    )
  }
}
