import React from 'react';
import PropTypes from 'prop-types';
import HeroCardActions from '../../utility/actions';

/**
 * Doc
 */
const CancelAction = props => (
  <a
    id={`${props.cardID}__${props.action.id}__cancel`}
    className="hccf-card-actions__item-link hccf-js-input-button-cancel"
    onClick={event => HeroCardActions.UserInput.hideInputForm(event, event.target)}
  >Cancel</a>
);

CancelAction.propTypes = {
  cardID: PropTypes.string.isRequired,
  action: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

/**
 * Exports
 */
export default CancelAction;
