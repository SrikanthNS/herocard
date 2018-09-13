import React from 'react';
import BodyTripInfoPopOverComponent from './body-trip-info-popover';

export default function BodyTripInfoComponent({ comment }) {
  return (
    <div className="col-12 col-sm-12  hccf-card-body__field hccf-card-body__tripinfo">
      {comment.content.map((content, index) =>
        (<div className="hccf-row" key={index}>
          <div className="col-3 col-sm-3 col-md-2 hccf-card-body__field-title" style={{ width: `${55}px` }}>
            {content.image ? <img style={{ width: `${40}px` }} src={HeroCard.Utility.imgPath(content.image)} /> : content.title}
          </div>
          <div className="col-9 col-sm-9 col-md-10 hccf-card-body__field-description">
            {content.text}
          </div>
        </div>)
      )}
      {comment.trip_details ? <BodyTripInfoPopOverComponent tripInfo={comment.trip_details} /> : ''}
    </div>
  );
}
