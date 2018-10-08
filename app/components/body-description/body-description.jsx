import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

/**
 * BodyDescriptionComponent
 * Shows card body description
 * 
 * @method render (React LifeCycle method)
 */
export class BodyDescriptionComponent extends React.Component {
  /**
   * @method render (React LifeCycle method)
   * Return card body description
   */
  render() {
    return (
      <div className="col-12 col-sm-12 hccf-card-body__description">
        {_.escape(this.props.description)}
      </div>
    );
  }
}

BodyDescriptionComponent.propTypes = {
  description: PropTypes.string.isRequired,
};

export default BodyDescriptionComponent;

