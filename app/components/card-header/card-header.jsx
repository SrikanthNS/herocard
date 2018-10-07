import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import HeroCardUtility from '../../utility/utility';
import './styles.scss';

/**
 * CardHeaderComponent
 * Shows card header content
 *
 * @method render (React LifeCycle method)
 */

export const IMAGE_MAP = {
  'BOOMI SFDC': 'Boomi@3x.png',
  SOCIALCAST: 'Socialcast@3x.png',
  SERVICENOW: 'ServiceNow@3x.png',
  SALESFORCE: 'Salesforce@3x.png',
  JIRA: 'Jira@3x.png',
  CONCUR: 'Concur@3x.png',
};

export class CardHeaderComponent extends React.Component {
  /**
   * @method render (React LifeCycle method)
   * Return card header content   */
  render() {
    const { isExpanded, cardIndex, content, handleClick } = this.props;
    const imageSrc = (content.name && IMAGE_MAP[_.toUpper(content.name)])
      ? IMAGE_MAP[_.toUpper(content.name)]
      : 'Generic@3x.png';
    return (
      <div className={`hccf-card-header ${isExpanded ? 'open' : ''}`} onClick={e => handleClick(e, cardIndex)}>
        <div className="hccf-card-header__wrapper col-12 col-sm-12 col-md-12">
          <div className="hccf-card-header__avatar">
            <div>
              <img alt="avatar" src={HeroCardUtility.imgPath(imageSrc)} />
            </div>
          </div>
          <div className="hccf-card-header__meta" onClick={e => handleClick(e, cardIndex)}>
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

CardHeaderComponent.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  cardIndex: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CardHeaderComponent;
