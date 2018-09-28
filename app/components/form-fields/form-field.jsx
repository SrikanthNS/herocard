import React, { Component } from 'react';
import _ from 'lodash';
import FieldElelmentComponent from './form-element';

export default class FieldComponent extends Component {
  render() {
    const { userInput, formID } = this.props;
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
          <FieldElelmentComponent userInput={userInput} formID={formID} />
        </span>
        <div className="hccf-form-field__validation-message">
          <span>error message</span>
        </div>
      </div>
    );
  }
}
