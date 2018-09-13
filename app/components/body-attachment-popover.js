import React from 'react';
import { Link } from 'react-router-dom';

export default function BodyAttachmentPopOverComponent({ location }) {
  return (
    <div className="hccf-card-body__attachments-preview hccf-card-body__attachments-preview--visible">
      <h3>
        <Link to="/" className="hccf-card-body__attachments--close">
          <img alt="Close" src={window.HeroCard.Utility.imgPath('icon-back.png')} />
        </Link> {location.state.comment.content.length} {location.state.comment.title}
      </h3>
      {location.state.comment.content.map((content, index) =>
        (<div className="hccf-card-body__attachments-row" key={index}>
          <div>
            <img src={window.HeroCard.Utility.imgPath(content.src)} width="30" alt="" title="" />
          </div>
          <div>
            <h3>{content.title}</h3>
            <p>
              <span>{content.timestamp}</span>
              <span>&middot;</span>
              <span>{content.size}</span>
            </p>
          </div>
        </div>)
      )}
    </div>
  );
}