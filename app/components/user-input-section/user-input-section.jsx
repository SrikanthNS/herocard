import React from 'react';
import PropTypes from 'prop-types';
import { FormFieldsComponent } from '../form-fields';
import FormActions from '../form-actions/form-actions';

/**
 * Doc
 */
const UserInputSection = (props) => {
  const { action, cardID, className } = props;

  return (
    <div className={className} >
      <FormFieldsComponent fields={action.user_input} formID={action.id} />
      <FormActions cardID={cardID} action={action} />
    </div>
  );
};

UserInputSection.propTypes = {
  cardID: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  action: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user_input: PropTypes.array.isRequired,
  }).isRequired,
};

/**
 * Exports
 */
export default UserInputSection;
