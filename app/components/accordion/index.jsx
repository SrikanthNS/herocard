import React, { Component } from 'react';
import _ from 'lodash';
import Section from '../section';

import './styles.scss';
/**
 * Accordion
 * method: componentDidMount (React LifeCycle method)
 * method: makeVisible (React LifeCycle method)
 * method: render
 */

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCardExpanded: -1,
    };
    this.makeVisible = this.makeVisible.bind(this);
  }

  componentDidMount() {
    // Initialize custom event emitter object
    HeroCard.initEventEmitter();
  }

  /**
   * makeVisible function to expand/collapse card
   * @param {object} - event body object
   * @return {number} - current is the index of the card
   */

  makeVisible(event, current) {
    if (_.includes(event.target.className, 'hccf-card-header__meta') ||
      _.includes(event.target.className, 'hccf-hero-card open') ||
      _.includes(event.target.className, 'hccf-hero-card')) {
      const stateNum = this.state.isCardExpanded === current ? -1 : current;
      this.setState(() => ({ isCardExpanded: stateNum }));
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
            handle={e => this.makeVisible(e, index)}
            isCardExpanded={index === this.state.isCardExpanded}
          />
        ))}
      </div>
    );
  }
}
