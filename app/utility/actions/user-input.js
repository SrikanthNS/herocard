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
import CommonActions from './common';
import ActionCompletionActions from './action-completion';

/**
 * User Input Actions
 * @method showInputForm
 * @method hideInputForm
 * @method checkUserInput
 * @method submitInput
 * @method addInputCallback
 */
const UserInputActions = {
  showInputForm(e, addInputButton) {
    const formSectionClass = '.hccf-js-input-add-section';
    const actionKey = addInputButton.getAttribute('data-actionkey');
    return CommonActions.showActionForm(addInputButton, formSectionClass, actionKey);
  },

  hideInputForm(e, cancelButton) {
    const formSectionClass = '.hccf-js-input-add-section';
    CommonActions.hideActionForm(cancelButton, formSectionClass);
  },

  checkUserInput(e, text) {
    const form = HeroCardUtility.getClosest(text, '.hccf-card-action-form');
    const submitButton = form.querySelector('.hccf-js-input-button-submit');
    return CommonActions.validateFormFields(form, submitButton);
  },

  submitInput(e, button) {
    const form = HeroCardUtility.getClosest(button, '.hccf-card-action-form');
    const card = HeroCardUtility.getClosest(button, '.hccf-hero-card');
    const isValid = CommonActions.validateFormFields(form, button);

    if (!isValid) {
      return false;
    }

    const formData = CommonActions.getFormData(form);
    const callback = 'HeroCard.UserInputActions.addInputCallback';

    CommonActions.encodeRoswellActionURLAndNavigate(card, form, formData, callback);

    // Disable submit button and change label to "In progress..."
    CommonActions.disableActionButton(button, 'In progress...');
    return true;
  },

//   addInputCallback(urlStr, result) {
//     const self = this;
//     const info = CommonActions.decodeRoswellActionURL(urlStr, '.hccf-js-input-add-section');
//     const submitButton = info.submitButton;
//     const cancelButton = info.cancelButton;
//     const actionObject = info.actionObject;

//     const defaultLabel = ActionCompletionActions.getActionPropertyValue(actionObject, 'label');

//     if (result) {
//       const removeCard = ActionCompletionActions.getActionPropertyValue(actionObject, 'remove_card_on_completion');
//       if (removeCard !== true) {
//         self.hideInputForm('', cancelButton);
//         // enable submit button
//         CommonActions.enableActionButton(submitButton, defaultLabel, '', '');
//       }

//       ActionCompletionActions.setActionCompleted(actionObject.id);
//       ActionCompletionActions.renderUIForCompletedAction(actionObject.id);
//     } else {
//       // enable submit button
//       CommonActions.enableActionButton(submitButton, defaultLabel, '', '');
//     }

//     return JSON.stringify(HeroCard.cardDataJSON);
//   },
};

// Add 'UserInputActions' to 'HeroCard' namespace for native layer to callback
const HeroCard = window.HeroCard || {};
HeroCard.UserInputActions = UserInputActions;
window.HeroCard = HeroCard;

/**
 * Exports
 */
export default UserInputActions;
