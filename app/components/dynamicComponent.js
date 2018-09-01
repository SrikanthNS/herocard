import React, { Component } from 'react';

export class DynamicComponent extends Component {

	constructor(props) {
    super(props);
    this.createFormField = this.createFormField.bind(this);
  }
  
   createFormField() {
    const {formID, userInput, fieldOptions} = this.props;
    console.log("formID", formID);
    console.log("userInput", userInput);
    console.log("formOptions", fieldOptions);
    if (!userInput) { return; }

    // console.log(userInput);
    const fieldLabel = userInput.label ? ('<label>' + userInput.label + ': </label>') : '';
    const isFormatPresent = userInput.format || 'TEXT';
    const fieldType = isFormatPresent.toUpperCase();
    let fieldClass = 'hccf-form-field hccf-form-field--' + userInput.format;
    let control = '';
    const controlName = userInput.id;
    let controlAttrStr = ' data-field-label="' + userInput.label + '"';
    let handlers = {};

    const validationHandler = 'window.HeroCard.Actions.Common.validateFieldRules(event, element)';

    if (fieldOptions) {
      handlers = JSON.parse(fieldOptions);
    }

    if (userInput.validation !== undefined) {
      controlAttrStr += ' ' + 'data-validation="' + userInput.validation.join() + '" ';
      fieldClass += ' hccf-form-field--required';

      switch (fieldType) {
        case 'SELECT':
          handlers['change'] = validationHandler;
          break;

        case 'RADIO':
        case 'CHECKBOX':
          handlers['click'] = validationHandler;
          break;
        case 'TEXTAREA':
          controlAttrStr += ' ' + 'placeholder="' + userInput.label + '" ';
          break;
        case 'DATE':
        case 'EMAIL':
        case 'TEL':
        case 'NUMBER':
        case 'TEXT':
          handlers['blur'] = validationHandler;
      }
    }

    control = HeroCard.Utility.createFormField(userInput.format, userInput, controlAttrStr, handlers, formID);

    var validationMessage = '<div class="hccf-form-field__validation-message">'
      + '<span>error message</span>'
      + '</div>';

    var retStr = '<div class="' + fieldClass + '"> '
      + fieldLabel
      + '<span>' + control + '</span>'
      + validationMessage
      + '</div>';
    return retStr;
  }

	render() {
		const htmlStr = this.createFormField();
		return (
      <div dangerouslySetInnerHTML={{ __html:htmlStr }} />
		)
	}
}

export class ActionChildComponent extends Component {

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
			INSTALL_APP: ''
		};

		this.renderAction = this.renderAction.bind(this);
  }
  
  renderAction() {
    var action = this.props.action,
      clickHandler = null,
      completedClasses = 'hccf-card-actions__item-link',
      innerText = action.label;

    switch (action.action_key) {
      case 'VIEW_TRIP':
        clickHandler = 'window.HeroCard.Actions.TripInfo.showConcurTripDetails(event, element)';
        break;

      case 'APPROVE':
        clickHandler = 'window.HeroCard.Actions.Direct.openUrlLocation(element)';
        break;

      case 'VIEW_OPPORTUNITY':
        clickHandler = 'window.HeroCard.Utility.viewSalesforceOpportunity(event, element)';
        break;

      case 'CREATE_OPPORTUNITY':
        clickHandler = 'window.HeroCard.Utility.createSalesforceOpportunity(event, element)';
        break;

      case 'USER_INPUT':
        clickHandler = 'window.HeroCard.Actions.UserInput.showInputForm(event, element)';
        break;

      case 'AUTH_DISMISS':
        clickHandler = 'window.HeroCard.Actions.Auth.dismiss(event, element)';
        break;

      case 'AUTH_LOGIN':
        clickHandler = 'window.HeroCard.Actions.Auth.login(element)';
        break;

      case 'DISMISS':
      case 'DIRECT':
      case 'OPEN_IN':
      case 'INSTALL_APP':
        clickHandler = 'window.HeroCard.Actions.Direct.openUrlLocation(element)';
        break;

      default:
        clickHandler = 'window.HeroCard.Utility.submitAction(event, element)';
    }

    var elemID = action.id + "__" + completedClasses.replace(/\s+/g, '+');
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
        completedClasses = completedClasses.replace('hccf-card-actions__item-link--primary', '')

        // Remove once the server is aware of this tag.
        if (action.completed_label != null) {
          innerText = action["completed_label"];
        }
      }
    }

    return '<a class="' + completedClasses
      + '" data-actionkey="' + action.action_key
      + '" id="' + elemID + '">'
      + innerText
      + '</a>';
  }

	render() {
    const htmlStr = this.renderAction();
		return (
      <div dangerouslySetInnerHTML={{ __html:htmlStr }} />
		)
  }
} 

