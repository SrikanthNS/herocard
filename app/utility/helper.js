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

(function () {
  // access 'HeroCard' namespace or create one
  window.HeroCard = window.HeroCard || {};


  var API = {

    /**
       * Function to get number of cards in JSON response
       * @return {number} - cards count
       */
    getCardsCount() {
      let connectors = HeroCard.cardDataJSON.results,
        count = 0;

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
    checkCardExpiry: HeroCard.Utility.checkCardExpiry,

    /**
       * Function to get expired card ids
       * @return {array} - array of cards ids
       */
    getExpiredCardIds() {
      let connectors = HeroCard.cardDataJSON.results,
        ids = [];

      if (connectors !== undefined) {
        for (let i = 0; i < connectors.length; i++) {
          const cards = connectors[i].cards;
          if (cards !== undefined) {
            for (let j = 0; j < cards.length; j++) {
              const isExpired = API.checkCardExpiry(cards[j]);
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
      let expired = false;
      const ids = API.getExpiredCardIds();

      if (ids.length > 0) {
        expired = true;
      }

      return expired;
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
      let connectors = HeroCard.cardDataJSON.results,
        ids = [];

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
      HeroCard.Actions.ActionCompletion.setActionCompleted(actionID);
      return HeroCard.cardDataJSON;
    },

    /**
       * Function to get visible cards count
       * @return {number} - cards count
       */
    getVisibleCardsCount() {
      let connectors = HeroCard.cardDataJSON.results,
        hiddenCount = 0;

      const totalCount = API.getCardsCount();

      if (connectors !== undefined) {
        for (let i = 0; i < connectors.length; i++) {
          const cards = connectors[i].cards;
          if (cards !== undefined) {
            for (let j = 0; j < cards.length; j++) {
              const isHidden = HeroCard.Utility.checkCardHidden(cards[j]);
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

  HeroCard.ResponseManager = {
    getCardsCount: API.getCardsCount,
    getVisibleCardsCount: API.getVisibleCardsCount,
    checkForExpiredCard: API.checkForExpiredCard,
    getAuthFailedConnectorIds: API.getAuthFailedConnectorIds,
    setActionCompleted: API.setActionCompleted,
  };
}());
