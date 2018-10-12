import React from 'react';
import PropTypes from 'prop-types';
import CancelAction from './cancel-action';
import SubmitAction from './submit-action';

/**
 * Doc
 */
const FormActions = (props) => {
  return (
    <div>
      <div className="hccf-card-actions__item">
        <CancelAction cardID={props.cardID} action={props.action} />
        <SubmitAction cardID={props.cardID} action={props.action} />
      </div>
    </div>
  );
};

FormActions.propTypes = {
  cardID: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired,
};

/**
 * Exports
 */
export default FormActions;
