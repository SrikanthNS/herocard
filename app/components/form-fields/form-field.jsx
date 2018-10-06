import React, { Component } from 'react';
import _ from 'lodash';
import FieldElementComponent from './form-element';
import FieldLabel from './field-label';
import FieldValidation from './field-validation';

export default class FieldComponent extends Component {
  render() {
    const { userInput, formID } = this.props;
    let fieldClass = `hccf-form-field hccf-form-field--${userInput.format}`;
    
    if (!_.isUndefined(userInput.validation)) {
      fieldClass += ' hccf-form-field--required';
    }

    // Check for field label
    let fieldLabel = null;
    if(userInput.label) {
      fieldLabel = (
        <FieldLabel labelText={userInput.label} />
      );
    }
    
    return (
      <div className={fieldClass}>
        {fieldLabel}
        <FieldElementComponent userInput={userInput} formID={formID} />
        <FieldValidation />
      </div>
    );
  }
}
