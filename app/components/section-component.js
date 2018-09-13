import React, { Component } from 'react';
import CardHolder from './card-holder';

export default function Section({ content, handle, active }) {
  const imageMap = {
    'BOOMI SFDC': require('../images/Boomi@3x.png'),
    SOCIALCAST: require('../images/Socialcast@3x.png'),
    SERVICENOW: require('../images/ServiceNow@3x.png'),
    SALESFORCE: require('../images/Salesforce@3x.png'),
    JIRA: require('../images/Jira@3x.png'),
    CONCUR: require('../images/Concur@3x.png'),
  };

  const imageSrc = (content.name && imageMap[content.name.toUpperCase()])
    ? imageMap[content.name.toUpperCase()]
    : require('../images/Generic@3x.png');
  return (
    <div
      className={`hccf-hero-card ${active ? 'open' : ''} ${HeroCard.Utility.callbackClasses(content)}`}
      onClick={handle}
    >
      <div className="hccf-card-header">
        <div className="hccf-card-header__wrapper col-12 col-sm-12 col-md-12">
          <div className="hccf-card-header__avatar">
            <div>
              <span>{imageSrc[content.name]}</span>
              <img src={imageSrc} />
            </div>
          </div>
          <div className="hccf-card-header__meta">
            <div className="hccf-card-header__meta-title">
              {content.header.title}
            </div>
            <div className="hccf-card-header__meta-subtitle">
              {content.header.subtitle}
            </div>
          </div>
        </div>
      </div>
      <div
        key="content"
        className={`hccf-row hccf-card-body ${active ? 'open' : ''}`}
      >
        {active ? <CardHolder prop={content} /> : null}
      </div>
    </div>
  );
}

