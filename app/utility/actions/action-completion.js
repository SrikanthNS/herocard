/*
 * Copyright (c) 2018 VMware, Inc. All rights reserved.
 *
 * This product is protected by copyright and intellectual property laws in
 * the United States and other countries as well as by international treaties.
 *
 * VMware products may be covered by one or more patents listed at
 * http://www.vmware.com/go/patents.
 */

/**
 * Imports
 */
import HeroCardUtility from '../utility';
import HeroCardEventEmitter from '../event-emitter';
import CommonActions from './common';

HeroCardEventEmitter().initEventEmitter();
const EventEmitter = HeroCardEventEmitter().EventEmitter();

/**
 * Actions Completion Actions
 * @method getCardByActionId
 * @method getAction
 * @method getActionPropertyValue
 * @method setActionPropertyValue
 * @method setActionCompleted
 * @method renderUIForCompletedAction
 * @method getMutexActionIds
 */
const ActionCompletionActions = {
  /**
     * Function to get card object
     * @param {string} actionId - id of the action
     * @return {object} - card object
     */
  getCardByActionId(actionId) {
    const self = this;
    const action = self.getAction(actionId, true);
    return action.card;
  },

  /**
     * Function to get the action object
     * @param {string} actionId - id of the action
     * @param {boolean} includeCard - optional flag to include parent card
     * @return {object} - action object / object containing action and parent card
     */
  getAction(actionId, includeCard) {
    let retVal;
    includeCard = (typeof includeCard !== undefined) ? includeCard : false;

    if (actionId === undefined) {
      return retVal;
    }

    const connectors = HeroCard.cardDataJSON.results;
    if (connectors === undefined) {
      return retVal;
    }

    for (let i = 0; i < connectors.length; i++) {
      const cards = connectors[i].cards;

      if (cards === undefined) {
        continue;
      }

      for (let j = 0; j < cards.length; j++) {
        const card = cards[j];

        if (card === undefined || card.actions === undefined) {
          continue;
        }

        const actions = card.actions;
        for (let k = 0; k < actions.length; k++) {
          if (actions[k].id === actionId) {
            // if includeCard set to true, include both action & card to the returning object
            // else return only action object
            if (includeCard === true) {
              retVal = {
                action: actions[k],
                card,
              };
            } else {
              retVal = actions[k];
            }
            break;
          }
        }

        if (retVal !== undefined) {
          break;
        }
      }

      if (retVal !== undefined) {
        break;
      }
    }

    return retVal;
  },

  /**
     * Function to get an action property value
     * @param {object} action - action object
     * @param {string} property - property to get value
     * @return {any} - property value
     */
  getActionPropertyValue(action, property) {
    let propertyValue;

    if (action === undefined || property === undefined) {
      return propertyValue;
    }

    propertyValue = action[property];
    return propertyValue;
  },

  /**
     * Function to update an action property
     * @param {object} action - action object
     * @param {string} property - property to update
     * @param {string} value - value to update
     * @return {boolean} - update status
     */
  setActionPropertyValue(action, property, value) {
    let isset = false;

    if (action === undefined || property === undefined) {
      return isset;
    }

    action[property] = value;
    isset = true;
    return isset;
  },

  /**
     * Function to mark an action as complete
     * 1. Mark action as completed in JSON
     * 2. Emit JSONMODIFIED event
     * @param {string} actionId - id of the action
     */
  setActionCompleted(actionId) {
    const self = this;
    const cardAction = self.getAction(actionId, true);
    const action = cardAction.action;
    const updatedProperties = [];
    if (cardAction === undefined) {
      return;
    }

    if (action === undefined) {
      return;
    }

    const completed = self.setActionPropertyValue(action, 'completed', true);
    if (!completed) {
      return;
    }

    updatedProperties.push('completed');

    // Emit an event for JSON modification
    EventEmitter.emit('JSONMODIFIED', {
      updatedJson: HeroCard.cardDataJSON,
      updateInfo: {
        objectType: 'actions',
        updatedObject: action,
        updatedProperties,
      },
    });
  },

  /**
     * Function to mark an action as complete
     * 1. change label if it permits
     * 2. disable it if its not repeatable
     * 3. remove card if remove_card_on_completion is available
     * @param {string} actionId - id of the action
     */
  renderUIForCompletedAction(actionId) {
    const self = this;
    const cardAction = self.getAction(actionId, true);
    if (cardAction === undefined) {
      return;
    }

    const action = cardAction.action;
    const card = cardAction.card;

    if (action === undefined) {
      return;
    }

    const elementId = `${actionId}__` + `hccf-card-actions__item-link`;
    const actionButton = document.getElementById(elementId);
    const defaultLabel = self.getActionPropertyValue(action, 'label');
    const completedLabel = self.getActionPropertyValue(action, 'completed_label');
    const mutexGroupId = self.getActionPropertyValue(action, 'mutually_exclusive_set_id');

    // disable action if 'non-repeatable' is  preset and its 'false'
    const allowRepeated = self.getActionPropertyValue(action, 'allow_repeated');
    if (actionButton !== undefined) {
      // update ui
      if (allowRepeated === true) {
        const eventObj = HeroCardUtility.getEventHandlerByElementId(elementId);
        // enable action button
        CommonActions.enableActionButton(actionButton, defaultLabel, eventObj.eventName, eventObj.handlerName);
      } else {
        // change action label if 'completed_label' is present
        if (completedLabel !== undefined) {
          // update json
          const labelChanged = self.setActionPropertyValue(action, 'label', completedLabel);
          if (labelChanged === true) {
            // update ui
            actionButton.innerHTML = completedLabel;
          }
        }

        CommonActions.disableActionButton(actionButton, '');
        // check for mutex group action(s)
        if (mutexGroupId !== undefined) {
          const mutexGroupActions = self.getMutexActionIds(actionId, mutexGroupId);
          if (mutexGroupActions.length > 0) {
            CommonActions.handleMutexActionCompletion(actionButton, mutexGroupActions);
          }
        }
      }
    }

    // remove card if 'remove_card_on_completion' is present and its 'true'
    const removeOnCompletion = self.getActionPropertyValue(action, 'remove_card_on_completion');
    if (removeOnCompletion === true) {
      if (card) {
        const cardHtml = document.getElementById(`${card.id}__${card.id}__card`);
        HeroCardUtility.removeCard(cardHtml);
      }
    }
  },

  /**
     * Function to get mutually exclusive actons ids
     * @param {string} actionId - id of the action
     * @param {string} mutexGroupId - id of the mutex group
     * @return {array} - arry of mutex action ids
     */
  getMutexActionIds(actionId, mutexGroupId) {
    const self = this;
    const mutexActionIds = [];
    const card = self.getCardByActionId(actionId);
    const actions = card.actions;

    for (let i = 0; i < actions.length; i++) {
      const actionMutexGroupId = self.getActionPropertyValue(actions[i], 'mutually_exclusive_set_id');
      if ((actionMutexGroupId === mutexGroupId) && (actions[i].id !== actionId)) {
        mutexActionIds.push(actions[i].id);
      }
    }

    return mutexActionIds;
  },
};

// Add 'ActionCompletionActions' to 'HeroCard' namespace for native layer to callback
const HeroCard = window.HeroCard || {};
HeroCard.ActionCompletionActions = ActionCompletionActions;
window.HeroCard = HeroCard;

/**
 * Exports
 */
export default ActionCompletionActions;
