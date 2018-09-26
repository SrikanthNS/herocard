import React from 'react';
import _ from 'lodash';
import './styles.scss';

/**
 * CardHeaderComponent
 * Shows card header content
 *
 * @method render (React LifeCycle method)
 */

const imageMap = {
  'BOOMI SFDC': 'Boomi@3x.png',
  SOCIALCAST: 'Socialcast@3x.png',
  SERVICENOW: 'ServiceNow@3x.png',
  SALESFORCE: 'Salesforce@3x.png',
  JIRA: 'Jira@3x.png',
  CONCUR: 'Concur@3x.png',
};

export default class CardHeaderComponent extends React.Component {
  /**
   * @method render (React LifeCycle method)
   * Return card header content   */
  render() {
    const { isExpanded, cardIndex, content, handleClick } = this.props;
    const imageSrc = (content.name && imageMap[_.toUpper(content.name)])
      ? imageMap[_.toUpper(content.name)]
      : 'Generic@3x.png';
    return (
      <div className="hccf-card-header" onClick={e => handleClick(e, cardIndex)}>
        <div className="hccf-card-header__wrapper col-12 col-sm-12 col-md-12">
          <div className="hccf-card-header__avatar">
            <div>
              <span>{imageSrc[content.name]}</span>
              <img alt="avatar" src={HeroCard.Utility.imgPath(imageSrc)} />
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
    );
  }
}
