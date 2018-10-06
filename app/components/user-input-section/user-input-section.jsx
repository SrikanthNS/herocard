import React from 'react';
import { FormFieldsComponent } from '../form-fields';
import FormActions from '../form-actions/form-actions';

/**
 * Doc
 */
const userInputSection = (props) => {
    const { action, cardID } = props;

    return(
        <div className={props.className} >
            <FormFieldsComponent fields={action.user_input} formID={action.id} />
            <FormActions cardID={cardID} action={action} />
        </div>
    )
};

/**
 * Exports
 */
export default userInputSection;