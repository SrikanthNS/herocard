import React from 'react';
import HeroCardActions from '../../utility/actions';

/**
 * Doc
 */
const cancelAction = (props) => {
    return(
        <a id={`${props.cardID}__${props.action.id}__cancel`}
        className="hccf-card-actions__item-link hccf-js-input-button-cancel"
        onClick={event => HeroCardActions.UserInput.hideInputForm(event, event.target)}
        >Cancel</a>
    )
}

/**
 * Exports
 */
export default cancelAction;
