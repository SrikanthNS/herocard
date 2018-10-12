import React from 'react';
import PropTypes from 'prop-types';

/**
 * Doc
 */
const FieldLabel = props => (
  <label>{props.labelText}</label>
);


FieldLabel.propTypes = {
  labelText: PropTypes.string.isRequired,
};
/**
 * Exports
 */
export default FieldLabel;

