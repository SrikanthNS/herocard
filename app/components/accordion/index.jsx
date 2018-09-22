import React, { Component } from 'react';
import _ from 'lodash';
import Section from '../section';

/**
 * Accordion
 * method: componentDidMount (React LifeCycle method)
 * method: selectCard (React LifeCycle method)
 * method: render
 */

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedCardIndex: -1,
    };
    this.selectCard = this.selectCard.bind(this);
  }

  componentDidMount() {
    // Initialize custom event emitter object
    HeroCard.initEventEmitter();
  }

  /**
   * selectCard function to expand/collapse card
   * @param {object} - event body object
   * @return {number} - current is the index of the card
   */

  selectCard(event, current) {
    if (_.includes(event.target.className, 'hccf-card-header__meta') ||
      _.includes(event.target.className, 'hccf-hero-card open') ||
      _.includes(event.target.className, 'hccf-hero-card')) {
      const stateNum = this.state.expandedCardIndex === current ? -1 : current;
      this.setState(() => ({ expandedCardIndex: stateNum }));
    }
  }

  /**
   * React lifecycle method render() method
   * Iterates over property: contents and pass each content to Section component as property
   * @return {JSX}
   */

  render() {
    return (
      <div>
        {_.map(this.props.contents, (content, index) => (
          <Section
            key={index}
            content={content}
            selectCard={e => this.selectCard(e, index)}
            isCardExpanded={index === this.state.expandedCardIndex}
          />
        ))}
      </div>
    );
  }
}
