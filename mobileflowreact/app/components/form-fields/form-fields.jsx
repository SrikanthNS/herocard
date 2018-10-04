import React, { Component } from 'react';
import _ from 'lodash';
import FieldComponent from './form-field';
import './styles.scss';

export default class FormFieldsComponent extends Component {
  render() {
    const { userInput, formID } = this.props;
    return (
      <div>{userInput ? <FieldComponent userInput={userInput} formID={formID} /> : null }</div>
    );
  }
}
