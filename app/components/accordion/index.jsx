import React, { Component } from 'react';
import _ from 'lodash';
import Section from '../section';

/**
 * Accordion
 * method: render
 */

export default class Accordion extends Component {

  constructor(props) {
    super(props);
    this.state = { expandedCardIndex: -1 };
    this.setExpandedCardIndex = this.setExpandedCardIndex.bind(this);
  }
  componentDidMount() {
    // Initialize custom event emitter object
    HeroCard.initEventEmitter();
  }

  setExpandedCardIndex(cardIndex) {
    this.setState({ expandedCardIndex: cardIndex });
  }

  expandedSection() {

  }

  /**
   * React lifecycle method render() method
   * Iterates over property: contents and pass each content to Section component as property
   * @return {JSX}
   */

  render() {
    const { expandedCardIndex } = this.state;
    return (
      <div>
        {_.map(this.props.contents, (content, index) => (
          <Section
            cardIndex={index}
            content={content}
            key={index}
            expandedCardIndex={expandedCardIndex}
            setExpandedCardIndex={this.setExpandedCardIndex}
          />
        ))}
      </div>
    );
  }
}
