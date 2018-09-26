import React from 'react';

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
      onKeyUp={(event) => props.onKeyUp(event, event.currentTarget)}
    />
  );
}

export default TextAreaComponent;
