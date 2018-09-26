import React, { Component } from 'react';
/**
 * ActionChildComponent
 * method renderAction
 * method render (React LifeCycle method)
 */
export default class ActionChildComponent extends Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
  }
  /**
   * renderAction
   * prepare htmlStr for an action object dynamically
   * @return HTML string
   */
  renderAction() {
    const action = this.props.action;
    let clickHandler = null;
    let completedClasses = 'hccf-card-actions__item-link';
    let innerText = action.label;

    switch (action.action_key) {
      case 'USER_INPUT':
        clickHandler = 'HeroCard.Actions.UserInput.showInputForm(event, element)';
        break;

      default:
        clickHandler = 'HeroCard.Utility.submitAction(event, element)';
    }

    const elemID = `${action.id}__${completedClasses.replace(/\s+/g, '+')}`;
    HeroCard.Utility.registerEventHandler(elemID, 'click', clickHandler);

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
        completedClasses = completedClasses.replace('hccf-card-actions__item-link--primary', '');

        // Remove once the server is aware of this tag.
        if (action.completed_label != null) {
          innerText = action.completed_label;
        }
      }
    }

    return `<a class="${completedClasses
    }" data-actionkey="${action.action_key
    }" id="${elemID}">${
      innerText
    }</a>`;
  }
  /**
   * render React Life cycle method
   * @returns {JSX}
   */
  render() {
    const htmlStr = this.renderAction();
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlStr }} />
    );
  }
}
