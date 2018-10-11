import React from 'react';
import PropTypes from 'prop-types';
import HeroCardActions from '../../utility/actions';

/**
 * Doc
 */
const SubmitAction = props => (
  <div className="hccf-card-actions__item hccf-card-actions__item hccf-card-actions__item--primary">
    <a
      id={`${props.cardID}__${props.action.id}__submit`}
      className="hccf-card-actions__item-link hccf-card-actions__item-link--disabled hccf-js-input-button-submit"
      onClick={event => HeroCardActions.UserInput.submitInput(event, event.target)}
    >{props.action.label}</a>
  </div>
);

SubmitAction.propTypes = {
  cardID: PropTypes.string.isRequired,
  action: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

/**
 * Exports
 */
export default SubmitAction;
