/*
 * Copyright (c) 2018 VMware, Inc. All rights reserved.
 *
 * This product is protected by copyright and intellectual property laws in
 * the United States and other countries as well as by international treaties.
 *
 * VMware products may be covered by one or more patents listed at
 * http://www.vmware.com/go/patents.
 */

/** ***************************************
  API to interact with JSON
*****************************************/

/**
 * Imports
 */
import HeroCardActions from './actions';
import HeroCardUtility from './utility';

/**
 * JSON API
 * @method getCardsCount
 * @method checkCardExpiry
 * @method getExpiredCardIds
 * @method checkForExpiredCard
 * @method checkConnectorAuthStatus
 * @method getAuthFailedConnectorIds
 * @method getAuthFailedConnectorIds
 * @method setActionCompleted
 * @method getVisibleCardsCount
 *
 */
const API = {

  /**
     * Function to get number of cards in JSON response
     * @return {number} - cards count
     */
  getCardsCount() {
    const connectors = HeroCard.cardDataJSON.results;
    let count = 0;

    if (connectors !== undefined) {
      for (let i = 0; i < connectors.length; i++) {
        const cards = connectors[i].cards;
        if (cards !== undefined) {
          count += cards.length;
        }
      }
    }

    return count;
  },

  /**
     * Function to check if card is expired
     * @param {object} card - card object
     */
  checkCardExpiry: HeroCardUtility.checkCardExpiry,

  /**
     * Function to get expired card ids
     * @return {array} - array of cards ids
     */
  getExpiredCardIds() {
    const _self = this;
    const connectors = HeroCard.cardDataJSON.results;
    const ids = [];

    if (connectors !== undefined) {
      for (let i = 0; i < connectors.length; i++) {
        const cards = connectors[i].cards;
        if (cards !== undefined) {
          for (let j = 0; j < cards.length; j++) {
            const isExpired = _self.checkCardExpiry(cards[j]);
            if (isExpired) {
              ids.push(cards[j].id);
            }
          }
        }
      }
    }

    return ids;
  },

  /**
     * Function to check if any cards expired
     * @return {boolean} - true if any cards expired; false otherwise
     */
  checkForExpiredCard() {
    return API.getExpiredCardIds().length > 0;
  },

  /**
     * Function to check connector authentication failure (401) status
     * @param {object} connector - connector object
     * @return {boolean} - true if failed (401); false otherwise
     */
  checkConnectorAuthStatus(connector) {
    let status = true;

    if ((connector !== undefined) && connector.hasOwnProperty('connector_status')) {
      const cs = connector.connector_status;
      if (cs.backend_status && (cs.backend_status === 401)) {
        status = false;
      }
    }

    return status;
  },

  /**
     * Function to get connectors ids which had auth failures (401)
     * @return {array} - array of connector ids
     */
  getAuthFailedConnectorIds() {
    const connectors = HeroCard.cardDataJSON.results;
    const ids = [];

    if (connectors !== undefined) {
      for (let i = 0; i < connectors.length; i++) {
        const status = API.checkConnectorAuthStatus(connectors[i]);
        if (!status) {
          ids.push(connectors[i].connector_id);
        }
      }
    }

    return ids;
  },

  setActionCompleted(actionID) {
    HeroCardActions.ActionCompletion.setActionCompleted(actionID);
    return HeroCard.cardDataJSON;
  },

  /**
     * Function to get visible cards count
     * @return {number} - cards count
     */
  getVisibleCardsCount() {
    const connectors = HeroCard.cardDataJSON.results;
    let hiddenCount = 0;

    const totalCount = API.getCardsCount();

    if (connectors !== undefined) {
      for (let i = 0; i < connectors.length; i++) {
        const cards = connectors[i].cards;
        if (cards !== undefined) {
          for (let j = 0; j < cards.length; j++) {
            const isHidden = HeroCardUtility.checkCardHidden(cards[j]);
            if (isHidden) {
              hiddenCount++;
            }
          }
        }
      }
    }

    return totalCount - hiddenCount;
  },
};

/**
 * Response Manager
 */
const HeroCardResponseManager = {
  getCardsCount: API.getCardsCount,
  getVisibleCardsCount: API.getVisibleCardsCount,
  checkForExpiredCard: API.checkForExpiredCard,
  getAuthFailedConnectorIds: API.getAuthFailedConnectorIds,
  setActionCompleted: API.setActionCompleted,
};

// Add 'ResponseManager' to 'HeroCard' namespace for native layer to callback
const HeroCard = window.HeroCard || {};
HeroCard.ResponseManager = HeroCardResponseManager;
window.HeroCard = HeroCard;

/**
 * Exports
 */
export default HeroCardResponseManager;

