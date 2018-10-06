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
    showInputForm: function(e, addInputButton) {
        let formSectionClass = '.hccf-js-input-add-section',
            actionKey = addInputButton.getAttribute('data-actionkey');
        return CommonActions.showActionForm(addInputButton, formSectionClass, actionKey);
    },

    hideInputForm: function(e, cancelButton) {
        const formSectionClass = '.hccf-js-input-add-section';
        CommonActions.hideActionForm(cancelButton, formSectionClass);
    },

    checkUserInput: function(e, text) {
        let form = HeroCardUtility.getClosest(text, '.hccf-card-action-form'),
            submitButton = form.querySelector('.hccf-js-input-button-submit');
        return CommonActions.validateFormFields(form, submitButton);
    },

    submitInput: function(e, button) {
        let form = HeroCardUtility.getClosest(button, '.hccf-card-action-form'),
            card = HeroCardUtility.getClosest(button, '.hccf-hero-card'),
            isValid = CommonActions.validateFormFields(form, button);

        if (!isValid) {
            return false;
        }

        let formData = CommonActions.getFormData(form),
            callback = 'HeroCard.UserInputActions.addInputCallback';

        CommonActions.encodeRoswellActionURLAndNavigate(card, form, formData, callback);

        // Disable submit button and change label to "In progress..."
        CommonActions.disableActionButton(button, 'In progress...');
        return true;
    },

    addInputCallback: function(urlStr, result) {
        const _self = this;
        const info = CommonActions.decodeRoswellActionURL(urlStr, '.hccf-js-input-add-section');
        let actionButton = info.actionButton,
            submitButton = info.submitButton,
            cancelButton = info.cancelButton,
            actionObject = info.actionObject,
            cardHTML = info.cardHTML,
            cardID = info.cardID;

        const defaultLabel = ActionCompletionActions.getActionPropertyValue(actionObject, 'label');

        if (result) {
            const removeCard = ActionCompletionActions.getActionPropertyValue(actionObject, 'remove_card_on_completion');
            if (removeCard !== true) {
                _self.hideInputForm('', cancelButton);
                // enable submit button
                CommonActions.enableActionButton(submitButton, defaultLabel, '', '');
            }

            ActionCompletionActions.setActionCompleted(actionObject.id);
            ActionCompletionActions.renderUIForCompletedAction(actionObject.id);
        } else {
            // enable submit button
            CommonActions.enableActionButton(submitButton, defaultLabel, '', '');
        }

        return JSON.stringify(HeroCard.cardDataJSON);
    },
};

// Add 'UserInputActions' to 'HeroCard' namespace for native layer to callback
const HeroCard = window.HeroCard || {};
HeroCard.UserInputActions = UserInputActions;
window.HeroCard = HeroCard;

/**
 * Exports
 */
export default UserInputActions;