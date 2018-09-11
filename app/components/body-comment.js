import React from 'react';
import _ from 'lodash';

export default function BodyCommentComponent({ comment }) {
  return (
    <div>
      <p className="hccf-card-body__comments-title">{comment.title}:</p>
      {comment.content.map((content, index) =>
        <div className="hccf-card-body__comments-body" key={`comments-${index}`}>
          {_.escape(content.text)}
        </div>
      )}
    </div>
  );
}