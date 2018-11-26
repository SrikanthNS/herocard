/* eslint-disable no-case-declarations */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-void */
/* eslint-disable space-unary-ops */
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
import _ from 'lodash';
import HeroCardUtility from '../utility';
import HeroCardEventEmitter from '../event-emitter';


HeroCardEventEmitter().initEventEmitter();
const EventEmitter = HeroCardEventEmitter().EventEmitter();

/**
 * Common Actions
 * @method handleMutexActionCompletion
 * @method disableActionButton
 * @method enableActionButton
 * @method showActionForm
 * @method hideActionForm
 * @method validateFormFields
 * @method clearActionForm
 * @method getFormData
 * @method encodeRoswellActionURLAndNavigate
 * @method decodeRoswellActionURL
 * @method validateFieldRules
 */
const CommonActions = {

  /**
     * Function to handle mutually exclusive action completion
     * @param {element} actionButton - action button element
     * @param {array} mutexGroupActions - array of mutually exclusive action ids
     */
  handleMutexActionCompletion(actionButton, mutexGroupActions) {
    HeroCardUtility.addClass(actionButton, 'hccf-card-actions__item-link__mutex-action-complete');
    const actionItem = HeroCardUtility.getClosest(actionButton, '.hccf-card-actions__item');

    // make action item full-width
    HeroCardUtility.addClass(actionItem, 'hccf-card-actions__item--fullwidth');

    for (let i = 0; i < mutexGroupActions.length; i++) {
      const mutexButton = document.getElementById(`${mutexGroupActions[i]}__hccf-card-actions__item-link`);
      const mutexItem = HeroCardUtility.getClosest(mutexButton, '.hccf-card-actions__item');

      // hide mutex item
      HeroCardUtility.addClass(mutexItem, 'hccf-card-actions__item--hidden');
    }
  },

  disableActionButton(actionButton, disableLabel) {
    actionButton.removeEventListener('click', void(0));
    HeroCardUtility.addClass(actionButton, 'hccf-card-actions__item-link--complete');
    HeroCardUtility.addClass(actionButton, 'hccf-card-actions__item-link--disabled');

    if (disableLabel) {
      actionButton.innerHTML = disableLabel;
    }
  },

  /**
     * Function to enable action button
     * @param {element} actionButton - action button element
     * @param {string} label - button label to set
     * @param {string} eventName - event type to attach
     * @param {string}  handlerFunction - event handler function
     */
  enableActionButton(actionButton, label, eventName, handlerFunction) {
    HeroCardUtility.removeClass(actionButton, 'hccf-card-actions__item-link--complete');
    HeroCardUtility.removeClass(actionButton, 'hccf-card-actions__item-link--disabled');

    if (label) {
      actionButton.innerHTML = label;
    }

    if (eventName && handlerFunction) {
      actionButton.addEventListener(eventName, () => {
        handlerFunction(actionButton);
      });
    }
  },

  showActionForm(actionButton, sectionClass) {
    // return if action button marked as complete/disabled
    if (HeroCardUtility.hasClass(actionButton, 'hccf-card-actions__item-link--complete')
            || HeroCardUtility.hasClass(actionButton, 'hccf-card-actions__item-link--disabled')) {
      return false;
    }

    const actionItem = HeroCardUtility.getClosest(actionButton, '.hccf-card-actions__item');
    const actionItemSiblings = actionItem.parentNode.children;
    const formSection = actionButton.parentNode.parentNode.querySelector(sectionClass);

    // hide other buttons
    for (let i = 0; i < actionItemSiblings.length; i++) {
      if (!actionItemSiblings[i].isEqualNode(actionItem)) {
        HeroCardUtility.addClass(actionItemSiblings[i], 'hccf-card-actions__item--hidden');
      }
    }

    // hide the action button
    HeroCardUtility.addClass(actionButton, 'hccf-card-actions__item-link--hidden');

    // make the container full-width
    HeroCardUtility.addClass(actionItem, 'hccf-card-actions__item--fullwidth');

    formSection.style.display = 'block';

    // Emit card rezized event
    EventEmitter.emit('CARDRESIZED');
    return true;
  },

  /**
     * Function to hide the user input form upon clicking Cancel button
     * @param {element} - the cancel button
     * @param {string} - the user input section class
     */
  hideActionForm(cancelButton, sectionClass) {
    const self = this;
    const formSection = HeroCardUtility.getClosest(cancelButton, sectionClass);
    const form = HeroCardUtility.getClosest(cancelButton, 'form');
    const actionButton = formSection.nextElementSibling || form.querySelector('.hccf-card-actions__item-link--hidden');
    const actionItem = HeroCardUtility.getClosest(actionButton, '.hccf-card-actions__item');
    const actionItemSiblings = actionItem.parentNode.children;

    // clear the form
    self.clearActionForm(form);

    // hide siblings
    for (let i = 0; i < actionItemSiblings.length; i++) {
      if (!actionItemSiblings[i].isEqualNode(actionItem)) {
        HeroCardUtility.removeClass(actionItemSiblings[i], 'hccf-card-actions__item--hidden');
      }
    }

    // show main action button
    HeroCardUtility.removeClass(actionButton, 'hccf-card-actions__item-link--hidden');

    // make the container normal width
    HeroCardUtility.removeClass(actionItem, 'hccf-card-actions__item--fullwidth');

    formSection.style.display = 'none';

    // Emit card rezized event
    EventEmitter.emit('CARDRESIZED');
  },

  validateFormFields(form, submitButton) {
    const self = this;
    let isValid = true;
    const elements = form.elements;
    const l = elements.length;
    let i = 0;
    const valuesObj = {};

    // create name/validation pair objects for form fields
    for (; i < l; i++) {
      if ((elements[i].type !== 'hidden') && (elements[i].getAttribute('data-validation') !== undefined)) {
        valuesObj[elements[i].getAttribute('name')] = self.validateFieldRules(null, elements[i], true);
      }
    }

    for (const x in valuesObj) {
      if (!valuesObj[x]) {
        isValid = false;
      }
    }

    if (isValid) {
      // enable submit button
      HeroCardUtility.removeClass(submitButton, 'hccf-card-actions__item-link--disabled');
    } else {
      // disable submit button
      HeroCardUtility.addClass(submitButton, 'hccf-card-actions__item-link--disabled');
    }

    return isValid;
  },

  /**
     * Function to reset and clear the from
     * It also removes validation error styles/messages if any
     * @param {element} - form element
     */
  clearActionForm(form) {
    // reset form
    form.reset();

    // clear validation errors
    const formFields = form.getElementsByClassName('hccf-form-field');
    const len = formFields.length;

    for (let i = 0; i < len; i++) {
      const field = formFields[i];
      const dotElem = field.getElementsByClassName('hccf-form-field__validation-error-dot');
      const errorElem = field.getElementsByClassName('hccf-form-field__validation-error');
      const messageElem = field.getElementsByClassName('hccf-form-field__validation-message');

      // remove the red dot
      if (dotElem[0] !== undefined) {
        HeroCardUtility.removeClass(dotElem[0], 'hccf-form-field__validation-error-dot');
      }

      // remove the red border
      if (errorElem[0] !== undefined) {
        HeroCardUtility.removeClass(errorElem[0], 'hccf-form-field__validation-error');
      }

      // hide error message
      if (messageElem[0] !== undefined) {
        messageElem[0].style.display = 'none';
      }
    }
  },

  getFormData(form) {
    let formData = '';
    const elements = form.elements;
    const l = elements.length;
    let i = 0;
    const valuesObj = {};

    // create name/value pair objects for form fields
    for (; i < l; i++) {
      if (elements[i].type !== 'hidden') {
        if (elements[i].type === 'radio') {
          if (valuesObj[elements[i].getAttribute('name')] === undefined ||
            valuesObj[elements[i].getAttribute('name')] === '') {
            valuesObj[elements[i].getAttribute('name')] = elements[i].checked ? _.trim(elements[i].value) : '';
          }
        } else if (elements[i].type === 'checkbox') {
          if (valuesObj[elements[i].getAttribute('name')] === undefined) {
            valuesObj[elements[i].getAttribute('name')] = elements[i].checked ? _.trim(elements[i].value) : '';
          } else if (elements[i].checked && !valuesObj[elements[i].getAttribute('name')]) {
            valuesObj[elements[i].getAttribute('name')] = _.trim(elements[i].value);
          } else if (elements[i].checked && valuesObj[elements[i].getAttribute('name')]) {
            valuesObj[elements[i].getAttribute('name')] += `, ${_.trim(elements[i].value)}`;
          }
        } else {
          valuesObj[elements[i].getAttribute('name')] = _.trim(elements[i].value);
        }
      }
    }

    for (const x in valuesObj) {
      if (formData) {
        formData += '&';
      } else {
        formData = '';
      }
      formData += `${x}=${encodeURIComponent(valuesObj[x])}`;
    }

    return formData;
  },

  encodeRoswellActionURLAndNavigate(card, form, userData, callback) {
    // info to construct the URL to RoswellFramework
    const cardId = card.getAttribute('data-card-id');
    const cardConnector = card.getAttribute('data-card-connector');
    const queryParams = [];

    if (userData) {
      queryParams.push(userData);
    }

    if (form) {
      queryParams.push(`action=${form.getAttribute('data-action-string')}`);
    }

    queryParams.push(`callback=${callback}`);

    const urlStr = `roswellframework://${
      cardConnector ? `${cardConnector}/` : ''
    }${cardId || ''
    }?${
      queryParams.join('&')}`;

    window.location = urlStr;
  },

  decodeRoswellActionURL(urlStr, sectionClass) {
    const url = HeroCardUtility.parseURL(urlStr);
    const cardID = url.cardid;
    const actionObject = url.searchObject.actionObject;
    const actionID = actionObject.id;
    const actionKey = actionObject.action_key;
    let submitButton = '';
    let cancelButton = '';
    let actionButton = '';
    let cardHTML = '';
    let formSection = '';

    if (actionKey === 'USER_INPUT') {
      submitButton = document.getElementById(`${cardID}__${actionID}__submit`);
      cancelButton = document.getElementById(`${cardID}__${actionID}__cancel`);
      formSection = HeroCardUtility.getClosest(submitButton, sectionClass);
      actionButton = formSection.nextElementSibling;
      cardHTML = HeroCardUtility.getClosest(submitButton, '.hccf-hero-card');
    } else {
      submitButton = '';
      cancelButton = '';
      actionButton = document.getElementById(`${actionID}__hccf-card-actions__item-link`);
      cardHTML = document.getElementById(`${cardID}__${cardID}__card`);
    }

    return {
      cardID,
      actionButton,
      submitButton,
      cancelButton,
      actionObject,
      cardHTML,
    };
  },

  validateFieldRules(e, field, showError) {
    if (!field.getAttribute('data-validation')) {
      return true;
    }

    const rules = _.split(field.getAttribute('data-validation'), ',');
    showError = showError !== false;
    let value = '';
    let isValid = true;
    let errorMessage = '';

    const fieldBlock = HeroCardUtility.getClosest(field, '.hccf-form-field');
    const messageBlock = fieldBlock.querySelectorAll('.hccf-form-field__validation-message')[0];
    const messageContainer = messageBlock.querySelectorAll('span')[0];

    if ((field.type === 'radio') || (field.type === 'checkbox')) {
      const radioField = field.name;
      const form = HeroCardUtility.getClosest(field, '.hccf-card-action-form');
      value = HeroCardUtility.checkRadioCheckboxValue(form.elements[radioField]);
    } else {
      value = _.trim(field.value);
    }

    for (const x in rules) {
      switch (rules[x]) {
        case 'numeric':
          const isNumeric = HeroCardUtility.checkForNumericValue(value);
          if (!isNumeric) {
            isValid = false;
            errorMessage = `${field.getAttribute('data-field-label')} must have numeric value only`;
          }

          const min = field.getAttribute('min');
          const max = field.getAttribute('max');
          if ((min && max) && (parseInt(value, 10) < parseInt(min, 10) || parseInt(value, 10) > parseInt(max, 10))) {
            isValid = false;
            errorMessage = `${field.getAttribute('data-field-label')} should be between ${min} and ${max}`;
          }
          break;

        case 'phone':
          const isPhoneNumber = HeroCardUtility.checkForPhoneNumber(value);
          if (!isPhoneNumber) {
            isValid = false;
            errorMessage = `${field.getAttribute('data-field-label')} should be 10 digits only`;
          }
          break;

        case 'email':
          const isEmail = HeroCardUtility.checkForEmail(value);
          if (!isEmail) {
            isValid = false;
            errorMessage = 'Please enter a valid e-mail address';
          }
          break;

        case 'date':
          const isDate = HeroCardUtility.checkForDate(value);
          if (!isDate) {
            isValid = false;
            errorMessage = `${field.getAttribute('data-field-label')} must be a valid date`;
          }
          break;

        default:
          if (!value) {
            isValid = false;
            errorMessage = `${field.getAttribute('data-field-label')} is required`;
          }
          break;
      }

      if (!isValid) {
        break;
      }
    }


    if (isValid) {
      messageContainer.parentNode.previousSibling.children[0].classList.remove('hccf-form-field__validation-error');
      messageContainer.parentNode.previousSibling.classList.remove('hccf-form-field__validation-error-dot');
      messageContainer.textContent = '';
      messageBlock.style.display = 'none';
    } else if (showError) {
      messageContainer.parentNode.previousSibling.children[0].classList.add('hccf-form-field__validation-error');
      messageContainer.parentNode.previousSibling.classList.add('hccf-form-field__validation-error-dot');
      messageContainer.textContent = errorMessage;
      messageBlock.style.display = 'block';
    }

    // Emit card rezized event
    EventEmitter.emit('CARDRESIZED');
    return isValid;
  },
};

// Add 'CommonActions' to 'HeroCard' namespace for native layer to callback
const HeroCard = window.HeroCard || {};
HeroCard.CommonActions = CommonActions;
window.HeroCard = HeroCard;

/**
 * Exports
 */
export default CommonActions;
