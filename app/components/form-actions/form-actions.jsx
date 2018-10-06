import React from 'react';
import CancelAction from './cancel-action';
import SubmitAction from './submit-action';

/**
 * Doc
 */
const formActions = (props) => {
    return (
        <div>
            <div className="hccf-card-actions__item">
                <CancelAction cardID={props.cardID} action={props.action} />
                <SubmitAction cardID={props.cardID} action={props.action} />
            </div>
        </div>
    );
};

/**
 * Exports
 */
export default formActions;