import React from 'react';

export default function BodyTripInfoPopOverComponent({ tripInfo }) {
  return (
    <div className="hccf-card-body__tripinfo-preview hccf-animated">
      {tripInfo.summary &&
        <div className="hccf-card-body__tripinfo-row hccf-card-body__tripinfo-summary">
          <h3>{tripInfo.summary.event}</h3>
          <p>{tripInfo.summary.date}</p>
          {tripInfo.summary.others.map((other, index) =>
            <p key={index}>{other}</p>
          )}
        </div>
      }

      {tripInfo.trips.map((trip, index) =>
        (<div key={index} className="hccf-card-body__tripinfo-row hccf-card-body__tripinfo-detail">
          <h3>{trip.date}</h3>
          <div>
            <div>
              <img src={HeroCard.Utility.imgPath('tripinfo-departure.png')} title="Departure" alt="Departure" width="30" />
            </div>
            <div>
              <h3>{trip.time}</h3>
            </div>
            <div>
              <h3>{trip.destination}</h3>
              <p>{trip.flight}</p>
              <p>
                <span>Terminal {trip.terminal ? trip.terminal : '--'}</span>
                <span>Gate {trip.gate ? trip.gate : '--'}</span>
              </p>
            </div>
          </div>
        </div>)
      )}
    </div>
  );
}