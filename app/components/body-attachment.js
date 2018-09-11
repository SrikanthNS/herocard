import React from 'react';
import { Link } from 'react-router-dom';

export default function BodyAttachmentComponent({ comment }) {
  return (
    <div className="col-12 col-sm-12  hccf-card-body__attachments">
      <p><Link to={{
        pathname: '/attachPopOver',
        state: { comment: comment }
      }}>
        {comment.content.length}
        {comment.title}
      </Link>
      </p>
    </div>
  );
}