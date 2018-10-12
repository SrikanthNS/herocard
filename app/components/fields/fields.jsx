import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FieldComponent } from './index';

/**
 * FieldsComponent
 * Loops through `fields` and render `FieldComponent` with passed-in `field` data
 *
 * @method render (React LifeCycle method)
 */
export class FieldsComponent extends React.Component {
  /**
     * @method render (React LifeCycle method)
     * Return `FieldComponent`s depending of the `numOfFieldsToShow`
     */
  render() {
    const { numOfFieldsToShow, fields } = this.props;
    const fieldsToShow = fields.slice(0, numOfFieldsToShow);

    return (
      _.map(fieldsToShow, (field, index) => <FieldComponent key={index} field={field} />)
    );
  }
}

FieldsComponent.propTypes = {
  numOfFieldsToShow: PropTypes.number.isRequired,
  fields: PropTypes.array.isRequired,
};

export default FieldsComponent;
