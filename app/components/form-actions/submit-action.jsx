import React from 'react';
import HeroCardActions from '../../utility/actions';

/**
 * Doc
 */
const submitAction = (props) => {
    return(
        <div className="hccf-card-actions__item hccf-card-actions__item hccf-card-actions__item--primary">
            <a id={`${props.cardID}__${props.action.id}__submit`}
            className="hccf-card-actions__item-link hccf-card-actions__item-link--disabled hccf-js-input-button-submit"
            onClick={event => HeroCardActions.UserInput.submitInput(event, event.target)}
            >{props.action.label}</a>
        </div>
    )
}

/**
 * Exports
 */
export default submitAction;
