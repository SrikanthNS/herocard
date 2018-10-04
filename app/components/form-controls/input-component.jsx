import React from 'react';
import PropTypes from 'prop-types';

/**
 * Text Component
 */

function InputComponent(props) {
  return (<input
    autoComplete="off"
    type="text"
    name={props.name}
    id={props.id}
    data-field-label={props.dataFieldLabel}
    data-validation={props.dataValidation ? props.dataValidation : undefined}
    onKeyUp={event => props.onKeyUp(event, event.currentTarget)}
    onBlur={event => props.onBlur(event, event.currentTarget)}
  />
  );
}

InputComponent.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  dataFieldLabel: PropTypes.string,
  dataValidation: PropTypes.string,
  onKeyUp: PropTypes.func,
  onBlur: PropTypes.func,
};

InputComponent.defaultProps = {
  name: '',
  id: '',
  placeholder: '',
  dataFieldLabel: '',
  dataValidation: '',
  onKeyUp() {},
  onBlur() {},
};


export default InputComponent;
