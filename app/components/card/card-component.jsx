import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHolder from '../card-holder';
import { CardHeaderComponent } from '../card-header';
import HeroCardUtility from '../../utility/utility';
import './styles.scss';

/**
 * Card Component
 * @prop {method} setExpandedCardIndex
 * @prop {number} expandedCardIndex
 * @prop {number} cardIndex
 * @prop {object} content
 * @private {method} handleclick
 * @private {method} render (React LifeCycle method)
 * @private {method} componentWillReceiveProps (React LifeCycle method)
 */

export default class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, index) {
    const { setExpandedCardIndex } = this.props;
    setExpandedCardIndex(index);
  }

  render() {
    const { content, cardIndex, expandedCardIndex } = this.props;
    const isExpanded = expandedCardIndex === cardIndex;
    const { id, connector_id } = content;
    let cardClasses = 'hccf-hero-card';
    cardClasses += isExpanded ? ' open ' : ' ';
    cardClasses += HeroCardUtility.callbackClasses(content);

    return (
      <div className={cardClasses}
           id={`${id}__${id}__card`}
           data-card-id={id}
           data-card-connector={connector_id}>

        <CardHeaderComponent
          cardIndex={cardIndex}
          handleClick={this.handleClick}
          content={content}
          isExpanded={isExpanded}
        />
        {isExpanded ? <CardHolder cardContent={content} /> : null}
      </div>
    );
  }
}

CardComponent.propTypes = {
  content: PropTypes.object.isRequired,
  cardIndex: PropTypes.number.isRequired,
  expandedCardIndex: PropTypes.number.isRequired,
  setExpandedCardIndex: PropTypes.func.isRequired,
};
