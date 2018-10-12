import React, { Component } from 'react';
import HeroCardActions from '../../utility/actions';

/**
 * ActionButtonComponent
 * method renderAction
 * method render (React LifeCycle method)
 */
export default class ActionButtonComponent extends Component {
  constructor(props) {
    super(props);

    //bind methods
    this.getActionHandler = this.getActionHandler.bind(this);
    this.getButtonClasses = this.getButtonClasses.bind(this);
  }

  /**
   * Get action handlers 
   */
  getActionHandler(actionKey) {
    let actionHandler = null;
    switch (actionKey) {
      case 'APPROVE':
        actionHandler = HeroCardActions.Direct.openUrlLocation;
        break;

      case 'USER_INPUT':
        actionHandler = HeroCardActions.UserInput.showInputForm;
        break;

      case 'AUTH_DISMISS':
        actionHandler = HeroCardActions.Auth.dismiss;
        break;

      case 'AUTH_LOGIN':
        actionHandler = HeroCardActions.Auth.login;
        break;

      case 'DISMISS':
      case 'DIRECT':
      case 'OPEN_IN':
      case 'INSTALL_APP':
        actionHandler = HeroCardActions.Direct.openUrlLocation;
        break;

      default:
        actionHandler = 'javascript:void(0)';
    }

    return actionHandler;
  }

  /**
   * Get action button classes
   */
  getButtonClasses(action) {
    let buttonClasses = 'hccf-card-actions__item-link';
    
    // Check for primary action
    if (action.primary === true) {
      buttonClasses += ' hccf-card-actions__item-link--primary';
    }

    // Check for non-repeatable action
    if ((action.completed === true) && (action.allow_repeated === undefined || action.allow_repeated === false)) {
      buttonClasses += ' hccf-card-actions__item-link--complete hccf-card-actions__item-link--disabled';
      buttonClasses = buttonClasses.replace('hccf-card-actions__item-link--primary', '')
    }

    return buttonClasses;
  }

  /**
   * render React Life cycle method
   * @returns {JSX}
   */
  render() {
    const {cardID, action} = this.props;
    const buttonClasses = this.getButtonClasses(action);
    const elemID = cardID + "__" + action.id;
    let actionHandler = this.getActionHandler(action.action_key);
    let innerText = action.label;

    // Check for completed action
    if (action.completed === true) {
      // Check for non-repeatable action
      if ((action.allow_repeated === undefined) || (action.allow_repeated === false)) {
        actionHandler = 'javascript:void(0)';
        // Remove once the server is aware of this tag.
        if (action.completed_label != null) {
          innerText = action["completed_label"];
        }
      }
    }

    return (
        <a id={elemID} 
           className={buttonClasses}
           onClick={(e) => actionHandler(e, e.target)} 
           data-actionkey={action.action_key}>
            {innerText}
          </a>
    );
  }
}
