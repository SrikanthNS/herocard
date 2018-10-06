import React, { Component } from 'react';
import HeroCardUtility from '../../utility/utility';

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
  }

  /**
   * Get action handlers 
   */
  getActionHandler(actionKey) {
    let actionHandler = null;
    switch (actionKey) {
      case 'APPROVE':
        actionHandler = 'HeroCardActions.Direct.openUrlLocation(element)';
        break;

      case 'USER_INPUT':
        actionHandler = 'HeroCardActions.UserInput.showInputForm(event, element)';
        break;

      case 'AUTH_DISMISS':
        actionHandler = 'HeroCardActions.Auth.dismiss(event, element)';
        break;

      case 'AUTH_LOGIN':
        actionHandler = 'HeroCardActions.Auth.login(element)';
        break;

      case 'DISMISS':
      case 'DIRECT':
      case 'OPEN_IN':
      case 'INSTALL_APP':
        actionHandler = 'HeroCardActions.Direct.openUrlLocation(element)';
        break;

      default:
        actionHandler = 'javascript:void(0)';
    }

    return actionHandler;
  }

  /**
   * render React Life cycle method
   * @returns {JSX}
   */
  render() {
    const action = this.props.action;
    let clickHandler = this.getActionHandler(action.action_key);
    let completedClasses = 'hccf-card-actions__item-link';
    let innerText = action.label;
    const elemID = action.id + "__" + completedClasses.replace(/\s+/g, '+');
    HeroCardUtility.registerEventHandler(elemID, 'click', clickHandler);

    // Check for primary action
    if (action.primary === true) {
      completedClasses += ' hccf-card-actions__item-link--primary';
    }

    // Check for completed action
    if (action.completed === true) {

      // Check for non-repeatable action
      if ((action.allow_repeated === undefined) || (action.allow_repeated === false)) {
        clickHandler = 'javascript:void(0)';
        completedClasses += ' hccf-card-actions__item-link--complete hccf-card-actions__item-link--disabled';
        completedClasses = completedClasses.replace('hccf-card-actions__item-link--primary', '')

        // Remove once the server is aware of this tag.
        if (action.completed_label != null) {
          innerText = action["completed_label"];
        }
      }
    }

    return (
        <a id={elemID} className={completedClasses} data-actionkey={action.action_key}>{innerText}</a>
    );
  }
}
