import React from 'react';

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
    onKeyUp={(event) => props.onKeyUp(event, event.currentTarget)}
    onBlur={(event) => props.onBlur(event, event.currentTarget)}
  />
  );
}

export default InputComponent;
