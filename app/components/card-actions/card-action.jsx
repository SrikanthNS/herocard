import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ActionButtonComponent from '../action-button/action-button';
import HiddenField from '../form-fields/hidden-field';
import UserInputSection from '../user-input-section/user-input-section';

/**
 * CardActionComponent
 * Render card action components depending on the action type
 *
 * @method render  (React LifeCycle method)
 * @method renderField - Return card field components
 */
export class CardActionComponent extends Component {
  constructor(props) {
    super(props);

    // bind methods
    this.userInputClasses = this.userInputSectionClasses.bind(this);
    this.actionItemClasses = this.actionItemClasses.bind(this);
    this.stringifyAction = this.stringifyAction.bind(this);
  }

  /**
     * Doc
     */
  userInputSectionClasses(userInput) {
    let classNames = 'hccf-js-input-add-section';

    if (userInput.length < 2) {
      classNames += ' hccf-card-actions__add-input-single';
      return classNames;
    }
    classNames += ' hccf-card-actions__add-input-multiple';
    return classNames;
  }

  /**
     * Doc
     */
  actionItemClasses(numActions, curAction) {
    let classNames = 'hccf-card-actions__item';

    // mark an action as primary
    if (curAction.primary || (numActions === 1)) {
      classNames += ' hccf-card-actions__item--primary';
    }

    return classNames;
  }

  /**
     * Doc
     */
  stringifyAction(action) {
    if (!action) { return; }
    return encodeURIComponent(JSON.stringify(action));
  }

  /**
     * @method render (React LifeCycle method)
     * Return various action component depending on the action type
     */
  render() {
    const { index, action, numActions, cardID, cardName } = this.props;

    // Check if user inputs are required
    let userInputSection = null;
    if (action.action_key === 'USER_INPUT') {
      userInputSection = (
        <UserInputSection cardID={cardID} action={action} className={this.userInputSectionClasses(action.user_input)} />
      );
    }

    return (
      <div id={action.id} className={this.actionItemClasses(numActions, action)} >
        <form
          id={`${cardName}${index}`}
          method={action.type}
          className="hccf-card-action-form"
          action={(action.url && action.url.href) ? action.url.href : ''}
          data-action-string={this.stringifyAction(action)}
        >

          {/* Add request hidden fields */}
          {_.map(action.request, (propValue, propName) =>
            <HiddenField key={propName} name={propName} value={propValue} />)}

          {/* User input section */}
          {userInputSection}

          {/* Action button */}
          <ActionButtonComponent action={action} />
        </form>
      </div>
    );
  }
}


CardActionComponent.propTypes = {
  index: PropTypes.number.isRequired,
  action: PropTypes.object.isRequired,
  numActions: PropTypes.number.isRequired,
  cardID: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
};

export default CardActionComponent;
