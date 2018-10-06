import React, { Component } from 'react';
import CardActionComponent from './card-action';
import './styles.scss';

/**
 * Functional Component
 * Return card actions
 */
const cardActions = (props) => {
  const actions = props.actions;
  return (
      <div className="hccf-row hccf-card-actions">
        {
          actions.map((action, index) => {
            return <CardActionComponent 
                      key={index}
                      index={index} 
                      action={action} 
                      numActions={props.actions.length}
                      cardName={props.name} 
                      cardID={props.id} />
          })
        }
      </div>
  )
};

/**
 * Exports
 */
export default cardActions;

