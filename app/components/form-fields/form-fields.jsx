import React, { Component } from 'react';
import _ from 'lodash';
import FieldComponent from './form-field';
import './styles.scss';

export default class FormFieldsComponent extends Component {
  render() {
    const fields = this.props.fields || [];
    const formID = this.props.formID;

    return (
      <div>
        {
          fields.map((field, index) => {
            return <FieldComponent key={index} userInput={field} formID={formID} />;
          })
        }
      </div>
    );
  }
}
