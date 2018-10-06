import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { CardComponent } from '../card';
import HeroCardEventEmitter from '../../utility/event-emitter';

/**
 * Accordion
 * method: componentDidMount (React LifeCycle method)
 * method: render
 */

export class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = { expandedCardIndex: -1 };
    this.setExpandedCardIndex = this.setExpandedCardIndex.bind(this);
  }
  componentDidMount() {
    // Initialize custom event emitter object
    HeroCardEventEmitter().initEventEmitter();
  }

  setExpandedCardIndex(cardIndex) {
    this.setState({ expandedCardIndex: cardIndex === this.state.expandedCardIndex ? -1 : cardIndex });
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
            key={index}
            cardIndex={index}
            content={content}
            expandedCardIndex={expandedCardIndex}
            setExpandedCardIndex={this.setExpandedCardIndex}
          />
        ))}
      </div>
    );
  }
}

Accordion.propTypes = {
  contents: PropTypes.array.isRequired,
};

export default Accordion;
