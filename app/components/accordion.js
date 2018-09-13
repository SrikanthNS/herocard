import React, { Component } from 'react';
import _ from 'lodash';
import Section from './section-component';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: -1,
    };
    this.makeVisible = this.makeVisible.bind(this);
  }

  componentDidMount() {
    // Initialize custom event emitter object
    window.HeroCard.initEventEmitter();
  }

  makeVisible(event, current) {
    if (_.includes(event.target.className, 'hccf-card-header__meta') ||
      _.includes(event.target.className, 'hccf-hero-card open') ||
      _.includes(event.target.className, 'hccf-hero-card')) {
      const stateNum = this.state.active === current ? -1 : current;
      this.setState(() => ({ active: stateNum }));
    }
  }

  render() {
    return (
      <div>
        {_.map(this.props.contents, (content, index) => (
          <Section
            key={index}
            content={content}
            handle={e => this.makeVisible(e, index)}
            active={index === this.state.active}
          />
        ))}
      </div>
    );
  }
}

