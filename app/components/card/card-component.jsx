import React, { Component } from 'react';
import { CardHolder } from '../card-holder';
import { CardHeaderComponent } from '../card-header';
import './styles.scss';

/**
 * Section Pure component
 * @prop {method} setExpandedCardIndex
 * @prop {number} expandedCardIndex
 * @private {boolean} isExpanded
 * @private {method} handleclick
 * @private {method} render (React LifeCycle method)
 * @private {method} componentWillReceiveProps (React LifeCycle method)
 */

export default class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isExpanded: false };
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * whenever expandedCardIndex is changed and
   * expandedCardIndex is not equal to old expandedCardIndex
   * if new expandedCardIndex is equal to current section then set state 'isExpanded
   * to true or set state 'isExpanded' to false
  */


  componentWillReceiveProps(newProps) {
    if (newProps.expandedCardIndex !== this.props.expandedCardIndex) {
      if (newProps.expandedCardIndex === this.props.cardIndex) {
        this.setState({ isExpanded: true });
      } else {
        this.setState({ isExpanded: false });
      }
    }
  }

  handleClick(event, index) {
    const { setExpandedCardIndex } = this.props;
    setExpandedCardIndex(index);
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    const { isExpanded } = this.state;
    const { content, cardIndex } = this.props;

    return (
      <div
        className={`hccf-hero-card ${isExpanded ? 'open' : ''} ${HeroCard.Utility.callbackClasses(content)}`}
      >
        <CardHeaderComponent
          isExpanded={isExpanded}
          cardIndex={cardIndex}
          handleClick={this.handleClick}
          content={content}
        />
        {isExpanded ? <CardHolder isExpanded={isExpanded} cardContent={content} /> : null}
      </div>
    );
  }
}

