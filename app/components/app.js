import React, { Component } from 'react';
import _ from 'lodash';
import Accordion from './accordion';

/** *************************************************
  App file (starting point)
************************************************** **/

export default class App extends Component {
  render() {
    // access 'HeroCard' namespace and prepare an array cardData
    const cardData = _.reduce(HeroCard.cardDataJSON.results, (arr, elem) => {
      if (elem.cards) {
        for (const c of elem.cards) {
          arr.push(c);
        }
      }
      return arr;
    }, []
    );
    // render Accordion component and pass cardData/contents as property
    return (
      <div>
        <Accordion contents={cardData} />
      </div>
    );
  }
}
