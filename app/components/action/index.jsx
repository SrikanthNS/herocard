import React, { Component } from 'react';
import _ from 'lodash';
import FormFieldsComponent from '../form-fields';
import ActionChildComponent from '../action-child';
import './styles.scss';

/**
 * ActionComponent
 * method ActionComponent
 * method addCLasses
 * method stringifyAction
 * method renderHiddenFields
 * method renderAction
 * method render (React LifeCycle method)
 */
export default class ActionComponent extends Component {
  constructor(props) {
    super(props);
    this.areMultipleEntries = this.areMultipleEntries.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.addClasses = this.addClasses.bind(this);
    this.stringifyAction = this.stringifyAction.bind(this);
  }
  /**
 * areMultipleEntries
 * @param {array} userInput 
 * return class names depending on userInput array length
 */
  areMultipleEntries(userInput) {
    if (userInput.length < 2) {
      return 'hccf-card-actions__add-input-single';
    }
    return 'hccf-card-actions__add-input-multiple';
  }

  /**
   *
   * @param {array} items 
   * @param {object} curAction 
   */
  addClasses(items, curAction) {
    const numActions = items.length;
    let classNames = '';
    classNames += ' hccf-card-actions__item';

    // mark an action as primary
    if (curAction.primary || (numActions === 1)) {
      classNames += ' hccf-card-actions__item--primary';
    }

    return classNames;
  }
  /**
   *
   * @param {object} action 
   */
  stringifyAction(action) {
    if (!action) { return; }
    return encodeURIComponent(JSON.stringify(action));
  }
  /**
   *
   * @param {string} value 
   * @param {string} key 
   */
  renderHiddenFields(value, key) {
    return <input type="hidden" name={key} id={key} value={value} />;
  }
  /**
   *renderAction
   * @param {object} action 
   * @param {number} index 
   * render JSX for each action
   */
  renderAction(action, index) {
    return (
      <div key={action.id} className={this.addClasses(this.props.actions, action)} id={action.id}>
        <form
          id={`${this.props.name}${index}`}
          className="hccf-card-action-form"
          method={action.type}
          action={(action.url && action.url.href) ? action.url.href : ''}
          data-action-string={this.stringifyAction(action)}
        >
          {_.map(action.request, this.renderHiddenFields)}
          {
            action.action_key === 'USER_INPUT' ?
              <div>
                <div key={index} className={`hccf-js-input-add-section ${this.areMultipleEntries(action.user_input)}`} >
                  {_.map(action.user_input, (userInput, index) =>
                    (<FormFieldsComponent
                      formID={action.id}
                      key={index}
                      fieldOptions={'{"keyup" : "HeroCard.Actions.UserInput.checkUserInput(event, this)"}'}
                      userInput={userInput}
                    />)
                  )}
                  <div>
                    <div className="hccf-card-actions__item">
                      <a
                        className="hccf-card-actions__item-link hccf-js-input-button-cancel"
                        id={`${this.props.id}__${action.id}__cancel`}
                        onClick={event => HeroCard.Actions.UserInput.hideInputForm(event, event.target)}
                      >Cancel</a>
                      <div className="hccf-card-actions__item hccf-card-actions__item hccf-card-actions__item--primary">
                        <a
                          className="hccf-card-actions__item-link hccf-card-actions__item-link--disabled hccf-js-input-button-submit"
                          id={`${this.props.id}__${action.id}__submit`}
                          onClick={event => HeroCard.Actions.UserInput.submitInput(event, event.target)}
                        >{action.label}</a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              :
              null
          }
          <ActionChildComponent action={action} />
        </form>
      </div>
    );
  }
  /**
   * Reacr Render lifecycle method
   * @return {JSX} for each action
   */
  render() {
    return (
      <div className="hccf-row hccf-card-actions">
        {_.map(this.props.actions, this.renderAction)}
      </div>
    );
  }
}