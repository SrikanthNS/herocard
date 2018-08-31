import React, { Component } from 'react';
import Accordion from './accordion';

export default class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        cardList:[]
      }
    }

    componentWillMount() {
      this.setState({cardList:window.HeroCard.cardContent.toRender()});
    }

    render() {    
		const cardData = this.state.cardList.results.reduce((arr, elem) => {
					if(elem.cards) {
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
        )
    }
}