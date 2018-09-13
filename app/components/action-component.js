import React, { Component } from 'react';
import _ from 'lodash';
import DynamicComponent from './dynamic-component';
import ActionChildComponent from './action-child-component';

export default class ActionComponent extends Component {
  constructor(props) {
    super(props);
    this.areMultipleEntries = this.areMultipleEntries.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.addClasses = this.addClasses.bind(this);
    this.stringifyAction = this.stringifyAction.bind(this);
  }

  areMultipleEntries(userInput) {
    if (userInput.length < 2) {
      return 'hccf-card-actions__add-input-single';
    }
    return 'hccf-card-actions__add-input-multiple';
  }

  addClasses(items, curAction) {
    let numActions = items.length,
      classNames = '';
    classNames += ' hccf-card-actions__item';

    // mark an action as primary
    if (curAction.primary || (numActions == 1)) {
      classNames += ' hccf-card-actions__item--primary';
    }

    return classNames;
  }

  stringifyAction(action) {
    if (!action) { return; }
    return encodeURIComponent(JSON.stringify(action));
  }

  renderHiddenFields(value, key) {
    return <input type="hidden" name={key} id={key} value={value} />;
  }

  renderAction(action, index) {
    return (
      <div key={action.id} className={this.addClasses(this.props.action, action)} id={action.id}>
        <form id={`${this.props.name}${index}`} className="hccf-card-action-form" method={action.type} action={(action.url && action.url.href) ? action.url.href : ''} data-action-string={this.stringifyAction(action)}>
          {_.map(action.request, this.renderHiddenFields)}
          {
            action.action_key === 'USER_INPUT' ?
              <div>
                <div key={index} className={`hccf-js-input-add-section ${this.areMultipleEntries(action.user_input)}`} >
                  {_.map(action.user_input, (userInput, index) =>
                    (<DynamicComponent
                      formID={action.id}
                      key={index}
                      fieldOptions={'{"keyup" : "window.HeroCard.Actions.UserInput.checkUserInput(event, this)"}'}
                      userInput={userInput}
                      onChange={(event, userInput) => this.onKeyChange(event, userInput)}
                    />)
                  )}
                  <div>
                    <div className="hccf-card-actions__item">
                      <a
                        className="hccf-card-actions__item-link hccf-js-input-button-cancel"
                        id={`${this.props.id}__${action.id}__cancel`}
                        onClick={event => window.HeroCard.Actions.UserInput.hideInputForm(event, event.target)}
                      >Cancel</a>
                      <div className="hccf-card-actions__item hccf-card-actions__item hccf-card-actions__item--primary">
                        <a
                          className="hccf-card-actions__item-link hccf-card-actions__item-link--disabled hccf-js-input-button-submit"
                          id={`${this.props.id}__${action.id}__submit`}
                          onClick={event => window.HeroCard.Actions.UserInput.submitInput(event, event.target)}
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

  render() {
    return (
      <div className="hccf-row hccf-card-actions">
        {_.map(this.props.action, this.renderAction)}
      </div>
    );
  }
}