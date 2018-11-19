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
  JavaScript Common Utility Functions
*****************************************/

/**
 * Utility Functions
 * @method convertISO8601toDate
 * @method dateDifference
 * @method checkDateExpiry
 * @method hasClass
 * @method addClass
 * @method removeClass
 * @method getClosest
 * @method addEllipsis
 * @method parseURL
 * @method checkActionShouldHideCard
 * @method checkCardHiddenForCompletion
 * @method checkCardExpiry
 * @method checkCardHidden
 * @method removeCard
 * @method removeCardData
 * @method createFormField
 * @method checkRadioCheckboxValue
 * @method checkForNumericValue
 * @method checkForPhoneNumber
 * @method checkForEmail
 * @method checkForDate
 * @method hashcode
 * @method createElement
 * @method findAncestor
 * @method convertTimestamp
 * @method callbackClasses
 * @method imgPath
 */

import _ from 'lodash';

const HeroCardUtility = {

  // function to convert ISO 8601
  convertISO8601toDate(dtstrparam) {
    let dtstr = dtstrparam;
    // replace anything but numbers by spaces
    dtstr = _.replace(dtstr, /\D/g, ' ');

    // trim any hanging white space
    dtstr = _.replace(dtstr, /\s+$/, '');

    // split on space
    const dtcomps = _.split(dtstr, ' ');

    // not all ISO 8601 dates can convert, as is
    // unless month and date specified, invalid
    if (dtcomps.length < 3) {
      return 'Invalid Date';
    }

    // if time not provided, set to zero
    if (dtcomps.length < 4) {
      dtcomps[3] = 0;
      dtcomps[4] = 0;
      dtcomps[5] = 0;
    }

    // modify month between 1 based ISO 8601 and zero based Date
    dtcomps[1]--;

    return new Date(Date.UTC(dtcomps[0], dtcomps[1], dtcomps[2], dtcomps[3], dtcomps[4], dtcomps[5]));
  },

  // function to get date difference
  dateDifference(dateOne, dateTwo) {
    // // Get 1 day in milliseconds
    // let oneDay = 1000 * 60 * 60 * 24,
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let retString = '';

    // Convert both dates to milliseconds
    const dateOneMS = dateOne.getTime();
    const dateTwoMS = dateTwo.getTime();

    // Calculate the difference in milliseconds
    let differenceMS = dateTwoMS - dateOneMS;

    if (differenceMS <= 0) {
      return '';
    }

    // take out milliseconds
    differenceMS /= 1000;

    seconds = Math.floor(differenceMS % 60);
    differenceMS /= 60;
    minutes = Math.floor(differenceMS % 60);
    differenceMS /= 60;
    hours = Math.floor(differenceMS % 24);
    days = Math.floor(differenceMS / 24);

    // console.log(days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds');

    if (days > 0) {
      retString = `${days + ((days == 1) ? ' day' : ' days')} ago`;
    } else if (hours > 0) {
      retString = `${hours + ((hours == 1) ? ' hour' : ' hours')} ago`;
    } else if (minutes > 0) {
      retString = `${minutes + ((minutes == 1) ? ' minute' : ' minutes')} ago`;
    } else if (seconds > 0) {
      retString = `${seconds + ((seconds == 1) ? ' second' : ' seconds')} ago`;
    } else {
      retString = 'just now';
    }

    return retString;
  },

  /**
     * function to check if the given date is expired
     * @param {date} - date object
     * @return {boolean} - true if date expired; false otherwise
     */
  checkDateExpiry(date) {
    let expired = false;

    // Current date
    const currentDate = new Date();

    // Convert both dates to milliseconds
    const dateTime = date.getTime();
    const currentDateTime = currentDate.getTime();

    // Calculate the difference in milliseconds
    const timeDifference = dateTime - currentDateTime;

    if (timeDifference <= 0) {
      expired = true;
    }

    return expired;
  },

  // function to check if a css class is present in an html node element
  hasClass(elem, className) {
    return elem.classList.contains(className);
  },

  // add css class(s) to an html node element
  addClass(elem, className) {
    const element = elem;
    if (element.classList.length) {
      element.classList.add(className);
    } else if (!HeroCardUtility.hasClass(element, className)) {
      element.className += ` ${className}`;
    }
  },

  // remove a css class from an html node element
  removeClass(elem, className) {
    const element = elem;
    if (element.classList.length) {
      element.classList.remove(className);
    }
  },

  /**
     * Get the closest matching element up the DOM tree.
     * @private
     * @param  {Element} elem     Starting element
     * @param  {String}  selector Selector to match against
     * @return {Boolean|Element}  Returns null if not match found
     */
  getClosest(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                      let matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                      while (--i >= 0 && matches.item(i) !== this) {}
                      return i > -1;
                    };
    }

    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) { return elem; }
    }

    return null;
  },

  // add ellipsis after multiple-line
  addEllipsis(elemParam, lineHeight, truncateClass) {
    const height = (lineHeight * 2) || 52;
    const elem = elemParam;
    if (elem.offsetHeight > height) {
      const words = _.split(elem.innerHTML, /\s+/);
      words.push('...');
      if (truncateClass) {
        HeroCardUtility.addClass(elem, 'hccf-card-body__field-description--truncated');
      }

      do {
        words.splice(-2, 1);
        elem.innerHTML = words.join(' ');
      } while (elem.offsetHeight > height);
    }
  },

  parseURL(url) {
    const urlRegex = new RegExp([
      '^(roswellframework:)//', // protocol
      '(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
      '(/{0,1}[^?#]*)', // pathname
      '(\\?[^#]*|)', // search
      '(#.*|)$', // hash
    ].join(''));

    const match = url.match(urlRegex);

    if (!match) {
      return false;
    }

    // Convert query string to object
    const searchObject = {};
    const queries = match[6] && _.split(_.replace(match[6], /^\?/, ''), '&');
    for (let i = 0; i < queries.length; i++) {
      const split = _.split(queries[i], '=');
      const key = split[0];
      const value = decodeURIComponent(split[1]);
      searchObject[key] = value;
    }

    searchObject.actionObject = JSON.parse(searchObject.action);

    return {
      href: url,
      protocol: match[1],
      host: match[2],
      cardtype: match[3],
      port: match[4],
      cardid: _.replace(match[5], '/', ''),
      search: match[6],
      searchObject,
      hash: match[7],
    };
  },

  /**
     * Function to check if a card's action is completed and requires the card to be removed (hidden)
     * @param {object} action - card's action object
     */
  checkActionShouldHideCard(action) {
    return action.completed === true && action.remove_card_on_completion === true;
  },

  /**
     * Function to check if card has any completed actions that require the card to be removed (hidden)
     * @param {object} card - card object
     */
  checkCardHiddenForCompletion(card) {
    return (card.actions || []).filter(HeroCardUtility.checkActionShouldHideCard).length > 0;
  },

  /**
     * Function to check if card is expired
     * @param {object} card - card object
     */
  checkCardExpiry(card) {
    let expired = false;

    if ((card !== undefined) && (card.hasOwnProperty('expiration_date') && card.expiration_date)) {
      const isoDate = card.expiration_date;
      const convertedDate = HeroCardUtility.convertISO8601toDate(isoDate);
      expired = HeroCardUtility.checkDateExpiry(convertedDate);
    }

    return expired;
  },

  /**
     * Function to check if card should be hidden
     * @param {object} card - card object
     */
  checkCardHidden(card) {
    return HeroCardUtility.checkCardHiddenForCompletion(card)
                || (card.hasOwnProperty('is_actionable') && card.is_actionable === false)
                || HeroCardUtility.checkCardExpiry(card);
  },

  // function to remove a card from UI
  removeCard(card) {
    if (card) {
      setTimeout(() => {
        HeroCardUtility.addClass(card, 'hccf-hero-card--hidden');
      }, 2000);
    }
  },

  // make the card as non-actionable by setting 'is_actionable' as false;
  removeCardData(cardId) {
    if (cardId !== undefined) {
      HeroCard.cardDataJSON.results.forEach((result) => {
        const cards = result.cards;
        if (cards !== undefined) {
          cards.forEach((card) => {
            if (cardId === card.id) {
              card.is_actionable = false;
            }
          });
        }
      });
    }
  },

  // function to check for numeric values
  checkForNumericValue(value) {
    if (!value) {
      return false;
    }

    const pattern = /^\d+$/;
    return pattern.test(value);
  },

  // function to check 10 digit phone number
  checkForPhoneNumber(value) {
    if (!value || !parseInt(value)) {
      return false;
    }

    const pattern = /[^0-9]/g;
    const phone = value.replace(pattern, '');

    if (phone.length != 10) {
      return false;
    }

    return true;
  },

  // function to check for valid email
  checkForEmail(value) {
    if (!value) {
      return false;
    }

    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value.match(pattern)) {
      return false;
    }

    return true;
  },

  // function to check for valid date in YYYY-MM-DD format
  checkForDate(value) {
    if (!value) {
      return false;
    }

    const pattern = new RegExp('^([0-9]{4})-([0-9]{2})-([0-9]{2})$');
    const matches = pattern.exec(value);

    if (!matches) {
      return false;
    }
    const composedDate = new Date(matches[1], (matches[2] - 1), matches[3]);
    const isDate = ((composedDate.getMonth() === (matches[2] - 1)) &&
     (composedDate.getDate() === parseInt(matches[3], 10))
    && (composedDate.getFullYear() === parseInt(matches[1], 10)));
    if (!isDate) {
      return false;
    }
    return true;
  },

  convertTimestamp(isoDate) {
    if (!isoDate) { return; }
    const convertedDate = HeroCardUtility.convertISO8601toDate(isoDate);
    return HeroCardUtility.dateDifference(convertedDate, new Date());
  },

  callbackClasses(cardObj) {
    const card = cardObj;
    let classNames = '';

    // Check if the card to be expanded
    if (card.hasOwnProperty('expand') && card.expand === true) {
      classNames += ' hccf-accordian-expanded';
    }

    // Hide card if its completed and 'remove card on completion' is present
    // or if card is no more actionable
    // or if card is expired
    if (HeroCardUtility.checkCardHidden(card)) {
      classNames += ' hccf-hero-card--hidden';
    }

    return classNames;
  },

  imgPath(fileName) {
    return window.hsImgs + fileName;
  },

};


/**
 * Exports
 */
export default HeroCardUtility;

