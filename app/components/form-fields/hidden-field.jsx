import React from 'react';

const hiddenField= (props) => {
    return (
        <input type="hidden" name={props.name} id={props.name} value={props.value} />
    ) ;
};

export default hiddenField;