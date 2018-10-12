import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FieldComponent from './form-field';
import './styles.scss';

export class FormFieldsComponent extends Component {
  render() {
    const fields = this.props.fields || [];
    const formID = this.props.formID;

    return (
      <div>
        {
          _.map(fields, (field, index) =>
            <FieldComponent key={index} userInput={field} formID={formID} />
          )
        }
      </div>
    );
  }
}

FormFieldsComponent.propTypes = {
  fields: PropTypes.array.isRequired,
  formID: PropTypes.string.isRequired,
};

export default FormFieldsComponent;
