import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CardActionComponent from './card-action';
import './styles.scss';

/**
 * Functional Component
 * Return card actions
 */
export class CardActionsComponent extends Component {
  render() {
    const { actions, name, id} = this.props;
    return(
      <div className="hccf-row hccf-card-actions">
      {
        _.map(actions, (action, index) =>
          (<CardActionComponent
            key={index}
            index={index}
            action={action}
            numActions={actions.length}
            cardName={name}
            cardID={id}
          />))
      }
    </div>
    );
  }
}

CardActionsComponent.propTypes = {
  actions: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

/**
 * Exports
 */
export default CardActionsComponent;

