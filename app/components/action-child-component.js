import React, { Component } from 'react';

export default class ActionChildComponent extends Component {
  constructor(props) {
    super(props);

    const actionKeyMap = {
      VIEW_TRIP: '',
      APPROVE: '',
      VIEW_OPPORTUNITY: '',
      CREATE_OPPORTUNITY: '',
      USER_INPUT: '',
      AUTH_DISMISS: '',
      AUTH_LOGIN: '',
      DISMISS: '',
      DIRECT: '',
      OPEN_IN: '',
      INSTALL_APP: '',
    };

    this.renderAction = this.renderAction.bind(this);
  }

  renderAction() {
    let action = this.props.action,
      clickHandler = null,
      completedClasses = 'hccf-card-actions__item-link',
      innerText = action.label;

    switch (action.action_key) {
      case 'USER_INPUT':
        clickHandler = 'window.HeroCard.Actions.UserInput.showInputForm(event, element)';
        break;

      default:
        clickHandler = 'window.HeroCard.Utility.submitAction(event, element)';
    }

    const elemID = `${action.id}__${completedClasses.replace(/\s+/g, '+')}`;
    window.HeroCard.Utility.registerEventHandler(elemID, 'click', clickHandler);

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

  render() {
    const htmlStr = this.renderAction();
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlStr }} />
    );
  }
}
