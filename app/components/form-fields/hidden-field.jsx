import React from 'react';
import PropTypes from 'prop-types';

const HiddenField = props => (
  <input type="hidden" name={props.name} id={props.name} value={props.value} />
);

HiddenField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default HiddenField;
