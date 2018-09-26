import React, { Component } from 'react';
import _ from 'lodash';
import { CardComponent } from '../card';

/**
 * Accordion
 * method: componentDidMount (React LifeCycle method)
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

  /**
   * React lifecycle method render() method
   * Iterates over property: contents and pass each content to Card component as property
   * @return {JSX}
   */

  render() {
    const { expandedCardIndex } = this.state;
    return (
      <div>
        {_.map(this.props.contents, (content, index) => (
          <CardComponent
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
