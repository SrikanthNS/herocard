import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './styles.scss';

/**
 *BodyCommentComponent
 * @param {object} field
 * @returns {JSX}
 */

export class BodyCommentComponent extends React.Component {
  render() {
    const { field } = this.props;
    return (
      <div>
        <p className="hccf-card-body__comments-title">{field.title}:</p>
        {_.map(field.content, (content, index) => (
          <div className="hccf-card-body__comments-body" key={`comments-${index}`}>
            {_.escape(content.text)}
          </div>
        ))}
      </div>
    );
  }
}

BodyCommentComponent.propTypes = {
  field: PropTypes.object.isRequired,
};

export default BodyCommentComponent;
