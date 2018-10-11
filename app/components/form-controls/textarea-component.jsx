import React from 'react';
import PropTypes from 'prop-types';

/**
 * TextArea Component
 */

function TextAreaComponent(props) {
  return (
    <textarea
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      data-field-label={props.dataFieldLabel}
      data-validation={props.dataValidation ? props.dataValidation : undefined}
      onKeyUp={event => props.onKeyUp(event, event.currentTarget)}
    />
  );
}

TextAreaComponent.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  dataFieldLabel: PropTypes.string,
  dataValidation: PropTypes.string,
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func,
};

TextAreaComponent.defaultProps = {
  name: '',
  id: '',
  dataFieldLabel: '',
  dataValidation: '',
  onKeyUp() {},
  placeholder: '',
};

export default TextAreaComponent;
