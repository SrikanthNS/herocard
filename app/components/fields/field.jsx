import React from 'react';
import PropTypes from 'prop-types';
import { BodyGeneralComponent } from '../body-general';
import { BodyCommentComponent } from '../body-comment';

/**
 * FieldComponent
 * Render various components depending on the field type
 *
 * @method render  (React LifeCycle method)
 * @method renderField - Return card field components
 */
export class FieldComponent extends React.Component {
  /**
   * @constructor
   * @param props - Properties object
   */
  constructor(props) {
    super(props);

    // bind custom methods
    this.renderField = this.renderField.bind(this);
  }

  /**
   * @method renderField
   * @param {number} index - Index value
   * @param {object} field - Card field object
   */
  renderField(index, field) {
    switch (field.type) {
      case 'COMMENT':
        return <BodyCommentComponent key={index} field={field} />;
      case 'GENERAL':
        return <BodyGeneralComponent key={index} field={field} />;
      default:
        return null;
    }
  }

  /**
   * @method render (React LifeCycle method)
   * Return various components depending on the field type
   */
  render() {
    const { index, field } = this.props;

    return (
      <div>
        {this.renderField(index, field)}
      </div>
    );
  }
}

FieldComponent.propTypes = {
  index: PropTypes.string,
  field: PropTypes.object.isRequired,
};

FieldComponent.defaultProps = {
  index: null,
};

export default FieldComponent;
