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
 * Imports
 */
import HeroCardActions from './actions';

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
 * @method registerEventHandler
 * @method attachEventHandlers
 * @method getEventHandlerByElementId
 * @method listOfRegisteredActions
 * @method hashcode
 * @method createElement
 * @method findAncestor
 * @method convertTimestamp
 * @method callbackClasses
 * @method imgPath
 */
const HeroCardUtility = {

    // function to convert ISO 8601
    convertISO8601toDate: function(dtstr) {
        // replace anything but numbers by spaces
        dtstr = dtstr.replace(/\D/g, ' ');

        // trim any hanging white space
        dtstr = dtstr.replace(/\s+$/, '');

        // split on space
        const dtcomps = dtstr.split(' ');

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
    dateDifference: function(dateOne, dateTwo) {
        // Get 1 day in milliseconds
        let oneDay = 1000 * 60 * 60 * 24,
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0,
            retString = '';

        // Convert both dates to milliseconds
        let dateOneMS = dateOne.getTime(),
            dateTwoMS = dateTwo.getTime();

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
    checkDateExpiry: function(date) {
        let expired = false;

        // Current date
        const currentDate = new Date();

        // Convert both dates to milliseconds
        let dateTime = date.getTime(),
            currentDateTime = currentDate.getTime();

        // Calculate the difference in milliseconds
        const timeDifference = dateTime - currentDateTime;

        if (timeDifference <= 0) {
            expired = true;
        }

        return expired;
    },

    // function to check if a css class is present in an html node element
    hasClass: function(elem, className) {
        if (elem.classList) {
            return elem.classList.contains(className);
        }

        return !!elem.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
    },

    // add css class(s) to an html node element
    addClass: function(elem, className) {
        const _self = this;
        
        if (elem.classList) {
            elem.classList.add(className);
        } else if (!_self.hasClass(elem, className)) {
            elem.className += ` ${className}`;
        }
    },

    // remove a css class from an html node element
    removeClass: function(elem, className) {
        const _self = this;

        if (elem.classList) {
            elem.classList.remove(className);
        } else if (_self.hasClass(elem, className)) {
            const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
            elem.className = elem.className.replace(reg, ' ');
        }
    },

    /**
     * Get the closest matching element up the DOM tree.
     * @private
     * @param  {Element} elem     Starting element
     * @param  {String}  selector Selector to match against
     * @return {Boolean|Element}  Returns null if not match found
     */
    getClosest: function(elem, selector) {
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
    addEllipsis: function(elem, lineHeight, truncateClass) {
        const _self = this;
        const height = (lineHeight * 2) || 52;

        if (elem.offsetHeight > height) {
            const words = elem.innerHTML.split(/\s+/);
            words.push('...');
            if (truncateClass) {
                _self.addClass(elem, 'hccf-card-body__field-description--truncated');
            }

            do {
            words.splice(-2, 1);
            elem.innerHTML = words.join(' ');
            } while (elem.offsetHeight > height);
        }
    },

    parseURL: function(url) {
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
        const queries = match[6] && match[6].replace(/^\?/, '').split('&');
        for (i = 0; i < queries.length; i++) {
            const split = queries[i].split('=');
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
            cardid: match[5].replace('/', ''),
            search: match[6],
            searchObject,
            hash: match[7],
        };
    },

    /**
     * Function to check if a card's action is completed and requires the card to be removed (hidden)
     * @param {object} action - card's action object
     */
    checkActionShouldHideCard: function(action) {
        return action.completed === true && action.remove_card_on_completion === true;
    },

    /**
     * Function to check if card has any completed actions that require the card to be removed (hidden)
     * @param {object} card - card object
     */
    checkCardHiddenForCompletion: function(card) {
        const _self = this;
        return (card.actions || []).filter(_self.checkActionShouldHideCard).length > 0;
    },

    /**
     * Function to check if card is expired
     * @param {object} card - card object
     */
    checkCardExpiry: function(card) {
        const _self = this;
        let expired = false;

        if ((card !== undefined) && (card.hasOwnProperty('expiration_date') && card.expiration_date)) {
            const isoDate = card.expiration_date;
            const convertedDate = _self.convertISO8601toDate(isoDate);
            expired = _self.checkDateExpiry(convertedDate);
        }

        return expired;
    },

    /**
     * Function to check if card should be hidden
     * @param {object} card - card object
     */
    checkCardHidden: function(card) {
        const _self = this;

        return _self.checkCardHiddenForCompletion(card)
                || (card.hasOwnProperty('is_actionable') && card.is_actionable === false)
                || _self.checkCardExpiry(card);
    },

    // function to remove a card from UI
    removeCard: function(card) {
        const _self = this;

        if (card) {
            setTimeout(() => {
                _self.addClass(card, 'hccf-hero-card--hidden');
            }, 2000);
        }
    },

    // make the card as non-actionable by setting 'is_actionable' as false;
    removeCardData: function(cardId) {
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

    createFormField: function(type, field, attrs, handlers, identifier) {
        const _self = this;
        let control = '',
            isFormatPresent = type || 'TEXT',
            controlType = isFormatPresent.toUpperCase(),
            controlName = field.id,
            controlID = `${identifier}__${controlName}`;

        for (const x in handlers) {
            var funName = handlers[x];
            if (controlType == 'CHECKBOX' ||
                    controlType == 'RADIO') {
            continue;
            }
            _self.registerEventHandler(controlID, x, funName);
        }

        switch (controlType) {
            case 'DATE':
            case 'EMAIL':
            case 'TEL':
            case 'TEXT':
                control = `<input autocomplete="off" type="${type}" name="${controlName}" id="${controlID}"${attrs} />`;
                break;

            case 'NUMBER':
                var min = '',
                    max = '';
                if (field.range !== undefined) {
                    min = field.range[0];
                    max = field.range[1];
                }
                control = `<input autocomplete="off" type="number" name="${controlName}" id="${controlID}" min="${min}" max="${max}" ${attrs} />`;
                break;

            case 'RANGE':
                var min = '0',
                    max = '100',
                    minText = '',
                    maxText = '';
                if (field.range !== undefined) {
                    min = field.range[0];
                    max = field.range[1];
                }

                control = `<input autocomplete="off" type="range" name="${controlName}" id="${controlID}" min="${min}" max="${max}" ${attrs} />`;
                minText = `<small class="hccf-form-field--range__min">${min}</small>`;
                maxText = `<small class="hccf-form-field--range__max">${max}</small>`;
                control += minText + maxText;
                break;

            case 'SELECT':
                var selectOptions = '',
                    optionsStr = '<option value="">Select</option>';

                if (field.options) {
                    selectOptions = field.options;
                    for (const v in selectOptions) {
                        optionsStr += `<option value="${v}" ${(field.selected && (field.selected === v)) ? 'selected' : ''}>${selectOptions[v]}</option>`;
                    }
                }

                control = `<select name="${controlName}" id="${controlID}"${attrs}>${optionsStr}</select>`;
                break;

            case 'RADIO':
                var radioOptions = '',
                    radioList = '';

                if (field.options) {
                    radioOptions = field.options;
                    for (const v in radioOptions) {
                    controlID += v;

                    for (const x in handlers) {
                        var funName = handlers[x];
                        _self.registerEventHandler(controlID, x, funName);
                    }

                    radioList += `<label for="${v}"><input type="radio"  name="${controlName}"${attrs} id="${controlID}" value="${v}" ${(field.selected && (field.selected === v)) ? 'checked' : ''}>${radioOptions[v]}</label><br/>`;
                    }
                }

                control = radioList;
                break;

            case 'CHECKBOX':
                var checkboxOptions = '',
                    checkboxList = '';

                if (field.options) {
                    checkboxOptions = field.options;
                    for (const v in checkboxOptions) {
                        controlID = controlName + v;

                        for (const x in handlers) {
                            var funName = handlers[x];
                            _self.registerEventHandler(controlID, x, funName);
                        }

                        checkboxList += `<label for="${v}"><input type="checkbox"  name="${controlName}"${attrs}" id="${controlID}" value="${v}" ${(field.selected && (field.selected === v)) ? 'checked' : ''}>${checkboxOptions[v]}</label><br/>`;
                    }
                }

                control = checkboxList;
                break;

            case 'TEXTAREA':
                control = `<textarea name="${controlName}" id="${controlID}"${attrs}></textarea>`;
                break;

            default:
                control = `<input autocomplete="off" type="text" name="${controlName}" id="${controlID}"${attrs} />`;
        }

        return control;
    },

    // function to check radio(s)/checkbox(s) fild value is set or not
    // if set return the first set value or return false
    checkRadioCheckboxValue: function(field) {
        if ((typeof field.length === 'undefined') && (field.type == 'radio')) {
            if (field.checked) {
                return field.value;
            }
        } else {
            for (let i = 0; i < field.length; i++) {
                if (field[i].checked) {
                    return field[i].value;
                }
            }
        }

        return false;
    },

    // function to check for numeric values
    checkForNumericValue: function(value) {
        if (!value) {
            return false;
        }

        const pattern = /^\d+$/;
        return pattern.test(value);
    },

    // function to check 10 digit phone number
    checkForPhoneNumber: function(value) {
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
    checkForEmail: function(value) {
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
    checkForDate: function(value) {
        if (!value) {
            return false;
        }

        const pattern = new RegExp('^([0-9]{4})-([0-9]{2})-([0-9]{2})$');
        const matches = pattern.exec(value);

        if (!matches) {
            return false;
        }
        const composedDate = new Date(matches[1], (matches[2] - 1), matches[3]);
        const isDate = ((composedDate.getMonth() == (matches[2] - 1)) && (composedDate.getDate() == matches[3]) && (composedDate.getFullYear() == matches[1]));
        if (!isDate) {
            return false;
        }


        return true;
    },

    /**
     * Function to store element id, event type and handler name
     * @param {string} elemID - element id
     * @param {string} eventName - event name
     * @param {string} handlerName - event handler
     */
    registerEventHandler: function(elemID, eventName, handlerName) {
        if (HeroCard.actionableUIElements == null) {
            HeroCard.actionableUIElements = [];
        }

        const obj = {
            elemID,
            eventName,
            handlerName };

        HeroCard.actionableUIElements.push(obj);
    },

    /**
     * Function to add event listers to the respective elements
     */
    attachEventHandlers: function() {
        const _self = this;

        if (HeroCard.actionableUIElements === undefined || !HeroCard.actionableUIElements.length) {
            return;
        }

        HeroCard.actionableUIElements.forEach((item) => {
            const element = document.getElementById(item.elemID);
            if (element == null) {
                console.log(`Element not found: ${element}`);
                return;
            }

            const handler = _self.listOfRegisteredActions(item.handlerName);
            if (handler == null) {
                console.log(`Handler not found${item.handlerName}`);
                return;
            }

            element.addEventListener(item.eventName, () => {
                handler(element);
            });
        });
    },

    /**
     * Function to get stored event handler
     * @param {string} elemID - element id
     * @return {object} - object containing element id, event type and event handler
     */
    getEventHandlerByElementId: function(elemID) {
        const _self = this;
        let eventHandlers = HeroCard.actionableUIElements,
            eventObj;

        for (let i = 0; i < eventHandlers.length; i++) {
            if (eventHandlers[i].elemID === elemID) {
                const handler = _self.listOfRegisteredActions(eventHandlers[i].handlerName);
                if (handler !== null) {
                    eventObj = {
                    elemID: eventHandlers[i].elemID,
                    eventName: eventHandlers[i].eventName,
                    handlerName: handler,
                    };
                    break;
                }
            }
        }

        return eventObj;
    },

    /**
     * Function to get registered event handlers
     * @param {string} funName - event handler name
     */
    listOfRegisteredActions: function(funName) {
        const _self = this;
        const listOfActions = {
            'HeroCardActions.Auth.dismiss(event, element)':
                function (element) { HeroCardActions.Auth.dismiss(event, element); },
            'HeroCardActions.Auth.login(element)':
                function (element) { HeroCardActions.Auth.login(element); },
            'HeroCardActions.UserInput.hideInputForm(event, this)':
                function (element) { HeroCardActions.UserInput.hideInputForm(event, element); },
            'HeroCardActions.UserInput.submitInput(event, this)':
                function (element) { HeroCardActions.UserInput.submitInput(event, element); },
            'HeroCardActions.UserInput.checkUserInput(event, this)':
                function (element) { HeroCardActions.UserInput.checkUserInput(event, element); },
            'HeroCardActions.Common.validateFieldRules(event, element)':
                function (element) { HeroCardActions.Common.validateFieldRules(event, element); },
            'HeroCardUtility.approveJiraTicket(event, element)':
                function (element) { _self.approveJiraTicket(event, element); },
            'HeroCardActions.UserInput.showInputForm(event, element)':
                function (element) { HeroCardActions.UserInput.showInputForm(event, element); },
            'HeroCardActions.ToggleCardView.viewCardDetails(event, element)':
                function (element) { HeroCardActions.ToggleCardView.viewCardDetails(event, element); },
            'HeroCardActions.ToggleCardView.viewCardLess(event, element)':
                function (element) { HeroCardActions.ToggleCardView.viewCardLess(event, element); },
            'HeroCardActions.Direct.openUrlLocation(element)':
                function (element) { HeroCardActions.Direct.openUrlLocation(element); },
            'javascript:void(0)':
                function () { void (0); },
        };

        return listOfActions[funName];
    },

    hashcode: function(obj) {
        let hc = 0;
        const chars = JSON.stringify(obj).replace(/\{|\"|\}|\:|,/g, '');
        const len = chars.length;
        for (let i = 0; i < len; i++) {
            // Bump 7 to larger prime number to increase uniqueness
            hc += (chars.charCodeAt(i) * 7);
        }
        return hc;
    },

    createElement: function(type, attr, text, parent) {
        attr = attr || {};
        text = text || '';
        let element = document.createElement(type),
            l = attr.length;

        for (const key in attr) {
            element.setAttribute(key, attr[key]);
        }

        if (text) {
            const t = document.createTextNode(text);
            element.appendChild(t);
        }

        if (parent) {
            parent.appendChild(element);
        }

        return element;
    },

    findAncestor: function(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls)) { }
        return el;
    },
    
    convertTimestamp: function(isoDate) {
        const _self = this;
        if (!isoDate) { return; }
        const convertedDate = _self.convertISO8601toDate(isoDate);
        return _self.dateDifference(convertedDate, new Date());
    },

    callbackClasses: function(cardObj) {
        const _self = this;
        let card = cardObj,
            classNames = '';

        // Check if the card to be expanded
        if (card.hasOwnProperty("expand") && card["expand"] === true) {
            classNames += ' hccf-accordian-expanded';
        }

        // Hide card if its completed and 'remove card on completion' is present
        // or if card is no more actionable
        // or if card is expired
        if (_self.checkCardHidden(card)) {
            classNames += ' hccf-hero-card--hidden';
        }

        return classNames;
    },

    imgPath: function(fileName){
        return hsImgs + fileName;
    },

};


/**
 * Exports
 */
export default HeroCardUtility;

  