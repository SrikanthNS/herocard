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
 * Direct Actions
 * @method openUrlLocation
 * @method openUrlCallback
 */
const DirectActions = {
    openUrlLocation: function(elem) {
        // return if action button marked as complete/disabled
        if (HeroCardUtility.hasClass(elem, 'hccf-card-actions__item-link--complete')
            || HeroCardUtility.hasClass(elem, 'hccf-card-actions__item-link--disabled')) {
                return false;
        }

        let form = HeroCardUtility.getClosest(elem, '.hccf-card-action-form'),
            card = HeroCardUtility.getClosest(elem, '.hccf-hero-card'),
            formData = CommonActions.getFormData(form),
            callback = 'HeroCard.DirectActions.openUrlCallback';

        CommonActions.encodeRoswellActionURLAndNavigate(card, form, formData, callback);

        // Disable action button and change label to "In progress..."
        CommonActions.disableActionButton(elem, 'In progress...');
        return true;
    },

    openUrlCallback: function(urlStr, result) {
        const info = CommonActions.decodeRoswellActionURL(urlStr, '.hccf-card-actions__item');
        let actionButton = info.actionButton,
            cancelButton = info.cancelButton,
            actionObject = info.actionObject,
            cardHTML = info.cardHTML;

        const defaultLabel = ActionCompletionActions.getActionPropertyValue(actionObject, 'label');

        if (result) {
            ActionCompletionActions.setActionCompleted(actionObject.id);
            ActionCompletionActions.renderUIForCompletedAction(actionObject.id);
        } else {
            // enable submit button
            CommonActions.enableActionButton(actionButton, defaultLabel, '', '');
        }

        return JSON.stringify(HeroCard.cardDataJSON);
    },
};

// Add 'DirectActions' to 'HeroCard' namespace for native layer to callback
const HeroCard = window.HeroCard || {};
HeroCard.DirectActions = DirectActions;
window.HeroCard = HeroCard;

/**
 * Exports
 */
export default DirectActions;