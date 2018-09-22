import React from 'react';
import _ from 'lodash';
import CardHolder from '../card-holder';
import styles from './styles.scss';

/**
 * Section Pure component 
 * @param {object} - content
 * @param {function} - handle is a function passed from parent component is a onclock handelr
 * @param {number} - isCardExpanded is the index of the card if card is expanded else -1
 * @return {JSX} - will have card image, description and cardHolder component
 */

export default function Section({ content, selectCard, isCardExpanded }) {
  const imageMap = {
    'BOOMI SFDC': require('../../images/Boomi@3x.png'),
    SOCIALCAST: require('../../images/Socialcast@3x.png'),
    SERVICENOW: require('../../images/ServiceNow@3x.png'),
    SALESFORCE: require('../../images/Salesforce@3x.png'),
    JIRA: require('../../images/Jira@3x.png'),
    CONCUR: require('../../images/Concur@3x.png'),
  };

  const imageSrc = (content.name && imageMap[_.toUpper(content.name)])
    ? imageMap[_.toUpper(content.name)]
    : require('../../images/Generic@3x.png');

  return (
    <div
      className={`hccf-hero-card ${isCardExpanded ? 'open' : ''} ${HeroCard.Utility.callbackClasses(content)}`}
      onClick={selectCard}
    >
      <div className="hccf-card-header">
        <div className="hccf-card-header__wrapper col-12 col-sm-12 col-md-12">
          <div className="hccf-card-header__avatar">
            <div>
              <span>{imageSrc[content.name]}</span>
              <img alt="avatar" src={imageSrc} />
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
        className={`hccf-row hccf-card-body ${isCardExpanded ? 'open' : ''}`}
      >
        {isCardExpanded ? <CardHolder cardContent={content} /> : null}
      </div>
    </div>
  );
}

