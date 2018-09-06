import React, { Component } from 'react';
import Accordion from './accordion';

export default class App extends Component {
  render() {
    const cardData = HeroCard.cardDataJSON.results.reduce((arr, elem) => {
      if (elem.cards) {
				      for (const c of elem.cards) {
				        arr.push(c);
				    	}
				    }
			      	return arr;
			    }, []
			  );

    return (
      <div>
        <Accordion contents={cardData} />
      </div>
    );
  }
}
