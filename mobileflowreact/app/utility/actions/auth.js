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
 * Auth Actions
 * @method dismiss
 * @method login
 * @method loginCallback
 */
const AuthActions = {
    // No need to call back into the Framework layer for this action.  Simply dismiss.
    dismiss: function(e, dismissButton) {
        const cardHtml = HeroCardUtility.getClosest(dismissButton, '.hccf-hero-card');
        if (cardHtml) {
            CommonActions.disableActionButton(dismissButton, 'Dismissed');
            HeroCardUtility.removeCard(cardHtml);
        }
    },

    login: function(elem) {
        let form = HeroCardUtility.getClosest(elem, '.hccf-card-action-form'),
            card = HeroCardUtility.getClosest(elem, '.hccf-hero-card'),
            formData = CommonActions.getFormData(form),
            callback = 'HeroCard.AuthActions.loginCallback';

        CommonActions.disableActionButton(elem, 'In progress...');
        CommonActions.encodeRoswellActionURLAndNavigate(card, form, formData, callback);
        return true;
    },

    loginCallback: function(urlStr, result) {
        const info = CommonActions.decodeRoswellActionURL(urlStr, '.hccf-card-actions__item');
        let actionButton = info.actionButton,
            actionObject = info.actionObject;
        const defaultLabel = ActionCompletionActions.getActionPropertyValue(actionObject, 'label');

        if (result) {
            const cardHtml = HeroCardUtility.getClosest(actionButton, '.hccf-hero-card');
            if (cardHtml) {
                HeroCardUtility.removeCard(cardHtml);
            }
        } else {
            CommonActions.enableActionButton(actionButton, defaultLabel, '', '');
        }

        return JSON.stringify(HeroCard.cardDataJSON);
    },
};

// Add 'AuthActions' to 'HeroCard' namespace for native layer to callback
const HeroCard = window.HeroCard || {};
HeroCard.AuthActions = AuthActions;
window.HeroCard = HeroCard;

/**
 * Exports
 */
export default AuthActions;