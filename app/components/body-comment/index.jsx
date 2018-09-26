import React from 'react';
import _ from 'lodash';
import './styles.scss';

/**
 *BodyCommentComponent
 * @param {object} field
 * @returns {JSX}
 */
export default function BodyCommentComponent({ field }) {
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
